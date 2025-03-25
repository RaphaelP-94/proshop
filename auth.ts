import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/db/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compareSync as bcryptCompareSync } from 'bcrypt-ts-edge';
import type { NextAuthConfig } from 'next-auth';

export const config = {
  pages: {
    signIn: '/auth/sign-in', // if not authenticated, redirect to signin. How does it check authenticated?
    // It checks if the user is authenticated by checking if the session is valid. If the session is valid, the user is authenticated. If the session is invalid, the user is not authenticated.
    error: '/auth/sign-in', // if error, redirect to signin
  },
  session: {
    // define a strategy for the session
    strategy: 'jwt',
    // define max age of the session
    maxAge: 30 * 24 * 60 * 60, // 30 days. What do the numbers stand for? Explain these numbers: 30 * 24 * 60 * 60.  30 days in seconds.
  },
  // Why do we need an adapter? Because we are using Prisma as our database. We need to use a adapter to connect to the database.
  adapter: PrismaAdapter(prisma),
  // Can have more than one provider.
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      // Ultimately, credentials is the data that comes from the user via the form.
      async authorize(credentials) {
        if (credentials === null) {
          console.log('No credentials provided');
          return null;
        }

        console.log('Looking for user with email:', credentials.email);
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user) {
          console.log('User not found');
          return null;
        }

        if (!user.password) {
          console.log('User has no password');
          return null;
        }

        console.log('Stored password hash:', user.password);
        console.log('Provided password:', credentials.password);
        const isMatch = bcryptCompareSync(
          credentials.password as string,
          user.password
        );
        console.log('Password match:', isMatch);

        if (isMatch) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }

        return null;
      },
    }),
  ],
  // Callbacks are functions that are called after a certain event.
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, trigger, token }: any) {
      // Set the user ID from the token
      // Why? Because we need to know who is logged in.
      session.user.id = token.sub;

      // If there is an update, set the user name => They can update their name in the profile page =>
      // When changed in database, also changed in the session.
      if (trigger === 'update') {
        session.user.name = token.name;
      }

      return session;
    },
  },
  // ensures that the object structure (config object) is compatible with the NextAuthConfig type.
  // Basically only can have the properties that are defined in the NextAuthConfig type from next-auth docs.
} satisfies NextAuthConfig;

// This is coming from NextAuth.js. We destructure the handlers, auth, signIn, and signOut properties from the NextAuth object.
// Handlers is an object that contains the http handlers for the different authentication events.
// To create the next api routes to handle the authentication events, we destructure the handlers object and pass it to the NextAuth function.
// Auth is function that will get the session and checks if a user is logged in or not.
// SignIn is a function that will be called when a user tries to sign in.
// - Sign in with a provider. If no provider is specified, the user will be redirected to the sign in page.
// - By default, the user is redirected to the current page after signing in. You can override this behavior by setting the redirectTo option with a relative path.
// SignOut is a function that will be called when a user tries to sign out.
export const { handlers, auth, signIn, signOut } = NextAuth(config);

'use server';

import { signInFormSchema } from '../validators';
// bring in sign in and sign out from auth.ts file
import { signIn, signOut } from '@/auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
// Sign in the user with credentials (instead of other providers)
// Use action state hook to handle the form submission
// First argument is the previous state, second argument is the current state
import { signUpFormSchema } from '../validators';
import { hashSync } from 'bcrypt-ts-edge';
import { prisma } from '@/db/prisma';
import { formatError } from '../utils';

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    console.log('Attempting to sign in with:', { email });

    // Validate user
    const user = signInFormSchema.parse({
      email,
      password,
    });

    // Needs to know the provider which is credentials
    await signIn('credentials', user);

    return { success: true, message: 'Signed in successfully' };
  } catch (error) {
    console.error('Sign in error:', error);
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: 'Invalid email or password' };
  }
}
// Signout is simple and comes from the auth module
export async function signOutUser() {
  await signOut();
}

// Sign up user Action
// formdata has type of FormData
export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    // Get the user data from the form data and validate it
    const user = signUpFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });

    // Get the plain password before hashing
    const plainPassword = user.password;
    // Hash the password
    // 10 is the number of rounds to hash the password
    user.password = hashSync(user.password, 10);
    // add it to the database
    // How do we check if the user already exists? We can use the email as the unique identifier
    // Where in the code do we check if the user already exists?
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    // Passing credentials  to the signIn function
    await signIn('credentials', {
      email: user.email,
      password: plainPassword,
    });
    return { success: true, message: 'Signed up successfully' };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: formatError(error) };
  }
}

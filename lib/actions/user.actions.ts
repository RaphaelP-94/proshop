'use server';

import { signInFormSchema } from '../validators';
// bring in sign in and sign out from auth.ts file
import { signIn, signOut } from '@/auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
// Sign in the user with credentials (instead of other providers)
// Use action state hook to handle the form submission
// First argument is the previous state, second argument is the current state
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    // Validate user
    const user = signInFormSchema.parse({
      // Get the user by email. We have access to the form data because we are using the action hook.
      // name="email"
      // Validation from Zod applies here
      email: formData.get('email'),
      password: formData.get('password'),
    });
    // Needs to know the provider which is credentials
    await signIn('credentials', user);
    // This is how all actions are handled. return a true value
    return { success: true, message: 'Signed in successfully' };
  } catch (error) {
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

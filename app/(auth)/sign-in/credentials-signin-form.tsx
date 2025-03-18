'use client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { signInDefaultValues } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { signInWithCredentials } from '@/lib/actions/user.actions';
import { useSearchParams } from 'next/navigation';

const CredentialsSignInForm = () => {
  // Takes the action and returns the status and the form state
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: '',
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  // Make the button more interactive
  const SignInButton = () => {
    const { pending } = useFormStatus();
    // Pending will be true, if it's loading
    return (
      <Button
        type="submit"
        className="w-full"
        disabled={pending}
        variant="default"
      >
        {pending ? 'Signing in...' : 'Sign in'}
      </Button>
    );
  };
  return (
    <form action={action}>
      {/* Will persist the callback URL to the next  page */}

      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            required
            autoComplete="email"
            // Set the prop to default
            defaultValue={signInDefaultValues.email}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            required
            autoComplete="password"
            // Set the prop to default
            defaultValue={signInDefaultValues.password}
          />
        </div>
        <div>
          <SignInButton />
        </div>
        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}
        <div className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{' '}
          {/* target self means open in the same tab */}
          <Link href="/sign-up" target="_self" className="link">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;

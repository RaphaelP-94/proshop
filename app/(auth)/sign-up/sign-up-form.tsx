'use client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { signUpDefaultValues } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { signUpUser } from '@/lib/actions/user.actions';
import { useSearchParams } from 'next/navigation';

const SignUpForm = () => {
  // Takes the action and returns the status and the form state
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: '',
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  // Make the button more interactive
  const SignUpButton = () => {
    const { pending } = useFormStatus();
    // Pending will be true, if it's loading
    return (
      <Button
        type="submit"
        className="w-full"
        disabled={pending}
        variant="default"
      >
        {pending ? 'Submitting...' : 'Sign up'}
      </Button>
    );
  };
  return (
    <form action={action}>
      {/* Will persist the callback URL to the next  page */}

      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>

          <Input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            required
            autoComplete="name"
            // Set the prop to default
            defaultValue={signUpDefaultValues.name}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            required
            autoComplete="email"
            // Set the prop to default
            defaultValue={signUpDefaultValues.email}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            required
            autoComplete="password"
            // Set the prop to default
            defaultValue={signUpDefaultValues.password}
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="ConfirmPassword"
            required
            autoComplete="confirmPassword"
            // Set the prop to default
            defaultValue={signUpDefaultValues.confirmPassword}
          />
        </div>
        <div>
          <SignUpButton />
        </div>
        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}
        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{' '}
          {/* target self means open in the same tab */}
          <Link href="/sign-in" target="_self" className="link">
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};
export default SignUpForm;

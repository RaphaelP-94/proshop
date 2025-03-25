import Link from 'next/link';
// From auth.ts file. It's a server component
import { auth } from '@/auth';
// Signout action
import { signOutUser } from '@/lib/actions/user.actions';
import { Button } from '@/components/ui/button';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserIcon } from 'lucide-react';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';

const UserButton = async () => {
  // See if the user is logged in
  // Need to make it async because we are using auth() and it's a server component.
  // We need to wait for the auth() to finish before we can use it. So we wait for it then we can use it.
  const session = await auth();

  if (!session) {
    return (
      <Button asChild>
        <Link href="/sign-in">
          <UserIcon />
          Sign In
        </Link>
      </Button>
    );
  }
  // Get first initial of the username
  // ? => It's gonna be undefined rather than throwing an error
  // Use nullish operator. If the Initial is nullish, set it to empty string
  const firstInitial = session.user?.name?.charAt(0).toLocaleUpperCase() ?? 'U';
  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        {/* As child becuase we have another component inside */}
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="relative w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-gray-100"
            >
              {firstInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <div className="text-sm font-md leading-none">
                {session.user?.name}
              </div>
              <div className="text-muted-foreground leading-none">
                {session.user?.email}
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem className="p-0 mb-1">
            <form action={signOutUser} className="w-full">
              <Button
                className="w-full py-4 px-2 h-4 justify-start"
                variant="ghost"
              >
                Sign Out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;

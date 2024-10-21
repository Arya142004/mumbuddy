import { Home } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { userId } = auth();
  return (
    <div className="flex bg-violet-100 justify-between shadow-lg p-2">
      <div className="flex items-center space-x-2  bg-violet-100  p-2 pl-8 ">
        <Link href="/">
          <Home className="h-8 w-8 text-violet-600" />
        </Link>
        <div className="flex flex-col  bg-violet-100">
          <Link href="/">
            <span className="text-3xl font-extrabold tracking-tighter">
              <span className="text-violet-800">Mum</span>
              <span className="text-violet-600">Buddy</span>
            </span>
          </Link>
        </div>
      </div>

      {userId ? (
        <div className="bg-violet-100  p-2 size-14" >
          <UserButton appearance={{ elements: { userButtonAvatarBox: "size-full" } }} />
        </div>
      ) : (
        <div className="flex gap-4  bg-violet-100 items-center p-2 ">
          <Button asChild>
            <SignInButton />
          </Button>
          <Button asChild>
            <SignUpButton />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;

import { Home } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex bg-violet-100 justify-between rounded-lg shadow-lg p-2">
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

      <div className="flex gap-4  bg-violet-100 items-center p-2 ">
        <Button>Sign IN</Button>
        <Button>Sign UP</Button>
      </div>
    </div>
  );
};

export default Navbar;

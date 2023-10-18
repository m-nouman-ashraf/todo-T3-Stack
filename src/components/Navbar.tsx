"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import Link from "next/link";
const Navbar = () => {
  const { setTheme } = useTheme();
  return (
    <nav className="container mt-3">
      <div className="border-gradient flex h-16 w-full flex-row items-center justify-between rounded-full border bg-slate-200 bg-transparent">
        <div className="mx-10 flex flex-row items-start justify-start">
          <p className="inline-block bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] bg-clip-text text-6xl text-transparent">
            ToDo
          </p>
        </div>
        <div className="mx-10 flex flex-row items-end justify-end gap-4">
          <Button
            asChild
            className="w-auto rounded-full bg-gradient-to-r  from-[#FF5F6D] to-[#FFC371] p-4  hover:text-black"
          >
            <Link href={"/login"}>Login</Link>
          </Button>
          <Button
            asChild
            className="w-auto rounded-full bg-gradient-to-r  from-[#FF5F6D] to-[#FFC371] p-4  hover:text-black"
          >
            <Link href={"/signup"}>SignUp</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full" asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

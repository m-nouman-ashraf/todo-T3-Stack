import Navbar from "~/components/Navbar";
import { useState } from "react";
import { Menu, XIcon } from "lucide-react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";

// const navigation = [
//   { name: "Product", href: "#" },
//   { name: "Features", href: "#" },xs
//   { name: "Marketplace", href: "#" },
//   { name: "Company", href: "#" },
// ];

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div>
      <Navbar />
      <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 ">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Plan, Organize, Achieve with ToDo App
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Welcome to ToDo App, where you can organize your tasks, set
              priorities, and accomplish your goals. Create your to-do list,
              manage your tasks, and stay productive with our intuitive
              interface. Never miss a deadline again!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {isSignedIn ? (
                <>
                  <Button
                    asChild
                    className="w-auto rounded-full bg-gradient-to-r  p-4"
                  >
                    <Link href={"/dashboard"}>Go To Dashboard</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    variant={"secondary"}
                    className="w-auto rounded-full bg-gradient-to-r  p-4"
                  >
                    <Link href={"/signup"}>Learn more</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-auto rounded-full bg-gradient-to-r  p-4"
                  >
                    <Link href={"/login"}>
                      Get started <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        iN
      </div>
    </div>
  );
}

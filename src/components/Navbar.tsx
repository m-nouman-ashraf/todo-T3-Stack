"use client";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Menu, XIcon } from "lucide-react";
import { Dialog } from "@headlessui/react";
import DarkMode from "./DarkMode";
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn } = useUser();
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">ToDo</div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {/* {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </a>
            ))} */}
          </div>
          <div className="hidden items-center gap-x-5 lg:flex lg:flex-1 lg:justify-end">
            {isSignedIn ? (
              <UserButton userProfileUrl="/profile" />
            ) : (
              <>
                <Button
                  asChild
                  variant={"secondary"}
                  className="w-auto rounded-full   p-4"
                >
                  <Link href={"/signup"}>SignUp</Link>
                </Button>
                <Button asChild className="w-auto rounded-full   p-4">
                  <Link href={"/login"}>
                    Log in <span aria-hidden="true">&rarr;</span>
                  </Link>
                </Button>
              </>
            )}
            <DarkMode />
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              ToDo
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {/* {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))} */}
                </div>

                <div className="flex flex-col gap-8 py-6">
                  {isSignedIn ? (
                    <UserButton userProfileUrl="/profile" />
                  ) : (
                    <>
                      <Button
                        asChild
                        variant={"secondary"}
                        className="w-auto rounded-full   p-4"
                      >
                        <Link href={"/signup"}>SignUp</Link>
                      </Button>
                      <Button asChild className="w-auto rounded-full   p-4">
                        <Link href={"/login"}>
                          Log in <span aria-hidden="true">&rarr;</span>
                        </Link>
                      </Button>
                    </>
                  )}
                  <DarkMode />
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
};
export default Navbar;

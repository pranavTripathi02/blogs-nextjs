"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  AvatarIcon,
  ChevronDownIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import Leftbar from "./leftbar/leftbar";
import Link from "next/link";
import LogoSVG from "./assets/logo";
import { useSession } from "next-auth/react";
import Image from "next/image";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, status } = useSession();
  // const { user } = data;

  const updateSearch = (newSearch: string) => {
    setSearchTerm(newSearch);
  };

  return (
    <div className="sticky top-0 z-20 mb-4 flex h-16 w-full items-center gap-4 bg-background p-2 shadow-sm">
      {/* Sidebar */}
      <Sheet defaultOpen={false}>
        {/* sidebar btn */}
        <SheetTrigger asChild>
          <Button
            className="md:hidden"
            variant="ghost"
            size="icon"
            // onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            <HamburgerMenuIcon height={24} width={24} />
          </Button>
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className="w-72 overflow-y-scroll bg-background px-4 lg:hidden"
        >
          <Leftbar />
        </SheetContent>
      </Sheet>
      {/* logo */}
      <div className="ms-0 ">
        <Link href="/" className="inline-block align-middle">
          <LogoSVG />
        </Link>
      </div>
      {/* searchbar */}
      <div className="w-72 duration-300 focus-within:w-1/2 focus:outline-2">
        <Input
          className="hidden focus:outline-2 focus-visible:ring-primary-custom md:block"
          type="text"
          value={searchTerm}
          onChange={(e) => updateSearch(e.target.value)}
          placeholder="Search"
        />
      </div>
      {/* user */}
      <div className="me-4 ms-auto">
        {data?.user ? (
          <div className="flex cursor-pointer items-center space-x-2 rounded-md px-4 py-2 hover:bg-muted">
            {data?.user.image ? (
              <div className="size-10 rounded-full">
                <Image src={data?.user.image} alt="user image" fill />
              </div>
            ) : (
              <AvatarIcon width={24} height={24} className="rounded-full" />
            )}
            <span className="block">{data?.user.name}</span>
            <ChevronDownIcon width={16} height={16} />
          </div>
        ) : status === "unauthenticated" ? (
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="border-primary-custom bg-none decoration-primary-custom underline-offset-2 duration-0 hover:underline"
              asChild
            >
              <Link href="/register">Create account</Link>
            </Button>
            <Button variant="ghost" className="hidden md:block">
              <Link href="/api/auth/signin">Log in</Link>
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Navbar;

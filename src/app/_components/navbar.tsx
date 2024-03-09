"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import Leftbar from "./leftbar";
import Image from "next/image";
import Link from "next/link";

// import {Button}

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const updateSearch = (newSearch: string) => {
    setSearchTerm(newSearch);
  };

  return (
    <div className="flex w-full items-center gap-4 border-b bg-background p-2">
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
          className="w-72 overflow-y-scroll ps-2 lg:hidden"
        >
          <Leftbar />
        </SheetContent>
      </Sheet>
      {/* logo */}
      <div className="ms-0 min-h-[48px] min-w-[48px] text-accent">
        <Link href="/">
          <Image src="/nlogx.svg" alt="site logo" width="48" height="48" />
        </Link>
      </div>
      {/* searchbar */}
      <div className="w-72 focus:w-1/2 active:w-1/2">
        <Input
          className="hidden md:block"
          type="text"
          value={searchTerm}
          onChange={(e) => updateSearch(e.target.value)}
          placeholder="Search"
        />
      </div>
      {/* user */}
      <div className="ms-auto flex gap-4">
        <Button
          variant="outline"
          className="underline-offset-2 duration-0 hover:underline"
        >
          <Link href="/register">Create account</Link>
        </Button>
        <Button variant={"link"} className="hidden md:block">
          <Link href="/login">Log in</Link>
        </Button>
      </div>
    </div>
  );
}

export default Navbar;

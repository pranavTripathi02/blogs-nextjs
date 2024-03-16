"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import Leftbar from "./leftbar";
import Link from "next/link";
import LogoSVG from "./assets/logo";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const updateSearch = (newSearch: string) => {
    setSearchTerm(newSearch);
  };

  return (
    <div className="sticky top-0 z-20 flex h-16 w-full items-center gap-4 border-b bg-background p-2">
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
      <div className="ms-0 ">
        <Link href="/" className="inline-block align-middle">
          <LogoSVG />
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
          className="border-primary-custom decoration-primary-custom bg-none underline-offset-2 duration-0 hover:underline"
          asChild
        >
          <Link href="/register">Create account</Link>
        </Button>
        <Button variant="ghost" className="hidden md:block">
          <Link href="/login">Log in</Link>
        </Button>
      </div>
    </div>
  );
}

export default Navbar;

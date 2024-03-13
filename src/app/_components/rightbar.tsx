"use client";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

function Rightbar() {
  const handleThemeChange = (theme: string) => {
    if (document.documentElement.classList.contains(theme)) {
      document.documentElement.classList.remove(theme);
    } else {
      document.documentElement.classList.add(theme);
    }
  };

  return (
    <aside className="flex flex-col gap-4 rounded-md">
      {/* Theme */}
      <Select onValueChange={handleThemeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </aside>
  );
}

export default Rightbar;

"use client";

import Sidebar from "@/components/Sidebar";
import UserProfile from "@/components/UserProfile";

export default function page() {
  return (
    <Sidebar>
      <UserProfile />
    </Sidebar>
  );
}

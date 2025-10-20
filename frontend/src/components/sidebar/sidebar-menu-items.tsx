"use client";

import {usePathname} from "next/navigation";
import {Home} from "lucide-react";
import {SidebarMenuButton, SidebarMenuItem} from "~/components/ui/sidebar";
import Link from "next/link";

export default function SidebarMenuItems() {
  const path = usePathname();

  let items = [{ title: "Home", url: "/", icon: Home, active: false }];

  items = items.map((item) => ({
    ...item,
    active: path === item.url,
  }));

  return (
      <>
        {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={item.active}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
        ))}
      </>
  )
}
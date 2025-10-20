import {Sidebar, SidebarContent,
  SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarSeparator} from "~/components/ui/sidebar";
import SidebarMenuItems from "./sidebar-menu-items";
import {Credits} from "~/components/sidebar/credits";
import Upgrade from "~/components/sidebar/upgrade";
import { UserButton } from "@daveyplate/better-auth-ui";
import {User} from "lucide-react";

export function AppSidebar() {
  return (
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className='text-primary mt-4 mb-12 flex justify-center px-2 text-3xl font-black tracking-widest uppercase antialiased'>
              <p>AvaGen</p>
            </SidebarGroupLabel>
            <SidebarSeparator />
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItems />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className='mb-2 flex w-full items-center justify-center gap-1 text-xs'>
            <Credits />
            <Upgrade />
          </div>
          <UserButton
            variant='outline'
            size='default'
            additionalLinks={[
              {
                label: "Customer Portal",
                href: "/customer-portal",
                icon: <User />,
              },
            ]}
          />
        </SidebarFooter>
      </Sidebar>
  );
}
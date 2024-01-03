"use client";
import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
  Link,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { signOutSupabase } from "@/lib/client_actions/auth/sign-out-action";
import { toast } from "react-toastify";
import { topCentredColoredToastOptions } from "@/lib/customToastOptions";
import { Session } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname } from "next/navigation";

export default function HomeNav() {
  const pathname = usePathname();
  const supabase = createClientComponentClient();
  const [session, setSession] = useState<Session | null | undefined>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ["Home", "Chat", "Notes", "Pets"];

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await supabase.auth.getSession();
        if (response.error) throw response.error;
        setSession(response.data.session);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSessionData();
  });

  const handleSignout = async () => {
    toast.info("Signed Out 👋🏻", topCentredColoredToastOptions);
    await signOutSupabase();
    window.location.reload();
  };

  return (
    <Navbar
      maxWidth="md"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">p-0</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">p-0</p>
        </NavbarBrand>
        {menuItems.map((obj, index) => {
          return (
            <NavbarItem key={`${obj}-${index}`}>
              <Link
                underline={
                  pathname.match(obj.toLowerCase()) ? "always" : "hover"
                }
                href={`/app/${obj.toLowerCase()}`}
              >
                {obj}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Your Account"
              size="sm"
              src="https://lh3.googleusercontent.com/p/AF1QipMtm9k79l83GgWcVeAfEM6SYZx1OtxPrmX5_pcQ=w1080-h608-p-no-v0"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold py-1">
                {!session ? "..." : session?.user.email}
              </p>
              <hr />
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleSignout}>
              Signout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((obj, index) => (
          <NavbarMenuItem key={`${obj}-${index}`}>
            <Link
              className="w-full mb-2"
              underline={pathname.match(obj.toLowerCase()) ? "always" : "hover"}
              href={`/app/${obj.toLowerCase()}`}
              size="lg"
            >
              {obj}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

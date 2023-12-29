"use client";
import { useContext, useEffect, useState } from "react";
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
import { signOutSupabase } from "@/lib/actions/sign-out-action";
import { toast } from "react-toastify";
import { infoToastOptions } from "@/lib/customToastOptions";
import { SessionContext } from "@/context/Providers";
import { User } from "@supabase/supabase-js";

export default function HomeNav() {
  const session = useContext(SessionContext);
  const [user, setUser] = useState<User | string>("...💖");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setUser(session?.user as User);
  });

  const handleSignout = async () => {
    toast.info("Signed Out 👋🏻", infoToastOptions);
    await signOutSupabase();
    window.location.reload();
  };

  const menuItems = ["Home", "Chat", "Notes", "Account"];

  return (
    <Navbar
      maxWidth="sm"
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
          <p>fucku</p>
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <p>fucku</p>
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="/home">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" aria-current="page">
            Chat
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" aria-current="page">
            Notes
          </Link>
        </NavbarItem>
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
              <p className="font-semibold py-1">{user.email}</p>
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
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

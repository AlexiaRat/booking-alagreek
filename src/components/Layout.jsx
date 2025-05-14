import React from "react";
import { Outlet } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import ContactButton from "../components/ContactButton";

export default function Layout() {
  return (
    <>
      {/* Aici poți avea și un Navbar, Header etc. */}
      <Outlet />
      <ContactButton />
      <LanguageSwitcher />
    </>
  );
}

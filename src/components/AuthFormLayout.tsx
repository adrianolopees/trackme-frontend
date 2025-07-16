import type { ReactNode } from "react";
import AuthRedirectLinks from "./AuthRedirectLinks";

interface AuthFormLayoutProps {
  title: string;
  children: ReactNode;
  redirectLinks?: ReactNode;
}

export default function AuthFormLayout({
  title,
  children,
  redirectLinks,
}: AuthFormLayoutProps) {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      {children}

      {redirectLinks || <AuthRedirectLinks />}
    </>
  );
}

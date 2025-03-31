import Settings from "@Components/Settings";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | Soar Financial",
  description: "Manage your account settings, preferences, and security options",
  keywords: ["settings", "account settings", "preferences", "security settings", "profile management"],
  alternates: {
    canonical: "/settings",
  },
  openGraph: {
    title: "Settings | Soar Financial",
    description: "Manage your account settings, preferences, and security options",
    url: "/settings",
    type: "website",
    images: [
      {
        url: "https://soar-financial.example.com/settings-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Soar Financial Settings Page",
      },
    ],
  },
};

export default function SettingsPage() {
  return (
    <Settings />
  );
}

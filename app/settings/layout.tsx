import SettingsNav from "@Components/settingsNav/SettingsNav";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="space-y-4 m-2 bg-white w-full p-8 rounded-3xl box-border">
        <SettingsNav />
        {children}
      </main>
    );
  }
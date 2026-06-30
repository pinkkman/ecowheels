import "../globals.css"
import AdminNavbar from "@/components/AdminNavbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AdminNavbar />
        {children}
      </body>
    </html>
  );
}


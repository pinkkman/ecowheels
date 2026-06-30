import "../globals.css"
import AdminNavbar from "@/components/AdminNavbar";
import Providers from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AdminNavbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
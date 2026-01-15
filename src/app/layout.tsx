// src/app/layout.tsx
import "./globals.css";
import { AuthProvider } from "../context/auth-context";
import Header from "../components/header";
import Footer from "../components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <main style={{ minHeight: "80vh" }}>
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "portfolio-0-nextjs-supabase",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="leading-relaxed">
        <Providers>
          <section className="main-content">{children}</section>
          <Footer />
        </Providers>
      </body>
      <script type="module">
        import emojiDatasourceApple from
        'https://cdn.jsdelivr.net/npm/emoji-datasource-apple@15.0.1/+esm'
      </script>
    </html>
  );
}

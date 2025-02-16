import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google"

const roboto = Roboto ({
  weight: '400',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Vila Imperio",
  description: "Criacao de fichas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={roboto.className}>
      <body>
        {children}
        <footer>
          <p className="text-center text-gray-200">© 2025 Breno Leonel - Todos os direitos reservados</p>
        </footer>
      </body>
    </html>
  );
}

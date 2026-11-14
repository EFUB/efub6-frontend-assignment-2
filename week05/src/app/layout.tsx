import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";

export const metadata = { title: "Todo" };

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}

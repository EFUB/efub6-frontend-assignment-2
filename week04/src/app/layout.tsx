import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import StyledComponentsRegistry from "@/lib/registry";
import { Header, HeaderInner, Logo, Main } from "./components/styled";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "스-포츠 좋아하세요?",
  description: "내가 좋아하는 스포츠 애니메이션 모음",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={notoSansKr.className}>
      <body>
        <StyledComponentsRegistry>
          <Header>
            <HeaderInner>
              <Logo href="/">스-포츠 좋아하세요?</Logo>
            </HeaderInner>
          </Header>
          <Main>{children}</Main>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

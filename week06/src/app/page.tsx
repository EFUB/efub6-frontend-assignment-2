export default function Home() {
  return (
    <div>
      <h4>메인 페이지</h4>
      <Link href="/list">글 목록</Link>{" "}
      <Link href="/write">글쓰기</Link>{" "}
      <Link href="/register">회원가입</Link>
    </div>
  );
}
import Link from "next/link";

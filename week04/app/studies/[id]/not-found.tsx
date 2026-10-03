import Link from "next/link";

export default function StudyNotFound() {
  return <section className="empty-state"><h1>스터디를 찾을 수 없어요.</h1><p>주소를 다시 확인하거나 다른 스터디를 둘러보세요.</p><Link href="/studies">스터디 목록으로</Link></section>;
}

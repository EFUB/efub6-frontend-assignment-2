import Link from "next/link";
import StudyCard from "./components/study-card";
import { studies } from "./lib/studies";

export default function Home() {
  return (
    <div className="container page-space">
      <section className="home-intro">
        <h1>스터디 모아보기</h1>
        <p>학교에서 함께 공부할 사람을 찾는 스터디 목록입니다.</p>
        <Link href="/studies">전체 스터디 보기</Link>
      </section>
      <section aria-labelledby="recommended">
        <div className="section-heading"><h2 id="recommended">스터디 목록</h2></div>
        <div className="card-grid">{studies.map((study) => <StudyCard key={study.id} study={study} />)}</div>
      </section>
      <aside className="guide-note"><p>참여 방법이 궁금하다면 <Link href="/studies/guide">참여 안내</Link>를 확인해주세요.</p></aside>
    </div>
  );
}

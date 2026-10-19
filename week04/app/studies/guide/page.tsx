import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "참여 안내" };
const steps = [
  { title: "스터디 고르기", text: "시험공부, 프론트 과제, 토익 스피킹 중 필요한 스터디를 고릅니다." },
  { title: "시간과 장소 확인하기", text: "상세 페이지에서 모임 시간과 장소를 확인합니다." },
  { title: "관심 표시하기", text: "관심 있는 스터디에 버튼을 누릅니다. 과제용 사이트라 실제 신청은 받지 않습니다." },
];
export default function GuidePage() {
  return <>
    <div className="page-heading"><h1>스터디 참여 안내</h1><p>스터디를 둘러보는 방법과 참여할 때 지킬 약속입니다.</p></div>
    <ol className="guide-steps">{steps.map((step) => <li key={step.title}><h2>{step.title}</h2><p>{step.text}</p></li>)}</ol>
    <aside className="promise"><h2>참여할 때 지킬 점</h2><p>공부할 자료는 각자 가져옵니다.<br />늦거나 못 오는 날에는 미리 알려주세요.</p></aside>
    <Link href="/studies">스터디 목록 보기</Link>
  </>;
}

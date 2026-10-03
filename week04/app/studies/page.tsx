import type { Metadata } from "next";
import StudyCard from "../components/study-card";
import { studies } from "../lib/studies";

export const metadata: Metadata = { title: "스터디 찾기" };
export default function StudiesPage() {
  return <>
    <div className="page-heading"><h1>전체 스터디</h1><p>스터디를 선택하면 시간과 활동 내용을 볼 수 있습니다.</p></div>
    <div className="list-heading"><h2>스터디 {studies.length}개</h2></div>
    <div className="card-grid">{studies.map((study) => <StudyCard key={study.id} study={study} />)}</div>
    <p className="sample-note">세미나 과제를 위한 샘플 스터디입니다. 실제 모집이나 신청은 진행하지 않습니다.</p>
  </>;
}

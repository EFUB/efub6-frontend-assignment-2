import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import InterestButton from "../../components/interest-button";
import { studies } from "../../lib/studies";

type Props = { params: Promise<{ id: string }> };
export function generateStaticParams() {
  return studies.map(({ id }) => ({ id }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const study = studies.find((item) => item.id === id);
  return { title: study?.title ?? "스터디를 찾을 수 없어요" };
}
export default async function StudyDetailPage({ params }: Props) {
  const { id } = await params;
  const study = studies.find((item) => item.id === id);
  if (!study) notFound();
  return <>
    <Link className="text-link back-link" href="/studies">← 스터디 목록</Link>
    <div className="detail-grid">
      <div>
        <Image className="detail-image" src={study.image} alt={study.imageAlt} width={study.imageWidth} height={study.imageHeight} />
        <section className="detail-section"><h2>스터디 소개</h2><p>{study.description}</p></section>
        <section className="detail-section"><h2>활동 내용</h2><ul className="activity-list">{study.activities.map((activity) => <li key={activity}>{activity}</li>)}</ul></section>
      </div>
      <aside className="detail-panel">
        <span className="tag">{study.category}</span><h1>{study.title}</h1><p>{study.summary}</p>
        <dl><div><dt>모임 시간</dt><dd>{study.schedule}</dd></div><div><dt>모임 장소</dt><dd>{study.place}</dd></div><div><dt>참여 대상</dt><dd>{study.members}</dd></div></dl>
        <InterestButton key={study.id} />
        <p className="sample-note">실제 모집이 아닌 과제용 샘플 모임입니다.</p>
      </aside>
    </div>
  </>;
}

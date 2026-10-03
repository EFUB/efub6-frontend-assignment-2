import Image from "next/image";
import Link from "next/link";
import type { Study } from "../lib/studies";

export default function StudyCard({ study }: { study: Study }) {
  return (
    <article className="study-card"><Link href={`/studies/${study.id}`}>
      <Image className="card-image" src={study.image} alt={study.imageAlt} width={study.imageWidth} height={study.imageHeight} />
      <div className="card-body">
        <span className="tag">{study.category}</span><h3>{study.title}</h3><p>{study.summary}</p>
        <div className="card-meta">{study.schedule}</div>
      </div>
    </Link></article>
  );
}

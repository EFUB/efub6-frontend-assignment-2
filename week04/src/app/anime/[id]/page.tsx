import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BookmarkButton from "@/app/components/BookmarkButton";
import {
  Detail,
  Info,
  Meta,
  Poster,
  PosterBox,
  Summary,
  Title,
} from "@/app/components/styled";
import { animes, getAnime } from "@/data/animes";

export function generateStaticParams() {
  return animes.map((anime) => ({ id: anime.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/anime/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: getAnime(id)?.title };
}

export default async function AnimeDetailPage({
  params,
}: PageProps<"/anime/[id]">) {
  const { id } = await params;
  const anime = getAnime(id);

  if (!anime) notFound();

  return (
    <Detail>
      <PosterBox>
        <Poster
          src={anime.image}
          alt={`${anime.title} 포스터`}
          fill
          sizes="(min-width: 1024px) 480px, 50vw"
          loading="lazy"
          placeholder="blur"
        />
      </PosterBox>

      <Info>
        <Title>{anime.title}</Title>

        <Meta>
          <dt>분량</dt>
          <dd>{anime.episodes}</dd>
          <dt>장르</dt>
          <dd>{anime.sport}</dd>
        </Meta>

        <Summary>{anime.summary}</Summary>

        <BookmarkButton title={anime.title} />
      </Info>
    </Detail>
  );
}

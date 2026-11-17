import type { Anime } from "@/data/animes";
import {
  Card,
  CardBody,
  CardSport,
  CardTitle,
  Poster,
  PosterBox,
} from "./styled";

export default function AnimeCard({ anime }: { anime: Anime }) {
  return (
    <Card href={`/anime/${anime.id}`}>
      <PosterBox>
        <Poster
          src={anime.image}
          alt={`${anime.title} 포스터`}
          fill
          sizes="(min-width: 1024px) 320px, 33vw"
          loading="lazy"
          placeholder="blur"
        />
      </PosterBox>
      <CardBody>
        <CardTitle>{anime.title}</CardTitle>
        <CardSport>{anime.sport}</CardSport>
      </CardBody>
    </Card>
  );
}

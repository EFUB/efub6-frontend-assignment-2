import AnimeCard from "./components/AnimeCard";
import { Grid } from "./components/styled";
import { animes } from "@/data/animes";

export default function HomePage() {
  return (
    <Grid>
      {animes.map((anime) => (
        <li key={anime.id}>
          <AnimeCard anime={anime} />
        </li>
      ))}
    </Grid>
  );
}

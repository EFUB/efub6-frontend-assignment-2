import type { StaticImageData } from "next/image";
import backflip from "@/assets/images/backflip.png";
import blueLock from "@/assets/images/blue-lock.png";
import boukyakuBattery from "@/assets/images/boukyaku-battery.png";
import free from "@/assets/images/free.png";
import haikyu from "@/assets/images/haikyu.png";
import kuroko from "@/assets/images/kuroko.png";
import sk8 from "@/assets/images/sk8.png";
import slamDunk from "@/assets/images/slam-dunk.png";
import tsurune from "@/assets/images/tsurune.png";

export type Anime = {
  id: string;
  title: string;
  sport: string;
  episodes: string;
  summary: string;
  image: StaticImageData;
};

export const animes: Anime[] = [
  {
    id: "haikyu",
    title: "하이큐!!",
    sport: "배구",
    episodes: "TV 1~4기 총 85화",
    summary:
      "키는 작지만 누구보다 높이 뛰는 히나타 쇼요가 카라스노 고교 배구부에 들어가, 중학 시절 라이벌이었던 천재 세터 카게야마와 콤비를 이루며 전국 대회를 향해 나아가는 이야기.",
    image: haikyu,
  },
  {
    id: "slam-dunk",
    title: "슬램덩크",
    sport: "농구",
    episodes: "TV 총 101화",
    summary:
      "농구의 '농'자도 모르던 불량 학생 강백호가 좋아하는 여학생의 한마디에 북산고 농구부에 들어가고, 점점 농구 자체에 빠져들며 팀과 함께 전국 제패에 도전하는 이야기.",
    image: slamDunk,
  },
  {
    id: "blue-lock",
    title: "블루 록",
    sport: "축구",
    episodes: "TV 1~2기 총 38화",
    summary:
      "일본을 월드컵 우승으로 이끌 단 한 명의 스트라이커를 만들기 위해 300명의 고교생 공격수가 '블루 록' 시설에 모인다. 이사기 요이치가 탈락하면 끝인 생존 경쟁 속에서 자신만의 에고를 깨워 가는 이야기.",
    image: blueLock,
  },
  {
    id: "boukyaku-battery",
    title: "망각 배터리",
    sport: "야구",
    episodes: "TV 1기 총 12화",
    summary:
      "중학 야구계를 휩쓸던 괴물 투수 키요미네와 명포수 카나메. 그런데 카나메가 기억을 잃고 야구 초보가 되어 버리고, 두 사람은 야구부도 없던 무명 도립 고교에서 다시 야구를 시작한다.",
    image: boukyakuBattery,
  },
  {
    id: "tsurune",
    title: "츠루네 -카제마이 고교 궁도부-",
    sport: "궁도",
    episodes: "TV 1~2기 총 26화",
    summary:
      "활을 너무 빨리 놓아 버리는 '속사병' 때문에 궁도를 그만뒀던 나루미야 미나토가 카제마이 고교 궁도부에서 동료들과 함께 다시 활을 잡고, 아름다운 현의 소리 '츠루네'를 되찾아 가는 이야기.",
    image: tsurune,
  },
  {
    id: "backflip",
    title: "백 텀블링!!",
    sport: "남자 신체조",
    episodes: "TV 총 12화",
    summary:
      "중학교 내내 야구부에서 빛을 보지 못한 후타바 쇼타로가 우연히 본 남자 신체조 연기에 매료되어 소슈칸 고교 신체조부에 입부하고, 동료들과 호흡을 맞추며 전국 대회를 목표로 성장하는 이야기.",
    image: backflip,
  },
  {
    id: "sk8",
    title: "SK∞ 에스케이 에이트",
    sport: "스케이트보드",
    episodes: "TV 총 12화",
    summary:
      "폐광산에서 한밤중에 열리는 규칙 없는 스케이트보드 레이스 'S'. 스케이트에 푹 빠진 고교생 레키와, 캐나다에서 전학 온 전직 스노보더 랑가가 만나 'S'의 강자들과 맞붙는 이야기.",
    image: sk8,
  },
  {
    id: "kuroko",
    title: "쿠로코의 농구",
    sport: "농구",
    episodes: "TV 1~3기 총 75화",
    summary:
      "중학 최강 '기적의 세대'의 숨겨진 여섯 번째 선수 쿠로코 테츠야가 세이린 고교에서 카가미 타이가를 만나, 그의 그림자가 되어 옛 동료들을 차례로 쓰러뜨리고 일본 제일을 노리는 이야기.",
    image: kuroko,
  },
  {
    id: "free",
    title: "Free!",
    sport: "수영",
    episodes: "TV 1~3기 총 37화",
    summary:
      "물을 사랑하는 나나세 하루카가 어린 시절 함께 릴레이를 했던 친구들과 재회해 이와토비 고교 수영부를 만들고, 라이벌이 되어 돌아온 린과 다시 헤엄치며 각자의 꿈을 찾아가는 이야기.",
    image: free,
  },
];

export function getAnime(id: string): Anime | undefined {
  return animes.find((anime) => anime.id === id);
}

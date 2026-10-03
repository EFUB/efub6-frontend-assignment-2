export type Study = {
  id: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  schedule: string;
  place: string;
  members: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  activities: string[];
};

export const studies: Study[] = [
  {
    id: "reading", title: "시험기간 같이 카공", category: "시험공부",
    summary: "시험기간에 같이 공부할 사람을 찾는 스터디입니다.",
    description: "각자 시험공부할 자료를 가져옵니다. ECC 근처 카페에서 만나고, 시간은 같이 정합니다.",
    schedule: "시험기간 오후 · 시간 협의", place: "ECC 근처 카페 · 장소 협의", members: "3–4명 · 이화여대 학생",
    image: "/images/exam-study.png", imageAlt: "종이에 파묻힌 사람",
    imageWidth: 1100, imageHeight: 990,
    activities: ["각자 시험공부하기", "쉬는 시간 같이 정하기", "다음 모임 시간 정하기"],
  },
  {
    id: "frontend", title: "프론트 과제 같이 하기", category: "과제",
    summary: "프론트 과제를 같이 하면서 모르는 부분을 물어봅니다.",
    description: "노트북을 가져와 각자 프론트 과제를 합니다. 막히는 부분은 코드를 보면서 질문합니다.",
    schedule: "매주 화요일 19:00–21:00", place: "학교 스터디룸", members: "3–5명 · 프론트 공부하는 학생",
    image: "/images/frontend-code.png", imageAlt: "프론트엔드 코드 화면",
    imageWidth: 703, imageHeight: 645,
    activities: ["각자 프론트 과제하기", "모르는 코드 질문하기", "과제 실행 결과 확인하기"],
  },
  {
    id: "english", title: "토익 스피킹 연습", category: "어학",
    summary: "토익 스피킹 답변 연습을 같이 합니다.",
    description: "토익 스피킹 문제를 준비해 번갈아 답합니다. 시간을 재고 서로의 답변을 듣습니다.",
    schedule: "매주 목요일 17:00–18:00", place: "학교 스터디룸", members: "3–4명 · 토익 스피킹 준비하는 학생",
    image: "/images/english-speaking.png", imageAlt: "I SPEAK English fluently 문구",
    imageWidth: 1207, imageHeight: 1016,
    activities: ["연습할 문제 정하기", "시간을 재면서 답변하기", "답변을 듣고 의견 나누기"],
  },
];

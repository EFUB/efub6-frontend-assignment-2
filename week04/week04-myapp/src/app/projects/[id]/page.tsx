'use client';

import { use, useState } from 'react';

const projectDetails: Record<string, { title: string; desc: string }> = {
  '1': { title: 'Doodoong', desc: '게이피케이션을 활용한 To Do List 서비스 DodDoong의 프론트엔드 개발로 참여했습니다.' },
  '2': { title: 'Hey Young Campus UI 개선', desc: '기존 앱의 정보 구조(IA)를 분석하여 사용성 중심의 화면으로 재설계했습니다.' },
  '3': { title: 'X(트위터) 클론코딩', desc: '실시간 트윗 작성과 인터랙션을 구현한 X(트위터) 클론 코딩 프론트엔드 개발 프로젝트입니다' },
};

export default function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const project = projectDetails[id];

  // Client Component 필수 요소: useState 활용 (좋아요/추천 기능)
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  if (!project) {
    return <div>프로젝트를 찾을 수 없습니다.</div>;
  }

  // 이벤트 함수 (onClick)
  const handleLike = () => {
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    setLiked(!liked);
  };

  return (
    <div>
      <h1>{project.title}</h1>
      <p style={{ margin: '20px 0', fontSize: '16px' }}>{project.desc}</p>

      <button
        onClick={handleLike}
        style={{
          padding: '10px 20px',
          backgroundColor: liked ? '#ff4d4f' : '#f0f0f0',
          color: liked ? '#fff' : '#000',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        {liked ? '❤️ 좋아요 취소' : '🤍 종아요'} ({likes})
      </button>
    </div>
  );
}
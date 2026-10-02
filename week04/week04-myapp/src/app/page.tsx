import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>👋 안녕하세요, EFUB 프론트엔드 인턴 송나영입니다.</h1>
      <p>Next.js App Router로 구축한 포트폴리오입니다.</p>
      
      <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
        <Link href="/projects" style={{ fontWeight: 'bold', color: '#0070f3' }}>
          프로젝트 보러가기 →
        </Link>
        <Link href="/contact" style={{ fontWeight: 'bold', color: '#0070f3' }}>
          연락처 및 프로필 보기 →
        </Link>
      </div>
    </div>
  );
}
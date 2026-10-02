import Link from 'next/link';

const projects = [
  { id: '1', title: 'Doodoong', tech: 'React' },
  { id: '2', title: 'Hey Young Campus UI 개선 프로젝트', tech: 'Figma, UI/UX' },
  { id: '3', title: 'X(트위터) 클론코딩', tech: 'React' },
];

export default function ProjectsPage() {
  return (
    <div>
      <h1>💻 Projects</h1>
      <p>진행했던 주요 프로젝트 목록입니다. 상세 내용을 확인해 보세요!</p>
      <ul>
        {projects.map((project) => (
          <li key={project.id} style={{ margin: '15px 0' }}>
            <Link href={`/projects/${project.id}`} style={{ fontSize: '18px', textDecoration: 'underline' }}>
              {project.title} ({project.tech})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
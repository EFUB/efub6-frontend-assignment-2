export default function AboutPage() {
  return (
    <div>
      <h1>About Me</h1>
      {/* 아래와 같이 p 태그에 마진을 주어 간격을 만듭니다 */}
      <p style={{ marginBottom: '20px' }}>
        이화여대 컴퓨터공학과 재학중이며 웹 프론트엔드와 UI/UX 디자인 및 기획에도 깊은 관심을 가지고 있습니다.
      </p>
      <ul>
        <li>Ewha Womans University Computer Science & Engineering</li>
        <li>EFUB 6th Frontend Intern</li>
        <li>Coding Study Club 'Steady' Founder & Representative</li>
        <li>Director of the Welfare Department for the Computer Science and Engineering Student Council</li>
        <li>PR Team Member for "Ewha With U" (14th & 15th generations), and Representative (17th generation)</li>
      </ul>
    </div>
  );
}
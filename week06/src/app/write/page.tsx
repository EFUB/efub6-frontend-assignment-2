import Link from "next/link";

export default function Write() {
  return (
    <div>
      <h4>작성 페이지</h4>
      <form action="/api/post/new" method="POST">
        <input type="text" name="title" placeholder="제목" aria-label="제목" required />
        <textarea name="content" placeholder="내용" aria-label="내용" required />
        <button type="submit">게시</button>
      </form>
      <Link href="/list">목록으로</Link>
    </div>
  );
}

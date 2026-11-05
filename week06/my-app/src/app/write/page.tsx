export default function Write() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">작성 페이지</h1>
      <form
        action="/api/post/new"
        method="POST"
        className="space-y-3 rounded-2xl border border-stone-200 bg-white p-6"
      >
        <input
          type="text"
          name="title"
          placeholder="제목"
          required
          className="w-full rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-stone-900"
        />
        <textarea
          name="content"
          placeholder="내용"
          required
          className="h-40 w-full rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-stone-900"
        />
        <button
          type="submit"
          className="rounded-full bg-stone-900 px-4 py-2 text-sm text-white"
        >
          게시
        </button>
      </form>
    </div>
  );
}

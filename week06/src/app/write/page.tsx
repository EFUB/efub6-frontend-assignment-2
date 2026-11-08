import PageNavButtons from "@/components/PageNavButtons";

export default function Write() {
  return (
    <div>
      <h4 className="mb-6 font-display text-3xl">작성 페이지</h4>
      <form
        id="write-form"
        action="/api/post/new"
        method="POST"
        className="flex flex-col gap-3 rounded-xl border-2 border-[#f3e8c8] bg-white p-6"
      >
        <input
          type="text"
          name="title"
          placeholder="제목"
          required
          className="w-full border-b-2 border-[#f3e8c8] bg-white px-1 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:border-[#e2cd94]"
        />
        <textarea
          name="content"
          placeholder="내용"
          required
          rows={8}
          className="w-full resize-y border-b-2 border-[#f3e8c8] bg-white px-1 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:border-[#e2cd94]"
        ></textarea>
      </form>
      <PageNavButtons>
        <button
          type="submit"
          form="write-form"
          className="cursor-pointer font-display rounded-lg bg-[#f3e8c8] px-4 py-2 text-sm font-medium text-black hover:bg-[#e2cd94]"
        >
          게시
        </button>
      </PageNavButtons>
    </div>
  );
}

import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import { postCollection } from "@/utils/database";
import PageNavButtons from "@/components/PageNavButtons";

export default async function Edit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) notFound();
  const collection = await postCollection();
  const result = await collection.findOne({ _id: new ObjectId(id) });
  if (!result) notFound();
  return (
    <div>
      <h4 className="mb-6 font-display text-3xl">수정 페이지</h4>
      <form
        id="edit-form"
        action="/api/post/edit"
        method="POST"
        className="flex flex-col gap-3 rounded-xl border-2 border-[#f3e8c8] bg-white p-6"
      >
        <input
          name="title"
          placeholder="제목"
          defaultValue={result.title}
          required
          className="w-full border-b-2 border-[#f3e8c8] bg-white px-1 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:border-[#e2cd94]"
        />
        <textarea
          name="content"
          placeholder="내용"
          defaultValue={result.content}
          required
          rows={8}
          className="w-full resize-y border-b-2 border-[#f3e8c8] bg-white px-1 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:border-[#e2cd94]"
        />
        <input type="hidden" name="_id" defaultValue={result._id.toString()} />
      </form>
      <PageNavButtons>
        <button
          type="submit"
          form="edit-form"
          className="cursor-pointer font-display rounded-lg bg-[#f3e8c8] px-4 py-2 text-sm font-medium text-black hover:bg-[#e2cd94]"
        >
          수정
        </button>
      </PageNavButtons>
    </div>
  );
}

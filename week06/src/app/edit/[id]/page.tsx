import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import { postCollection } from "@/utils/database";
import PageNavButtons from "@/components/PageNavButtons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { canModify } from "@/utils/auth";

const messageClass =
  "rounded-xl border-2 border-dashed border-[#f3e8c8] py-16 text-center text-sm text-stone-500";

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

  const session = await getServerSession(authOptions);
  if (!session) {
    return <p className={messageClass}>로그인 후 글을 수정할 수 있습니다.</p>;
  }
  if (!canModify(session, result)) {
    return <p className={messageClass}>본인이 작성한 글만 수정할 수 있습니다.</p>;
  }

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

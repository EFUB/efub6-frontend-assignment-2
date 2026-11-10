import { connectDB } from '@/utils/database';
import type { Post } from '@/models/post';
import { notFound } from 'next/navigation';
import { ObjectId } from 'mongodb';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Edit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  if (!ObjectId.isValid(id)) notFound();
  const db = (await connectDB).db('forum');
  const postCollection = db.collection<Post>('post');
  const result = await postCollection.findOne({ _id: new ObjectId(id) });
  if (!result) notFound();

  return (
    <div className='p-20'>
      <h4>수정 페이지</h4>
      <form action='/api/post/edit' method='POST'>
        <input name='title' placeholder='제목' aria-label='제목' required defaultValue={result.title} />
        <textarea
          name='content'
          placeholder='내용'
          aria-label='내용'
          required
          defaultValue={result.content}
        />
        <input
          type='hidden'
          name='_id'
          defaultValue={result._id.toString()}
        />
        <button type='submit'>수정</button>
      </form>
      <Link href='/list'>목록으로</Link>
    </div>
  );
}

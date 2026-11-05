interface Props {
  searchParams: Promise<{ error?: string; success?: string }>;
}

const errorMessage: Record<string, string> = {
  duplicate: "이미 존재하는 아이디입니다.",
  empty: "아이디와 비밀번호를 모두 입력해주세요.",
};

export default async function Register({ searchParams }: Props) {
  const query = await searchParams;
  const errorText = query.error ? errorMessage[query.error] : null;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">회원가입</h1>
      {errorText ? <p className="text-sm text-red-600">{errorText}</p> : null}
      {query.success ? (
        <p className="text-sm text-green-700">가입되었습니다.</p>
      ) : null}
      <form
        action="/api/user/register"
        method="POST"
        className="space-y-3 rounded-2xl border border-stone-200 bg-white p-6"
      >
        <input
          type="text"
          name="id"
          placeholder="아이디"
          required
          className="w-full rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-stone-900"
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          required
          className="w-full rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-stone-900"
        />
        <button
          type="submit"
          className="rounded-full bg-stone-900 px-4 py-2 text-sm text-white"
        >
          가입하기
        </button>
      </form>
    </div>
  );
}

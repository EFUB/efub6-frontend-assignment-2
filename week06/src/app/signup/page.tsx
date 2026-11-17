import PageNavButtons from "@/components/PageNavButtons";
import UsernameInput from "@/components/UsernameInput";

const errorMessages: Record<string, string> = {
  empty: "아이디와 비밀번호를 모두 입력해주세요.",
  invalid: "아이디는 영문, 숫자 10자 이내로 입력해주세요.",
  duplicate: "이미 존재하는 아이디입니다.",
};

export default async function Signup({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const { error, success } = await searchParams;
  const errorMessage = error ? errorMessages[error] : undefined;

  return (
    <div className="mx-auto w-fit max-w-full">
      <h4 className="mb-6 text-center font-display text-3xl">회원가입</h4>
      <form
        id="signup-form"
        action="/api/auth/signup"
        method="POST"
        className="flex flex-col gap-3 rounded-xl border-2 border-[#f3e8c8] bg-white p-6"
      >
        <UsernameInput />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          required
          autoComplete="new-password"
          className="w-full border-b-2 border-[#f3e8c8] bg-white px-1 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:border-[#e2cd94]"
        />
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
        {success && (
          <p className="text-sm text-stone-500">회원가입이 완료되었습니다.</p>
        )}
      </form>
      <PageNavButtons>
        <button
          type="submit"
          form="signup-form"
          className="cursor-pointer font-display rounded-lg bg-[#f3e8c8] px-4 py-2 text-sm font-medium text-black hover:bg-[#e2cd94]"
        >
          가입하기
        </button>
      </PageNavButtons>
    </div>
  );
}

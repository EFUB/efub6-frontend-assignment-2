"use client";

export default function UsernameInput() {
  return (
    <input
      type="text"
      name="username"
      placeholder="아이디 (영문, 숫자 10자 이내)"
      required
      maxLength={10}
      pattern="[A-Za-z0-9]{1,10}"
      title="영문, 숫자 10자 이내로 입력해주세요."
      autoComplete="username"
      onInput={(e) => {
        const input = e.currentTarget;
        const cleaned = input.value.replace(/[^A-Za-z0-9]/g, "");
        if (cleaned !== input.value) input.value = cleaned;
      }}
      className="w-full border-b-2 border-[#f3e8c8] bg-white px-1 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:border-[#e2cd94]"
    />
  );
}

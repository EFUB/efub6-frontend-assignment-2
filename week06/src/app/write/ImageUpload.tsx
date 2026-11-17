"use client";
import { useState, type ChangeEvent } from "react";

type PresignedPost = { url: string; fields: Record<string, string> };

export default function ImageUpload() {
  const [fileName, setFileName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setImageUrl("");
    setStatus("uploading");

    try {
      const name = encodeURIComponent(file.name);
      const type = encodeURIComponent(file.type);
      const res = await fetch(`/api/post/image?file=${name}&type=${type}`);
      if (!res.ok) throw new Error("presigned url 발급 실패");
      const { url, fields }: PresignedPost = await res.json();

      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("file", file);
      const upload = await fetch(url, { method: "POST", body: formData });
      if (!upload.ok) throw new Error(`업로드 실패: ${upload.status}`);

      setImageUrl(url + fields.key);
      setStatus("idle");
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      e.target.value = "";
    }
  };

  const removeImage = () => {
    setFileName("");
    setImageUrl("");
    setStatus("idle");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <label className="cursor-pointer rounded-lg border-2 border-[#f3e8c8] bg-white px-4 py-2 font-display text-sm hover:bg-[#fbf6e4]">
          파일 선택
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="sr-only"
          />
        </label>
        <span className="ml-auto min-w-0 truncate text-sm text-stone-400">
          {status === "uploading"
            ? "업로드 중..."
            : status === "error"
              ? "업로드에 실패했습니다."
              : fileName || "선택된 파일 없음"}
        </span>
      </div>

      {imageUrl && (
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="업로드한 이미지 미리보기"
            className="max-h-80 w-full rounded-lg border-2 border-[#f3e8c8] object-contain"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 cursor-pointer rounded-md bg-black/60 px-2 py-1 font-display text-xs text-white hover:bg-black/80"
          >
            삭제
          </button>
        </div>
      )}

      <input type="hidden" name="image" value={imageUrl} />
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import Image from "next/image";

type Category = "kitchen" | "bedroom" | "decor";

const categories: { value: Category; label: string }[] = [
  { value: "kitchen", label: "مطبخ" },
  { value: "bedroom", label: "غرفة نوم" },
  { value: "decor", label: "ديكور" },
];

type Props = {
  onSuccess: () => void;
};

export default function PortfolioUploader({ onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("kitchen");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setError("الرجاء اختيار صورة صالحة");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) {
      setError("الرجاء تعبئة جميع الحقول واختيار صورة");
      return;
    }
    setUploading(true);
    setError("");

    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(fileName, file, { upsert: false });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("portfolio")
        .getPublicUrl(fileName);

      // Insert project record
      const { error: insertError } = await supabase.from("projects").insert({
        title: title.trim(),
        category,
        image_url: urlData.publicUrl,
      });

      if (insertError) throw insertError;

      // Reset form
      setTitle("");
      setCategory("kitchen");
      setFile(null);
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
      onSuccess();
    } catch (err: unknown) {
      console.error(err);
      setError("فشل رفع الصورة. الرجاء المحاولة مرة أخرى.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Image Upload Zone */}
      <div>
        <label className="block text-sm font-bold text-brand-black mb-2">
          صورة المشروع *
        </label>
        <div
          onClick={() => fileRef.current?.click()}
          className="relative border-2 border-dashed border-gray-200 hover:border-gold transition-colors duration-300 cursor-pointer h-48 flex flex-col items-center justify-center gap-3"
        >
          {preview ? (
            <>
              <Image
                src={preview}
                alt="preview"
                fill
                className="object-cover opacity-80"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  setPreview(null);
                  if (fileRef.current) fileRef.current.value = "";
                }}
                className="absolute top-2 left-2 p-1 bg-red-500 text-white z-10"
              >
                <X size={14} />
              </button>
            </>
          ) : (
            <>
              <ImageIcon size={36} className="text-gray-300" />
              <p className="text-gray-400 text-sm font-light">
                اضغط لاختيار صورة
              </p>
              <p className="text-gray-300 text-xs">PNG, JPG, WEBP</p>
            </>
          )}
        </div>
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-bold text-brand-black mb-2">
          عنوان المشروع *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="مثال: مطبخ فاخر أبيض"
          className="w-full border border-gray-200 px-4 py-3 focus:outline-none focus:border-gold transition-colors duration-300 font-light"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-bold text-brand-black mb-2">
          الفئة *
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="w-full border border-gray-200 px-4 py-3 focus:outline-none focus:border-gold transition-colors duration-300 bg-white font-light"
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={uploading}
        className="w-full flex items-center justify-center gap-3 bg-gold text-brand-black font-black py-3.5 hover:bg-gold-light disabled:opacity-70 transition-all duration-300"
      >
        {uploading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            جاري الرفع...
          </>
        ) : (
          <>
            <Upload size={18} />
            رفع المشروع
          </>
        )}
      </button>
    </form>
  );
}

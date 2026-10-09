"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import Image from "next/image";

type Category = "kitchen" | "bedroom" | "decor";

const categories: { value: Category; label: string }[] = [
  { value: "kitchen", label: "Kitchen" },
  { value: "bedroom", label: "Bedroom" },
  { value: "decor", label: "Decor" },
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
      setError("Please select a valid image");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) {
      setError("Please fill all fields and select an image");
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
      setError("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Image Upload Zone */}
      <div>
        <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
          Project Image *
        </label>
        <div
          onClick={() => fileRef.current?.click()}
          className="relative border-2 border-dashed border-cream-mid hover:border-gold transition-colors duration-300 cursor-pointer h-48 flex flex-col items-center justify-center gap-3 bg-cream-dark/30 rounded-lg"
        >
          {preview ? (
            <>
              <Image
                src={preview}
                alt="preview"
                fill
                className="object-cover opacity-90 rounded-lg"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  setPreview(null);
                  if (fileRef.current) fileRef.current.value = "";
                }}
                className="absolute top-2 left-2 p-1.5 bg-red-500 text-white z-10 rounded-full hover:bg-red-600 transition-colors shadow-lg"
              >
                <X size={14} />
              </button>
            </>
          ) : (
            <>
              <ImageIcon size={32} className="text-charcoal-light opacity-50" />
              <p className="text-charcoal-light text-sm font-medium">
                Click to browse images
              </p>
              <p className="text-charcoal-light/60 text-[10px] uppercase font-bold tracking-widest">PNG, JPG, WEBP</p>
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
        <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
          Project Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="e.g. Modern White Kitchen"
          className="w-full border border-cream-mid px-4 py-3 text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:border-gold transition-colors duration-300 rounded-lg text-sm font-bold bg-white"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
          Category *
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="w-full border border-cream-mid px-4 py-3 text-charcoal focus:outline-none focus:border-gold transition-colors duration-300 bg-white rounded-lg text-sm font-bold appearance-none"
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

      <button
        type="submit"
        disabled={uploading}
        className="w-full flex items-center justify-center gap-3 bg-gold text-charcoal font-black py-3.5 rounded-lg hover:bg-gold-light disabled:opacity-70 transition-all duration-300 text-sm uppercase tracking-wider mt-2"
      >
        {uploading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload size={18} />
            Publish Project
          </>
        )}
      </button>
    </form>
  );
}

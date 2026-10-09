"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import PortfolioUploader from "@/components/admin/PortfolioUploader";
import Image from "next/image";
import { Trash2, Plus, X, RefreshCw } from "lucide-react";

type Project = {
  id: string;
  title: string;
  image_url: string;
  category: string;
  created_at: string;
};

const categoryLabels: Record<string, string> = {
  kitchen: "مطبخ",
  bedroom: "غرفة نوم",
  decor: "ديكور",
};

export default function PortfolioAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploader, setShowUploader] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    setProjects(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDelete = async (project: Project) => {
    if (!confirm(`هل أنت متأكد من حذف "${project.title}"؟`)) return;
    setDeletingId(project.id);
    try {
      const supabase = createClient();
      // Extract file name from URL
      const urlParts = project.image_url.split("/");
      const fileName = urlParts[urlParts.length - 1];

      await supabase.storage.from("portfolio").remove([fileName]);
      await supabase.from("projects").delete().eq("id", project.id);
      setProjects((prev) => prev.filter((p) => p.id !== project.id));
    } catch (err) {
      console.error(err);
      alert("فشل الحذف. الرجاء المحاولة مرة أخرى.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-black text-brand-black">إدارة الأعمال</h1>
          <p className="text-brand-mid-grey font-light mt-2">
            {projects.length} مشروع مضاف
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchProjects}
            className="p-2.5 border border-gray-200 text-gray-500 hover:border-gold hover:text-gold transition-all duration-300"
          >
            <RefreshCw size={18} />
          </button>
          <button
            onClick={() => setShowUploader(!showUploader)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gold text-brand-black font-black hover:bg-gold-light transition-all duration-300 text-sm"
          >
            {showUploader ? <X size={16} /> : <Plus size={16} />}
            {showUploader ? "إغلاق" : "إضافة مشروع"}
          </button>
        </div>
      </div>

      {/* Uploader Panel */}
      {showUploader && (
        <div className="mb-10 bg-white border border-gray-100 p-8 shadow-sm">
          <h2 className="font-black text-lg text-brand-black mb-6">
            إضافة مشروع جديد
          </h2>
          <PortfolioUploader
            onSuccess={() => {
              setShowUploader(false);
              fetchProjects();
            }}
          />
        </div>
      )}

      {/* Projects Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-52 bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 bg-white border border-gray-100">
          <div className="text-gray-300 mb-4">
            <Plus size={48} className="mx-auto" />
          </div>
          <p className="text-brand-mid-grey font-light">
            لا توجد مشاريع بعد. أضف أول مشروع!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden bg-white border border-gray-100 shadow-sm"
            >
              <div className="relative h-52">
                <Image
                  src={project.image_url}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Delete overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(project)}
                    disabled={deletingId === project.id}
                    className="opacity-0 group-hover:opacity-100 p-2.5 bg-red-500 text-white hover:bg-red-600 transition-all duration-300 disabled:opacity-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="font-bold text-sm text-brand-black truncate">
                  {project.title}
                </p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-gold/10 text-gold text-xs font-bold">
                  {categoryLabels[project.category] ?? project.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

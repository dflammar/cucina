"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import PortfolioUploader from "@/components/admin/PortfolioUploader";
import Image from "next/image";
import { Trash2, Plus, X, RefreshCw, CheckSquare, Edit2, Save } from "lucide-react";

type Project = {
  id: string;
  title: string;
  image_url: string;
  category: string;
  created_at: string;
};

const categoryLabels: Record<string, string> = {
  kitchen: "Kitchen",
  bedroom: "Bedroom",
  decor: "Decor",
};

export default function PortfolioAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploader, setShowUploader] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  // Phase A features
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    setProjects(data ?? []);
    setLoading(false);
    setSelectedIds(new Set());
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setDeletingId(id);
    try {
      const supabase = createClient();
      const urlParts = imageUrl.split("/");
      const fileName = urlParts[urlParts.length - 1];

      await supabase.storage.from("portfolio").remove([fileName]);
      await supabase.from("projects").delete().eq("id", id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      
      const newSelected = new Set(selectedIds);
      newSelected.delete(id);
      setSelectedIds(newSelected);
    } catch (err) {
      console.error(err);
      alert("Failed to delete. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedIds.size} selected projects?`)) return;
    
    setLoading(true);
    try {
      const supabase = createClient();
      const toDelete = projects.filter(p => selectedIds.has(p.id));
      
      // Delete from storage
      const fileNames = toDelete.map(p => {
        const parts = p.image_url.split("/");
        return parts[parts.length - 1];
      });
      await supabase.storage.from("portfolio").remove(fileNames);
      
      // Delete from DB
      await supabase.from("projects").delete().in("id", Array.from(selectedIds));
      
      setProjects(prev => prev.filter(p => !selectedIds.has(p.id)));
      setSelectedIds(new Set());
    } catch (err) {
      console.error(err);
      alert("Failed to bulk delete. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === projects.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(projects.map(p => p.id)));
  };

  const startEdit = (project: Project) => {
    setEditingProject(project);
    setEditTitle(project.title);
    setEditCategory(project.category);
  };

  const saveEdit = async () => {
    if (!editingProject) return;
    
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("projects")
        .update({ title: editTitle, category: editCategory })
        .eq("id", editingProject.id);
        
      if (error) throw error;
      
      setProjects(prev => prev.map(p => 
        p.id === editingProject.id 
          ? { ...p, title: editTitle, category: editCategory }
          : p
      ));
      setEditingProject(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update project.");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-charcoal">Portfolio Management</h1>
          <p className="text-charcoal-light font-light mt-2">
            {projects.length} projects total
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {selectedIds.size > 0 && (
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 font-semibold border border-red-200 hover:bg-red-100 transition-all duration-300 text-sm rounded"
            >
              <Trash2 size={16} />
              Delete Selected ({selectedIds.size})
            </button>
          )}
          <button
            onClick={fetchProjects}
            className="p-2.5 border border-cream-mid text-charcoal hover:border-gold hover:text-gold transition-all duration-300 bg-white rounded"
          >
            <RefreshCw size={18} />
          </button>
          <button
            onClick={() => setShowUploader(!showUploader)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gold text-white font-black hover:bg-gold-dark transition-all duration-300 text-sm rounded"
          >
            {showUploader ? <X size={16} /> : <Plus size={16} />}
            {showUploader ? "Close" : "Add Project"}
          </button>
        </div>
      </div>

      {/* Uploader Panel */}
      {showUploader && (
        <div className="mb-10 bg-white border border-cream-mid p-8 shadow-sm rounded-lg">
          <h2 className="font-black text-lg text-charcoal mb-6">
            Upload New Project
          </h2>
          <PortfolioUploader
            onSuccess={() => {
              setShowUploader(false);
              fetchProjects();
            }}
          />
        </div>
      )}

      {/* Select All Bar */}
      {!loading && projects.length > 0 && (
        <div className="mb-4 flex items-center justify-between bg-white border border-cream-mid p-3 rounded-md">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={selectedIds.size === projects.length && projects.length > 0}
              onChange={toggleSelectAll}
              className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold accent-gold"
            />
            <span className="text-sm font-bold text-charcoal">Select All</span>
          </label>
        </div>
      )}

      {/* Projects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-60 bg-cream-mid animate-pulse rounded-md" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 bg-white border border-cream-mid rounded-md">
          <div className="text-cream-mid mb-4">
            <Plus size={48} className="mx-auto text-charcoal/20" />
          </div>
          <p className="text-charcoal-light font-light">
            No projects found. Add your first project!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {projects.map((project) => {
            const isEditing = editingProject?.id === project.id;
            const isSelected = selectedIds.has(project.id);
            
            return (
              <div
                key={project.id}
                className={`group relative overflow-hidden bg-white border rounded-md shadow-sm transition-all duration-200 ${
                  isSelected ? 'border-gold ring-1 ring-gold' : 'border-cream-mid'
                }`}
              >
                {/* Select Checkbox Top Left */}
                <div className="absolute top-3 left-3 z-20">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelect(project.id)}
                    className="w-5 h-5 text-gold border-gray-300 rounded focus:ring-gold accent-gold cursor-pointer drop-shadow-md"
                  />
                </div>
                
                <div className="relative h-48 bg-cream">
                  <Image
                    src={project.image_url}
                    alt={project.title}
                    fill
                    className={`object-cover transition-opacity duration-300 ${isSelected ? 'opacity-90' : ''}`}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  {/* Delete overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-charcoal/40 transition-all duration-300 flex items-center justify-center gap-3">
                    {!isEditing && (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); startEdit(project); }}
                          className="opacity-0 group-hover:opacity-100 p-2.5 bg-white text-charcoal hover:bg-gold hover:text-white transition-all duration-300 rounded-full"
                          title="Edit Project"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDelete(project.id, project.image_url); }}
                          disabled={deletingId === project.id}
                          className="opacity-0 group-hover:opacity-100 p-2.5 bg-red-500 text-white hover:bg-red-600 transition-all duration-300 disabled:opacity-50 rounded-full"
                          title="Delete Project"
                        >
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="p-4">
                  {isEditing ? (
                    <div className="space-y-3">
                      <input 
                        type="text" 
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full text-sm font-bold text-charcoal border border-cream-mid px-2 py-1.5 rounded focus:outline-none focus:border-gold"
                        placeholder="Project Title"
                      />
                      <select 
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        className="w-full text-xs font-bold text-charcoal-light border border-cream-mid px-2 py-1.5 rounded focus:outline-none focus:border-gold"
                      >
                        <option value="kitchen">Kitchen</option>
                        <option value="bedroom">Bedroom</option>
                        <option value="decor">Decor</option>
                      </select>
                      <div className="flex gap-2 pt-2">
                        <button 
                          onClick={saveEdit}
                          className="flex-1 flex items-center justify-center gap-1 bg-gold text-white text-xs font-bold py-2 rounded hover:bg-gold-dark"
                        >
                          <Save size={14} /> Save
                        </button>
                        <button 
                          onClick={() => setEditingProject(null)}
                          className="flex-1 text-charcoal-light text-xs font-bold border border-cream-mid py-2 rounded hover:bg-cream"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="font-bold text-sm text-charcoal truncate" title={project.title}>
                        {project.title}
                      </p>
                      <span className="inline-block mt-2 px-2.5 py-1 bg-charcoal/5 text-charcoal-light text-[10px] font-black uppercase tracking-widest rounded-sm">
                        {categoryLabels[project.category] ?? project.category}
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

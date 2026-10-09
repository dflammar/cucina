"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("حدث خطأ. الرجاء المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gold mb-2">كوجينا بلس</h1>
          <p className="text-gray-400 font-light text-sm tracking-widest uppercase">
            لوحة تحكم المدير
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/5 border border-white/10 p-10">
          <h2 className="text-white font-bold text-xl mb-8 text-center">
            تسجيل الدخول
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                dir="ltr"
                placeholder="admin@cucinaplus.com"
                className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-gold transition-colors duration-300 text-left"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  dir="ltr"
                  className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-gold transition-colors duration-300 text-left pe-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gold transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-gold text-brand-black font-black py-4 hover:bg-gold-light disabled:opacity-70 transition-all duration-300"
            >
              <LogIn size={20} />
              {loading ? "جاري الدخول..." : "دخول"}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          للحصول على صلاحيات الوصول، تواصل مع المطور.
        </p>
      </div>
    </div>
  );
}

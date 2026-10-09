import { createClient } from "@/lib/supabase/server";
import { Images, MessageSquare, Star, Clock } from "lucide-react";

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  const [projectsResult, messagesResult, newMessagesResult] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("messages").select("id", { count: "exact", head: true }),
    supabase
      .from("messages")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
  ]);

  const stats = [
    {
      label: "إجمالي المشاريع",
      value: projectsResult.count ?? 0,
      icon: Images,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "رسائل العملاء",
      value: messagesResult.count ?? 0,
      icon: MessageSquare,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      label: "رسائل جديدة",
      value: newMessagesResult.count ?? 0,
      icon: Star,
      color: "text-gold",
      bg: "bg-gold/10",
    },
  ];

  // Fetch recent 5 messages
  const { data: recentMessages } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div>
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-brand-black">نظرة عامة</h1>
        <p className="text-brand-mid-grey font-light mt-2">
          مرحباً بك في لوحة تحكم كوجينا بلس
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white border border-gray-100 p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-brand-mid-grey font-light text-sm">
                  {stat.label}
                </p>
                <div className={`p-2.5 rounded-full ${stat.bg}`}>
                  <Icon size={20} className={stat.color} />
                </div>
              </div>
              <p className="text-4xl font-black text-brand-black">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Messages */}
      <div className="bg-white border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-black text-lg text-brand-black">
            آخر الرسائل
          </h2>
          <a
            href="/admin/messages"
            className="text-sm text-gold hover:underline font-medium"
          >
            عرض الكل
          </a>
        </div>
        <div className="divide-y divide-gray-50">
          {!recentMessages || recentMessages.length === 0 ? (
            <div className="p-8 text-center text-brand-mid-grey font-light">
              لا توجد رسائل بعد
            </div>
          ) : (
            recentMessages.map((msg) => (
              <div key={msg.id} className="p-5 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-bold text-brand-black text-sm">{msg.name}</p>
                    {msg.status === "new" && (
                      <span className="px-2 py-0.5 bg-gold/10 text-gold text-xs font-bold rounded-full">
                        جديد
                      </span>
                    )}
                  </div>
                  <p className="text-brand-mid-grey text-xs font-light truncate max-w-md">
                    {msg.message}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400 flex-shrink-0">
                  <Clock size={12} />
                  <span className="text-xs">
                    {new Date(msg.created_at).toLocaleDateString("ar-IQ")}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

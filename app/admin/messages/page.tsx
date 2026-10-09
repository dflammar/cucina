"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { RefreshCw, CheckCheck, Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";

type Message = {
  id: string;
  name: string;
  phone: string;
  service: string | null;
  message: string;
  status: "new" | "read" | "replied";
  created_at: string;
};

const statusConfig = {
  new: { label: "جديد", bg: "bg-gold/10 text-gold" },
  read: { label: "مقروء", bg: "bg-blue-50 text-blue-600" },
  replied: { label: "تمت الإجابة", bg: "bg-green-50 text-green-600" },
};

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMessage, setActiveMessage] = useState<Message | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    setMessages((data as Message[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const updateStatus = async (id: string, status: Message["status"]) => {
    const supabase = createClient();
    await supabase.from("messages").update({ status }).eq("id", id);
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
    if (activeMessage?.id === id) {
      setActiveMessage((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const filtered =
    filterStatus === "all"
      ? messages
      : messages.filter((m) => m.status === filterStatus);

  const newCount = messages.filter((m) => m.status === "new").length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-black text-brand-black">رسائل العملاء</h1>
          <p className="text-brand-mid-grey font-light mt-2">
            {messages.length} رسالة إجمالاً
            {newCount > 0 && (
              <span className="mr-2 px-2 py-0.5 bg-gold/10 text-gold text-xs font-bold rounded-full">
                {newCount} جديدة
              </span>
            )}
          </p>
        </div>
        <button
          onClick={fetchMessages}
          className="p-2.5 border border-gray-200 text-gray-500 hover:border-gold hover:text-gold transition-all duration-300"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      {/* Status Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { value: "all", label: "الكل" },
          { value: "new", label: "جديد" },
          { value: "read", label: "مقروء" },
          { value: "replied", label: "تمت الإجابة" },
        ].map((f) => (
          <button
            key={f.value}
            onClick={() => setFilterStatus(f.value)}
            className={`px-4 py-2 text-xs font-bold border transition-all duration-200 ${
              filterStatus === f.value
                ? "bg-brand-black text-gold border-brand-black"
                : "border-gray-200 text-gray-500 hover:border-brand-black hover:text-brand-black"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-2">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-gray-100 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 bg-white border border-gray-100">
              <p className="text-brand-mid-grey font-light text-sm">
                لا توجد رسائل
              </p>
            </div>
          ) : (
            filtered.map((msg) => (
              <div
                key={msg.id}
                onClick={() => {
                  setActiveMessage(msg);
                  if (msg.status === "new") updateStatus(msg.id, "read");
                }}
                className={`p-4 bg-white border cursor-pointer transition-all duration-200 hover:border-gold ${
                  activeMessage?.id === msg.id
                    ? "border-gold shadow-sm"
                    : "border-gray-100"
                } ${msg.status === "new" ? "border-r-4 border-r-gold" : ""}`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="font-bold text-brand-black text-sm">{msg.name}</p>
                  <span
                    className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                      statusConfig[msg.status].bg
                    }`}
                  >
                    {statusConfig[msg.status].label}
                  </span>
                </div>
                <p className="text-brand-mid-grey text-xs font-light truncate">
                  {msg.message}
                </p>
                <p className="text-gray-300 text-xs mt-1.5">
                  {formatDate(msg.created_at)}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {activeMessage ? (
            <div className="bg-white border border-gray-100 p-8 h-full">
              <div className="flex items-start justify-between gap-4 mb-8">
                <div>
                  <h2 className="font-black text-xl text-brand-black mb-1">
                    {activeMessage.name}
                  </h2>
                  <a
                    href={`tel:${activeMessage.phone}`}
                    dir="ltr"
                    className="text-gold font-bold text-sm hover:underline"
                  >
                    {activeMessage.phone}
                  </a>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-bold rounded-full ${
                    statusConfig[activeMessage.status].bg
                  }`}
                >
                  {statusConfig[activeMessage.status].label}
                </span>
              </div>

              {activeMessage.service && (
                <div className="mb-5 p-4 bg-brand-light-grey">
                  <p className="text-xs font-bold text-brand-mid-grey mb-1">
                    الخدمة المطلوبة
                  </p>
                  <p className="font-bold text-brand-black">
                    {activeMessage.service}
                  </p>
                </div>
              )}

              <div className="mb-8">
                <p className="text-xs font-bold text-brand-mid-grey mb-3">
                  الرسالة
                </p>
                <p className="text-brand-black font-light leading-[2] whitespace-pre-wrap">
                  {activeMessage.message}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <p className="text-gray-400 text-xs">
                  {formatDate(activeMessage.created_at)}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(activeMessage.id, "read")}
                    disabled={activeMessage.status === "read"}
                    className="flex items-center gap-2 px-4 py-2 border border-blue-200 text-blue-600 text-xs font-bold hover:bg-blue-50 disabled:opacity-40 transition-all duration-200"
                  >
                    <Eye size={14} />
                    مقروء
                  </button>
                  <button
                    onClick={() => updateStatus(activeMessage.id, "replied")}
                    disabled={activeMessage.status === "replied"}
                    className="flex items-center gap-2 px-4 py-2 bg-gold text-brand-black text-xs font-bold hover:bg-gold-light disabled:opacity-40 transition-all duration-200"
                  >
                    <CheckCheck size={14} />
                    تمت الإجابة
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-100 h-full min-h-[300px] flex items-center justify-center">
              <p className="text-brand-mid-grey font-light text-sm">
                اختر رسالة لعرض تفاصيلها
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

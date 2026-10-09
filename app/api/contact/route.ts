import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, service, message } = body;

    // Validate required fields
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "الاسم ورقم الهاتف والرسالة مطلوبة" },
        { status: 400 }
      );
    }

    // Use service role for writes (bypasses RLS if needed)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase.from("messages").insert({
      name: name.trim(),
      phone: phone.trim(),
      service: service?.trim() || null,
      message: message.trim(),
      status: "new",
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "فشل حفظ الرسالة" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "حدث خطأ في الخادم" },
      { status: 500 }
    );
  }
}

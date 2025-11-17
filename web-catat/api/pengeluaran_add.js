import { createClient } from "@supabase/supabase-js";
import { verifyToken } from "./_auth";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const user_id = verifyToken(req);
  if (!user_id) return res.status(401).json({ error: "Unauthorized" });

  const { jumlah, keterangan } = req.body;

  const { error } = await supabase.from("pengeluaran").insert({
    user_id,
    tanggal: new Date().toISOString().slice(0, 10),
    jumlah,
    keterangan
  });

  if (error) return res.status(400).json({ error: error.message });

  res.json({ success: true });
}

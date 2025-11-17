import { createClient } from "@supabase/supabase-js";
import { verifyToken } from "./_auth";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

export default async function handler(req, res) {
  const user_id = verifyToken(req);
  if (!user_id) return res.status(401).json({ error: "Unauthorized" });

  const { data: penjualan } = await supabase
    .from("penjualan")
    .select("*")
    .eq("user_id", user_id)
    .order("tanggal", { ascending: false });

  const { data: pengeluaran } = await supabase
    .from("pengeluaran")
    .select("*")
    .eq("user_id", user_id)
    .order("tanggal", { ascending: false });

  return res.json({ penjualan, pengeluaran });
}

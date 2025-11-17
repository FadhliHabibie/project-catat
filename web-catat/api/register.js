import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  // insert user
  const { data, error } = await supabase
    .from("users")
    .insert([{ email, password_hash: hash }])
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });

  const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET);

  return res.status(200).json({ token });
}

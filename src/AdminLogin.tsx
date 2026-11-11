
import { useState } from "react";
import { ShieldCheck, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { supabase } from "./supabase";

type AdminRole = "super_admin" | "admin";

type AdminLoginProps = {
  onLogin: (role: AdminRole, email: string) => void;
};

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: authError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (authError || !data.user) {
        throw new Error("E-mail ou palavra-passe incorretos.");
      }

      const { data: admin, error: adminError } = await supabase
        .from("admin_users")
        .select("role, is_active")
        .eq("user_id", data.user.id)
        .maybeSingle();

      if (adminError || !admin || !admin.is_active) {
        await supabase.auth.signOut();
        throw new Error("Esta conta não tem autorização para aceder ao painel.");
      }

      if (admin.role !== "super_admin" && admin.role !== "admin") {
        await supabase.auth.signOut();
        throw new Error("Cargo administrativo inválido.");
      }

      onLogin(admin.role as AdminRole, data.user.email ?? email);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível iniciar sessão."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-screen">
      <form className="login-card" onSubmit={handleLogin}>
        <div className="login-brand-icon">
          <ShieldCheck size={30} />
        </div>

        <span className="login-eyebrow">PSP ENTERTAINMENT</span>
        <h1>PASSALI <span>ADMIN</span></h1>
        <p className="login-description">
          Acede ao centro de gestão da plataforma.
        </p>

        <label htmlFor="admin-email">E-mail administrativo</label>
        <div className="login-input-wrap">
          <Mail size={18} />
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="nome@empresa.com"
            autoComplete="username"
            required
          />
        </div>

        <label htmlFor="admin-password">Palavra-passe</label>
        <div className="login-input-wrap">
          <Lock size={18} />
          <input
            id="admin-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Introduz a tua palavra-passe"
            autoComplete="current-password"
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Mostrar ou ocultar palavra-passe"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && <div className="login-error">{error}</div>}

        <button className="login-submit" type="submit" disabled={loading}>
          {loading ? "A verificar acesso..." : "Entrar no painel"}
        </button>

        <div className="login-security">
          <ShieldCheck size={16} />
          <span>Acesso reservado a pessoal autorizado</span>
        </div>
      </form>

      <footer className="login-footer">
        PASSALI MANAGEMENT © 2026 · POWERED BY PSP ENTERTAINMENT
      </footer>
    </div>
  );
}

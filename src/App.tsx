import { useState } from "react";
import AdminLogin from "./AdminLogin";
import {
  LayoutDashboard,
  Wallet,
  Users,
  Building2,
  CalendarDays,
  Ticket,
  ShieldCheck,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  Activity,
  LogOut,
  CircleDollarSign,
} from "lucide-react";

const navigation = [
  { label: "Visão geral", icon: LayoutDashboard },
  { label: "Financeiro", icon: Wallet },
  { label: "Clientes", icon: Users },
  { label: "Organizadores", icon: Building2 },
  { label: "Eventos", icon: CalendarDays },
  { label: "Bilhetes e vendas", icon: Ticket },
  { label: "Administradores", icon: ShieldCheck },
  { label: "Definições", icon: Settings },
];

type AdminRole = "super_admin" | "admin";

function App() {
  const [adminRole, setAdminRole] = useState<AdminRole | null>(null);
  const [adminEmail, setAdminEmail] = useState("");

  const [activePage, setActivePage] = useState("Visão geral");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!adminRole) {
    return (
      <AdminLogin
        onLogin={(role, email) => {
          setAdminRole(role);
          setAdminEmail(email);
        }}
      />
    );
  }

  return (
    <div className="admin-shell">
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">P</div>
          <div>
            <strong>PASSALI</strong>
            <span>MANAGEMENT</span>
          </div>
          <button
            className="mobile-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="workspace-label">WORKSPACE</div>

        <div className="workspace">
          <div className="workspace-avatar">PSP</div>
          <div>
            <strong>PSP Entertainment</strong>
            <span>Principal workspace</span>
          </div>
          <ChevronDown size={16} />
        </div>

        <div className="nav-label">MENU PRINCIPAL</div>

        <nav className="navigation">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={
                  activePage === item.label
                    ? "nav-item active"
                    : "nav-item"
                }
                onClick={() => {
                  setActivePage(item.label);
                  setSidebarOpen(false);
                }}
              >
                <Icon size={19} />
                <span>{item.label}</span>
                {item.label === "Eventos" && (
                  <span className="nav-indicator" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="security-status">
            <ShieldCheck size={19} />
            <div>
              <strong>Ambiente protegido</strong>
              <span>PASSALI ADMIN</span>
            </div>
          </div>
          <div className="sidebar-footer">
            <span>POWERED BY</span>
            <strong>PSP ENTERTAINMENT</strong>
            <small>Version 1.0.0</small>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="main-area">
        <header className="topbar">
          <button
            className="mobile-menu"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>

          <div className="breadcrumb">
            <span>Passali Management</span>
            <span>/</span>
            <strong>{activePage}</strong>
          </div>

          <div className="topbar-actions">
            <button className="icon-button" aria-label="Pesquisar">
              <Search size={19} />
            </button>
            <button className="icon-button" aria-label="Notificações">
              <Bell size={19} />
            </button>
         <div className="admin-profile">
  <div className="profile-avatar">
    {adminEmail.slice(0, 2).toUpperCase()}
  </div>
  <div>
    <strong>{adminEmail}</strong>
    <span>
      {adminRole === "super_admin" ? "Super Admin" : "Admin"}
    </span>
  </div>
  <ChevronDown size={16} />
</div>
          </div>
        </header>

        <div className="page-content">
          <div className="page-heading">
            <div>
              <span className="eyebrow">
                PSP ENTERTAINMENT / MANAGEMENT
              </span>
              <h1>{activePage}</h1>
              <p>
                Centro de controlo e gestão do Passali Tickets.
              </p>
            </div>
            <div className="heading-date">
              <Activity size={17} />
              <span>Plataforma administrativa</span>
            </div>
          </div>

          <div className="welcome-banner">
            <div>
              <span>PASSALI MANAGEMENT SYSTEM</span>
              <h2>Bem-vindo ao centro de gestão.</h2>
              <p>
                Toda a operação do Passali Tickets,
                num único espaço.
              </p>
            </div>
            <div className="banner-symbol">
              <CircleDollarSign size={75} strokeWidth={1} />
            </div>
          </div>

          <div className="section-heading">
            <div>
              <h2>Visão geral da plataforma</h2>
              <p>Indicadores gerais da operação.</p>
            </div>
            <span className="period-label">DADOS EM INTEGRAÇÃO</span>
          </div>

          <div className="stats-grid">
            {[
              {
                title: "Receita total",
                value: "—",
                icon: Wallet,
                note: "Aguardando integração financeira",
              },
              {
                title: "Clientes",
                value: "—",
                icon: Users,
                note: "Aguardando ligação ao Supabase",
              },
              {
                title: "Organizadores",
                value: "—",
                icon: Building2,
                note: "Aguardando ligação ao Supabase",
              },
              {
                title: "Eventos publicados",
                value: "—",
                icon: CalendarDays,
                note: "Aguardando ligação ao Supabase",
              },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div className="stat-card" key={stat.title}>
                  <div className="stat-top">
                    <span>{stat.title}</span>
                    <div className="stat-icon">
                      <Icon size={20} />
                    </div>
                  </div>
                  <strong className="stat-value">{stat.value}</strong>
                  <span className="stat-note">{stat.note}</span>
                </div>
              );
            })}
          </div>

          <div className="dashboard-grid">
            <section className="panel">
              <div className="panel-heading">
                <div>
                  <h3>Atividade da plataforma</h3>
                  <p>Resumo das operações recentes.</p>
                </div>
                <Activity size={19} />
              </div>
              <div className="empty-panel">
                <div className="empty-icon">
                  <Activity size={26} />
                </div>
                <strong>Dados ainda não disponíveis</strong>
                <p>
                  O histórico de atividades será apresentado
                  após a integração com o Supabase.
                </p>
              </div>
            </section>

            <section className="panel">
              <div className="panel-heading">
                <div>
                  <h3>Acesso administrativo</h3>
                  <p>Estrutura de gestão PSP.</p>
                </div>
                <ShieldCheck size={19} />
              </div>

              <div className="role-card">
                <div className="role-icon super">
                  <ShieldCheck size={21} />
                </div>
                <div>
                  <strong>Super Admin</strong>
                  <span>Controlo geral e financeiro</span>
                </div>
                <ArrowUpRight size={18} />
              </div>

              <div className="role-card">
                <div className="role-icon admin">
                  <Users size={21} />
                </div>
                <div>
                  <strong>Admin</strong>
                  <span>Publicação e operações</span>
                </div>
                <ArrowUpRight size={18} />
              </div>

              <div className="integration-notice">
                <ShieldCheck size={17} />
                <span>
                  Os acessos serão ativados após a configuração
                  da autenticação e das permissões.
                </span>
              </div>
            </section>
          </div>

          <footer className="page-footer">
            <span>PASSALI MANAGEMENT © 2026</span>
            <span>POWERED BY PSP ENTERTAINMENT</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;

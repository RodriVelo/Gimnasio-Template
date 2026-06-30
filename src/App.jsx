import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  LayoutDashboard, Users, CalendarCheck, CreditCard, Wallet, BarChart3,
  Settings, Search, Bell, ChevronDown, Plus, Eye, Pencil, DollarSign, X,
  Filter, ChevronLeft, ChevronRight, TrendingUp, TrendingDown, Dumbbell,
  Clock, CheckCircle2, AlertCircle, ArrowUpRight, Phone, Mail, Calendar,
  FileText, UserPlus, LogOut, Building2, Banknote, Smartphone, Menu, Check,
  ArrowLeft, MapPin, Sparkles
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip
} from "recharts";

/* ============================================================================
   data/ — mock data generation (seeded, deterministic, "real" looking)
   ========================================================================= */

function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(1337);
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const randInt = (min, max) => Math.floor(rand() * (max - min + 1)) + min;

const TODAY = new Date(2026, 5, 30);
const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };
const fmtDate = (d) => d.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" });
const fmtShortDate = (d) => d.toLocaleDateString("es-AR", { day: "2-digit", month: "short" });
const fmtCurrency = (n) => "$" + n.toLocaleString("es-AR");
const cn = (...c) => c.filter(Boolean).join(" ");

const NOMBRES = ["Martina","Sofía","Lucas","Mateo","Valentina","Joaquín","Camila","Benjamín","Isabella","Thiago","Emma","Santiago","Mía","Bautista","Renata","Tomás","Catalina","Agustín","Julieta","Felipe","Delfina","Nicolás","Antonella","Lautaro","Pilar","Franco","Victoria","Ignacio","Abril","Gael","Florencia","Bruno","Milagros","Ramiro","Olivia","Dante","Zoe","Ciro","Guadalupe","Maximiliano"];
const APELLIDOS = ["González","Rodríguez","Fernández","López","Martínez","Díaz","Pérez","Sánchez","Romero","Álvarez","Torres","Ruiz","Flores","Acosta","Benítez","Medina","Herrera","Aguirre","Vega","Molina"];
const PLANES = [
  { nombre: "Mensual", precio: 16000, dias: 30 },
  { nombre: "Trimestral", precio: 42000, dias: 90 },
  { nombre: "Semestral", precio: 78000, dias: 180 },
  { nombre: "Anual", precio: 145000, dias: 365 },
];
const METODOS = ["Efectivo", "Transferencia", "Tarjeta"];
const AVATAR_COLORS = ["bg-emerald-100 text-emerald-700","bg-indigo-100 text-indigo-700","bg-amber-100 text-amber-700","bg-rose-100 text-rose-700","bg-sky-100 text-sky-700","bg-violet-100 text-violet-700"];
const avatarColor = (seed) => AVATAR_COLORS[seed % AVATAR_COLORS.length];
const initials = (n, a) => (n[0] + a[0]).toUpperCase();

function estadoAlumno(vencimiento) {
  const dias = Math.round((vencimiento - TODAY) / 86400000);
  if (dias < 0) return "Vencido";
  if (dias <= 7) return "Pendiente";
  return "Activo";
}

const ALUMNOS = Array.from({ length: 40 }).map((_, i) => {
  const nombre = pick(NOMBRES);
  const apellido = pick(APELLIDOS);
  const plan = pick(PLANES);
  const inicio = addDays(TODAY, -randInt(5, plan.dias + 60));
  const vencimiento = addDays(inicio, plan.dias);
  const estado = estadoAlumno(vencimiento);
  const ultimaAsistenciaDias = randInt(0, 12);
  return {
    id: i + 1,
    nombre, apellido,
    nombreCompleto: `${nombre} ${apellido}`,
    dni: `${randInt(20, 45)}.${randInt(100, 999)}.${randInt(100, 999)}`,
    telefono: `+54 9 299 ${randInt(400, 699)}-${randInt(1000, 9999)}`,
    email: `${nombre.toLowerCase()}.${apellido.toLowerCase()}@mail.com`.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
    plan: plan.nombre,
    precioPlan: plan.precio,
    diasPlan: plan.dias,
    fechaInicio: inicio,
    fechaVencimiento: vencimiento,
    estado,
    ultimaAsistencia: estado === "Vencido" && rand() > 0.5 ? null : addDays(TODAY, -ultimaAsistenciaDias),
    direccion: `Calle ${randInt(10, 90)} N° ${randInt(100, 2500)}, Neuquén`,
    fechaNacimiento: addDays(TODAY, -randInt(18 * 365, 55 * 365)),
    observaciones: pick([
      "Sin lesiones reportadas. Prefiere entrenar a la mañana.",
      "Indicó molestia leve en rodilla derecha — evitar sentadilla profunda.",
      "Objetivo: hipertrofia. Entrena con rutina personalizada.",
      "Cliente desde hace tiempo, muy puntual con los pagos.",
      "Solicitó cambio de horario a turno tarde.",
      "",
    ]),
    avatar: avatarColor(i),
  };
});

// historial de pagos por alumno + lista global
let pagoId = 1;
const PAGOS = [];
ALUMNOS.forEach((al) => {
  const cantidad = randInt(1, 3);
  for (let k = 0; k < cantidad; k++) {
    const fecha = addDays(al.fechaInicio, -k * al.diasPlan);
    PAGOS.push({
      id: pagoId++,
      alumnoId: al.id,
      alumno: al.nombreCompleto,
      avatar: al.avatar,
      monto: al.precioPlan,
      metodo: pick(METODOS),
      fecha,
      estado: "Pagado",
      plan: al.plan,
    });
  }
  if (al.estado === "Vencido" && rand() > 0.4) {
    PAGOS.push({
      id: pagoId++,
      alumnoId: al.id,
      alumno: al.nombreCompleto,
      avatar: al.avatar,
      monto: al.precioPlan,
      metodo: "—",
      fecha: al.fechaVencimiento,
      estado: "Pendiente",
      plan: al.plan,
    });
  }
});
PAGOS.sort((a, b) => b.fecha - a.fecha);

// asistencias — últimos 10 días, subconjunto aleatorio de alumnos
const ASISTENCIAS = [];
let asisId = 1;
for (let d = 9; d >= 0; d--) {
  const fecha = addDays(TODAY, -d);
  const cantidad = randInt(10, 22);
  const elegidos = [...ALUMNOS].sort(() => rand() - 0.5).slice(0, cantidad);
  elegidos.forEach((al) => {
    const tarde = rand() > 0.82;
    ASISTENCIAS.push({
      id: asisId++,
      alumnoId: al.id,
      alumno: al.nombreCompleto,
      avatar: al.avatar,
      fecha,
      hora: `${String(randInt(7, 21)).padStart(2, "0")}:${pick(["00","15","30","45"])}`,
      estado: tarde ? "Tarde" : "Presente",
    });
  });
}
ASISTENCIAS.sort((a, b) => b.fecha - a.fecha || a.alumno.localeCompare(b.alumno));

const ASISTENCIAS_POR_DIA = Array.from({ length: 7 }).map((_, i) => {
  const fecha = addDays(TODAY, -(6 - i));
  const count = ASISTENCIAS.filter((a) => a.fecha.toDateString() === fecha.toDateString()).length;
  return { dia: fecha.toLocaleDateString("es-AR", { weekday: "short" }), asistencias: count || randInt(12, 28) };
});

const INGRESOS_MES = [
  { mes: "Ene", ingresos: 612000, nuevos: 7 },
  { mes: "Feb", ingresos: 685000, nuevos: 9 },
  { mes: "Mar", ingresos: 734000, nuevos: 11 },
  { mes: "Abr", ingresos: 701000, nuevos: 6 },
  { mes: "May", ingresos: 788000, nuevos: 10 },
  { mes: "Jun", ingresos: 842000, nuevos: 13 },
];

const CAJA = {
  dia: { efectivo: 38000, transferencia: 24000, tarjeta: 16000 },
  semana: { efectivo: 184000, transferencia: 142000, tarjeta: 96000 },
  mes: { efectivo: 412000, transferencia: 318000, tarjeta: 240000 },
};

const USUARIOS_SISTEMA = [
  { nombre: "Valeria Suárez", rol: "Administrador", email: "valeria@pulsogym.com", avatar: avatarColor(2) },
  { nombre: "Brian Castro", rol: "Recepcionista", email: "brian@pulsogym.com", avatar: avatarColor(5) },
  { nombre: "Noelia Páez", rol: "Recepcionista", email: "noelia@pulsogym.com", avatar: avatarColor(9) },
];

/* ============================================================================
   styles — fonts + keyframes (injected once)
   ========================================================================= */

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
      .font-display { font-family: 'Outfit', sans-serif; }
      .font-body { font-family: 'Inter', sans-serif; }
      @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes scaleIn { from { opacity: 0; transform: scale(0.96) translateY(6px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      @keyframes slideDown { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes dash { from { stroke-dashoffset: 251; } }
      .anim-fade-up { animation: fadeUp .5s cubic-bezier(.16,1,.3,1) both; }
      .anim-fade-in { animation: fadeIn .3s ease both; }
      .anim-scale-in { animation: scaleIn .22s cubic-bezier(.16,1,.3,1) both; }
      .anim-slide-down { animation: slideDown .18s ease both; }
      .ring-progress { animation: dash 1.1s cubic-bezier(.16,1,.3,1) both; }
      ::-webkit-scrollbar { width: 8px; height: 8px; }
      ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 8px; }
      ::-webkit-scrollbar-track { background: transparent; }
    `}</style>
  );
}

/* ============================================================================
   components/ — reusable UI primitives
   ========================================================================= */

const ESTADO_STYLES = {
  Activo: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
  Vencido: "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20",
  Pendiente: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",
  Pagado: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
  Presente: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
  Tarde: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",
};

function Badge({ estado }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium", ESTADO_STYLES[estado] || "bg-slate-100 text-slate-600")}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {estado}
    </span>
  );
}

function Button({ children, variant = "primary", size = "md", className, icon: Icon, ...props }) {
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm shadow-slate-900/10",
    accent: "bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm shadow-emerald-600/20",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
    outline: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
    danger: "bg-rose-50 text-rose-600 hover:bg-rose-100",
  };
  const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2.5 text-sm", lg: "px-5 py-3 text-sm" };
  return (
    <button
      className={cn("inline-flex items-center justify-center gap-1.5 rounded-xl font-medium transition-all duration-200 active:scale-[0.97] disabled:opacity-50", variants[variant], sizes[size], className)}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
}

function Card({ children, className, delay = 0 }) {
  return (
    <div
      className={cn("rounded-2xl border border-slate-200/70 bg-white shadow-sm shadow-slate-200/40 anim-fade-up", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function EmptyState({ icon: Icon = FileText, title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-display text-sm font-semibold text-slate-700">{title}</p>
        {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
      </div>
    </div>
  );
}

function SearchBar({ value, onChange, placeholder = "Buscar..." }) {
  return (
    <div className="relative w-full max-w-xs">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
      />
    </div>
  );
}

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
      <span className="text-xs text-slate-400">Página {page} de {totalPages}</span>
      <div className="flex items-center gap-1">
        <button onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 disabled:opacity-30">
          <ChevronLeft className="h-4 w-4" />
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => onChange(i + 1)}
            className={cn("h-7 w-7 rounded-lg text-xs font-medium transition", page === i + 1 ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100")}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => onChange(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 disabled:opacity-30">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function TableWrap({ headers, children, delay = 0 }) {
  return (
    <Card className="overflow-hidden" delay={delay}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              {headers.map((h) => (
                <th key={h} className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">{children}</tbody>
        </table>
      </div>
    </Card>
  );
}

function Avatar({ name, color, size = "h-9 w-9" }) {
  return (
    <div className={cn("flex shrink-0 items-center justify-center rounded-full font-display text-xs font-bold", color, size)}>
      {name}
    </div>
  );
}

function Modal({ open, onClose, title, children, footer, wide }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 anim-fade-in">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className={cn("relative w-full max-h-[88vh] overflow-y-auto rounded-2xl bg-white shadow-2xl anim-scale-in", wide ? "max-w-2xl" : "max-w-md")}>
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h3 className="font-display text-base font-semibold text-slate-800">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"><X className="h-4 w-4" /></button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer && <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-slate-500">{label}</span>
      {children}
    </label>
  );
}
const inputCls = "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100";

function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 anim-fade-up">
      <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-xl shadow-slate-900/10">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"><Check className="h-3.5 w-3.5" /></span>
        {toast}
      </div>
    </div>
  );
}

// signature element — activity ring (gym "pulse" identity)
function ActivityRing({ percent, size = 64, stroke = 7, color = "#10b981", track = "#e2e8f0" }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (percent / 100) * c}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className="ring-progress"
      />
    </svg>
  );
}

function StatCard({ label, value, icon: Icon, trend, trendUp, accent = "emerald", delay = 0, ring }) {
  const accents = {
    emerald: "bg-emerald-50 text-emerald-600",
    indigo: "bg-indigo-50 text-indigo-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
  };
  return (
    <Card className="p-5" delay={delay}>
      <div className="flex items-start justify-between">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", accents[accent])}>
          <Icon className="h-5 w-5" />
        </div>
        {ring !== undefined ? (
          <div className="relative">
            <ActivityRing percent={ring} size={48} stroke={5} />
            <span className="absolute inset-0 flex items-center justify-center font-display text-[10px] font-bold text-slate-600">{ring}%</span>
          </div>
        ) : trend && (
          <span className={cn("inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold", trendUp ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600")}>
            {trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {trend}
          </span>
        )}
      </div>
      <p className="mt-4 font-display text-2xl font-bold text-slate-800">{value}</p>
      <p className="mt-0.5 text-xs font-medium text-slate-400">{label}</p>
    </Card>
  );
}

/* ============================================================================
   layouts/ — Sidebar + Navbar
   ========================================================================= */

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["Administrador", "Recepcionista"] },
  { key: "alumnos", label: "Alumnos", icon: Users, roles: ["Administrador", "Recepcionista"] },
  { key: "asistencias", label: "Asistencias", icon: CalendarCheck, roles: ["Administrador", "Recepcionista"] },
  { key: "pagos", label: "Pagos", icon: CreditCard, roles: ["Administrador", "Recepcionista"] },
  { key: "caja", label: "Caja", icon: Wallet, roles: ["Administrador"] },
  { key: "reportes", label: "Reportes", icon: BarChart3, roles: ["Administrador"] },
  { key: "configuracion", label: "Configuración", icon: Settings, roles: ["Administrador"] },
];

function Sidebar({ page, setPage, role, mobileOpen, setMobileOpen }) {
  const items = NAV_ITEMS.filter((i) => i.roles.includes(role));
  return (
    <>
      {mobileOpen && <div className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden" onClick={() => setMobileOpen(false)} />}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-slate-950 transition-transform duration-300 lg:static lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center gap-2.5 px-6 py-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/30">
            <Dumbbell className="h-4.5 w-4.5 text-white" />
          </div>
          <div>
            <p className="font-display text-base font-bold leading-none text-white">Pulso</p>
            <p className="mt-0.5 text-[11px] leading-none text-slate-500">Gestión de gimnasio</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2">
          {items.map((item) => {
            const active = page === item.key || (item.key === "alumnos" && page === "perfil");
            return (
              <button
                key={item.key}
                onClick={() => { setPage(item.key); setMobileOpen(false); }}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200",
                  active ? "bg-emerald-500/10 text-emerald-400" : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                )}
              >
                <item.icon className={cn("h-4.5 w-4.5", active && "text-emerald-400")} />
                {item.label}
                {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />}
              </button>
            );
          })}
        </nav>

        <div className="m-3 rounded-xl bg-white/5 px-3.5 py-3">
          <div className="mb-2 flex items-center justify-between text-[11px] text-slate-400">
            <span>Ocupación hoy</span><span className="font-semibold text-emerald-400">68%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-2/3 rounded-full bg-emerald-500" />
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-white/5 px-4 py-4">
          <Avatar name="AD" color="bg-emerald-500/20 text-emerald-400" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">Admin Demo</p>
            <p className="truncate text-xs text-slate-500">{role}</p>
          </div>
          <LogOut className="h-4 w-4 shrink-0 text-slate-500" />
        </div>
      </aside>
    </>
  );
}

function RoleSelector({ role, setRole }) {
  return (
    <div className="flex items-center rounded-xl bg-slate-100 p-1 text-xs font-medium">
      {["Administrador", "Recepcionista"].map((r) => (
        <button
          key={r}
          onClick={() => setRole(r)}
          className={cn("rounded-lg px-3 py-1.5 transition-all duration-200", role === r ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700")}
        >
          {r}
        </button>
      ))}
    </div>
  );
}

function Navbar({ role, setRole, setMobileOpen, title, subtitle }) {
  const [notifOpen, setNotifOpen] = useState(false);
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200 bg-white/80 px-5 py-3.5 backdrop-blur-md lg:px-8">
      <button className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden" onClick={() => setMobileOpen(true)}>
        <Menu className="h-5 w-5" />
      </button>
      <div className="hidden flex-col lg:flex">
        <h1 className="font-display text-lg font-bold text-slate-800">{title}</h1>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      </div>
      <div className="ml-auto flex items-center gap-3">
        <div className="hidden md:block">
          <SearchBar value="" onChange={() => {}} placeholder="Buscar alumno, pago..." />
        </div>
        <div className="relative">
          <button onClick={() => setNotifOpen((v) => !v)} className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-12 w-72 anim-slide-down">
              <Card className="p-2">
                <p className="px-2 py-1.5 text-xs font-semibold text-slate-400">Notificaciones</p>
                {[
                  ["7 membresías vencen esta semana", AlertCircle, "text-amber-500"],
                  ["Pago registrado — Camila Romero", CheckCircle2, "text-emerald-500"],
                  ["3 alumnos nuevos este mes", UserPlus, "text-indigo-500"],
                ].map(([t, I, c], i) => (
                  <div key={i} className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-xs text-slate-600 hover:bg-slate-50">
                    <I className={cn("h-3.5 w-3.5 shrink-0", c)} /> {t}
                  </div>
                ))}
              </Card>
            </div>
          )}
        </div>
        <RoleSelector role={role} setRole={setRole} />
        <Avatar name="AD" color="bg-slate-900 text-white" />
      </div>
    </header>
  );
}

/* ============================================================================
   pages/ — Dashboard
   ========================================================================= */

function Dashboard({ setPage, goPerfil }) {
  const activos = ALUMNOS.filter((a) => a.estado === "Activo").length;
  const pendientesPago = PAGOS.filter((p) => p.estado === "Pendiente").length;
  const ingresosMes = INGRESOS_MES[INGRESOS_MES.length - 1].ingresos;
  const asistenciasHoy = ASISTENCIAS.filter((a) => a.fecha.toDateString() === TODAY.toDateString()).length;
  const ultimosPagos = PAGOS.slice(0, 5);
  const proximosVencimientos = [...ALUMNOS].filter((a) => a.estado !== "Vencido").sort((a, b) => a.fechaVencimiento - b.fechaVencimiento).slice(0, 5);
  const ultimosAlumnos = [...ALUMNOS].sort((a, b) => b.fechaInicio - a.fechaInicio).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="anim-fade-up">
        <h2 className="font-display text-2xl font-bold text-slate-800">Hola, Admin 👋</h2>
        <p className="text-sm text-slate-400">Esto es lo que está pasando hoy, {fmtDate(TODAY)}.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Alumnos activos" value={activos} icon={Users} trend="+8.2%" trendUp delay={0} accent="emerald" ring={Math.round((activos / ALUMNOS.length) * 100)} />
        <StatCard label="Pagos pendientes" value={pendientesPago} icon={CreditCard} trend="-3" trendUp={false} delay={60} accent="amber" />
        <StatCard label="Ingresos del mes" value={fmtCurrency(ingresosMes)} icon={DollarSign} trend="+6.9%" trendUp delay={120} accent="indigo" />
        <StatCard label="Asistencias de hoy" value={asistenciasHoy} icon={CalendarCheck} trend="+12%" trendUp delay={180} accent="rose" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="p-5 xl:col-span-2" delay={220}>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="font-display text-sm font-semibold text-slate-700">Ingresos — últimos 6 meses</p>
              <p className="text-xs text-slate-400">Comparado contra el mismo período anterior</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600"><Sparkles className="h-3 w-3" /> +15.4%</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={INGRESOS_MES} margin={{ left: -16, top: 5 }}>
              <defs>
                <linearGradient id="ing" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.32} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#cbd5e1" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip formatter={(v) => fmtCurrency(v)} contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
              <Area type="monotone" dataKey="ingresos" stroke="#10b981" strokeWidth={2.5} fill="url(#ing)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5" delay={280}>
          <p className="font-display text-sm font-semibold text-slate-700">Asistencias — 7 días</p>
          <p className="mb-4 text-xs text-slate-400">Check-ins diarios</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ASISTENCIAS_POR_DIA} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="dia" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#cbd5e1" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
              <Bar dataKey="asistencias" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="p-5" delay={320}>
          <p className="mb-3 font-display text-sm font-semibold text-slate-700">Últimos pagos</p>
          <div className="space-y-3">
            {ultimosPagos.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <Avatar name={p.alumno.split(" ").map((s) => s[0]).join("").slice(0, 2)} color={p.avatar} size="h-8 w-8" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-slate-700">{p.alumno}</p>
                  <p className="text-[11px] text-slate-400">{fmtShortDate(p.fecha)} · {p.metodo}</p>
                </div>
                <span className="text-xs font-semibold text-slate-700">{fmtCurrency(p.monto)}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5" delay={380}>
          <p className="mb-3 font-display text-sm font-semibold text-slate-700">Próximos vencimientos</p>
          <div className="space-y-3">
            {proximosVencimientos.map((a) => (
              <button key={a.id} onClick={() => goPerfil(a)} className="flex w-full items-center gap-3 rounded-lg text-left hover:bg-slate-50">
                <Avatar name={initials(a.nombre, a.apellido)} color={a.avatar} size="h-8 w-8" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-slate-700">{a.nombreCompleto}</p>
                  <p className="text-[11px] text-slate-400">{a.plan}</p>
                </div>
                <span className="text-[11px] font-medium text-amber-600">{fmtShortDate(a.fechaVencimiento)}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-5" delay={440}>
          <p className="mb-3 font-display text-sm font-semibold text-slate-700">Últimos alumnos registrados</p>
          <div className="space-y-3">
            {ultimosAlumnos.map((a) => (
              <button key={a.id} onClick={() => goPerfil(a)} className="flex w-full items-center gap-3 rounded-lg text-left hover:bg-slate-50">
                <Avatar name={initials(a.nombre, a.apellido)} color={a.avatar} size="h-8 w-8" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-slate-700">{a.nombreCompleto}</p>
                  <p className="text-[11px] text-slate-400">Desde {fmtShortDate(a.fechaInicio)}</p>
                </div>
                <Badge estado={a.estado} />
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ============================================================================
   pages/ — Alumnos
   ========================================================================= */

function NuevoAlumnoModal({ open, onClose, onSave }) {
  return (
    <Modal
      open={open} onClose={onClose} title="Nuevo alumno" wide
      footer={<>
        <Button variant="outline" onClick={onClose}>Cancelar</Button>
        <Button variant="accent" icon={Check} onClick={onSave}>Guardar alumno</Button>
      </>}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nombre"><input className={inputCls} placeholder="Ej: Camila" /></Field>
        <Field label="Apellido"><input className={inputCls} placeholder="Ej: Romero" /></Field>
        <Field label="DNI"><input className={inputCls} placeholder="00.000.000" /></Field>
        <Field label="Teléfono"><input className={inputCls} placeholder="+54 9 ..." /></Field>
        <Field label="Email"><input className={inputCls} placeholder="correo@mail.com" /></Field>
        <Field label="Plan">
          <select className={inputCls}>
            {PLANES.map((p) => <option key={p.nombre}>{p.nombre} — {fmtCurrency(p.precio)}</option>)}
          </select>
        </Field>
      </div>
    </Modal>
  );
}

function Alumnos({ goPerfil, notify }) {
  const [query, setQuery] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const pageSize = 8;

  const filtered = useMemo(() => {
    return ALUMNOS.filter((a) => {
      const matchesQuery = a.nombreCompleto.toLowerCase().includes(query.toLowerCase()) || a.dni.includes(query);
      const matchesFiltro = filtro === "Todos" || a.estado === filtro;
      return matchesQuery && matchesFiltro;
    });
  }, [query, filtro]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 anim-fade-up">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-800">Alumnos</h2>
          <p className="text-sm text-slate-400">{ALUMNOS.length} alumnos registrados en total</p>
        </div>
        <Button variant="accent" icon={Plus} onClick={() => setModalOpen(true)}>Nuevo Alumno</Button>
      </div>

      <div className="flex flex-wrap items-center gap-3 anim-fade-up" style={{ animationDelay: "60ms" }}>
        <SearchBar value={query} onChange={(v) => { setQuery(v); setPage(1); }} placeholder="Buscar por nombre o DNI..." />
        <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-1 py-1">
          <Filter className="ml-2 h-3.5 w-3.5 text-slate-400" />
          {["Todos", "Activo", "Pendiente", "Vencido"].map((f) => (
            <button
              key={f}
              onClick={() => { setFiltro(f); setPage(1); }}
              className={cn("rounded-lg px-2.5 py-1.5 text-xs font-medium transition", filtro === f ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100")}
            >{f}</button>
          ))}
        </div>
      </div>

      {pageData.length === 0 ? (
        <Card><EmptyState icon={Users} title="No se encontraron alumnos" subtitle="Probá con otro nombre, DNI o filtro de estado." /></Card>
      ) : (
        <TableWrap headers={["Nombre", "DNI", "Plan", "Estado", "Vencimiento", "Última asistencia", "Acciones"]} delay={120}>
          {pageData.map((a) => (
            <tr key={a.id} className="transition hover:bg-slate-50/80">
              <td className="px-5 py-3">
                <button onClick={() => goPerfil(a)} className="flex items-center gap-3 text-left">
                  <Avatar name={initials(a.nombre, a.apellido)} color={a.avatar} />
                  <span className="font-medium text-slate-700">{a.nombreCompleto}</span>
                </button>
              </td>
              <td className="px-5 py-3 text-slate-500">{a.dni}</td>
              <td className="px-5 py-3 text-slate-500">{a.plan}</td>
              <td className="px-5 py-3"><Badge estado={a.estado} /></td>
              <td className="px-5 py-3 text-slate-500">{fmtDate(a.fechaVencimiento)}</td>
              <td className="px-5 py-3 text-slate-500">{a.ultimaAsistencia ? fmtDate(a.ultimaAsistencia) : "—"}</td>
              <td className="px-5 py-3">
                <div className="flex items-center gap-1">
                  <button onClick={() => goPerfil(a)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" title="Ver"><Eye className="h-4 w-4" /></button>
                  <button onClick={() => notify(`Editando a ${a.nombreCompleto} (demo)`)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" title="Editar"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => notify(`Pago registrado para ${a.nombreCompleto}`)} className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600" title="Registrar pago"><DollarSign className="h-4 w-4" /></button>
                </div>
              </td>
            </tr>
          ))}
        </TableWrap>
      )}
      {pageData.length > 0 && <Pagination page={page} totalPages={totalPages} onChange={setPage} />}

      <NuevoAlumnoModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={() => { setModalOpen(false); notify("Alumno guardado correctamente"); }} />
    </div>
  );
}

/* ============================================================================
   pages/ — Perfil del alumno
   ========================================================================= */

function AlumnoPerfil({ alumno, back }) {
  const [tab, setTab] = useState("membresia");
  if (!alumno) return null;
  const pagos = PAGOS.filter((p) => p.alumnoId === alumno.id);
  const asistencias = ASISTENCIAS.filter((a) => a.alumnoId === alumno.id);

  return (
    <div className="space-y-5">
      <button onClick={back} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 anim-fade-up">
        <ArrowLeft className="h-4 w-4" /> Volver a Alumnos
      </button>

      <Card className="p-6" delay={60}>
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <Avatar name={initials(alumno.nombre, alumno.apellido)} color={alumno.avatar} size="h-16 w-16" />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-xl font-bold text-slate-800">{alumno.nombreCompleto}</h2>
              <Badge estado={alumno.estado} />
            </div>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5"><FileText className="h-3.5 w-3.5" /> DNI {alumno.dni}</span>
              <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {alumno.telefono}</span>
              <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {alumno.email}</span>
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {alumno.direccion}</span>
            </div>
          </div>
          <Button variant="accent" icon={DollarSign}>Registrar pago</Button>
        </div>
      </Card>

      <div className="flex gap-1.5 rounded-xl bg-slate-100 p-1 anim-fade-up" style={{ animationDelay: "120ms", width: "fit-content" }}>
        {[["membresia", "Membresía"], ["pagos", "Historial de pagos"], ["asistencias", "Asistencias"], ["obs", "Observaciones"]].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className={cn("rounded-lg px-3.5 py-2 text-xs font-medium transition", tab === k ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700")}>{l}</button>
        ))}
      </div>

      {tab === "membresia" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 anim-fade-up">
          <Card className="p-5"><p className="text-xs text-slate-400">Plan actual</p><p className="mt-1 font-display text-lg font-bold text-slate-800">{alumno.plan}</p><p className="text-xs text-slate-400">{fmtCurrency(alumno.precioPlan)}</p></Card>
          <Card className="p-5"><p className="text-xs text-slate-400">Inicio de membresía</p><p className="mt-1 font-display text-lg font-bold text-slate-800">{fmtDate(alumno.fechaInicio)}</p></Card>
          <Card className="p-5"><p className="text-xs text-slate-400">Vencimiento</p><p className="mt-1 font-display text-lg font-bold text-slate-800">{fmtDate(alumno.fechaVencimiento)}</p></Card>
        </div>
      )}

      {tab === "pagos" && (
        pagos.length === 0 ? <Card><EmptyState icon={CreditCard} title="Sin pagos registrados" /></Card> :
        <TableWrap headers={["Monto", "Método", "Fecha", "Estado"]}>
          {pagos.map((p) => (
            <tr key={p.id} className="hover:bg-slate-50/80">
              <td className="px-5 py-3 font-medium text-slate-700">{fmtCurrency(p.monto)}</td>
              <td className="px-5 py-3 text-slate-500">{p.metodo}</td>
              <td className="px-5 py-3 text-slate-500">{fmtDate(p.fecha)}</td>
              <td className="px-5 py-3"><Badge estado={p.estado} /></td>
            </tr>
          ))}
        </TableWrap>
      )}

      {tab === "asistencias" && (
        asistencias.length === 0 ? <Card><EmptyState icon={CalendarCheck} title="Sin asistencias registradas" subtitle="Este alumno todavía no marcó ingreso." /></Card> :
        <TableWrap headers={["Fecha", "Hora", "Estado"]}>
          {asistencias.map((a) => (
            <tr key={a.id} className="hover:bg-slate-50/80">
              <td className="px-5 py-3 text-slate-500">{fmtDate(a.fecha)}</td>
              <td className="px-5 py-3 text-slate-500">{a.hora}</td>
              <td className="px-5 py-3"><Badge estado={a.estado} /></td>
            </tr>
          ))}
        </TableWrap>
      )}

      {tab === "obs" && (
        <Card className="p-5">
          {alumno.observaciones ? (
            <p className="text-sm leading-relaxed text-slate-600">{alumno.observaciones}</p>
          ) : (
            <EmptyState icon={FileText} title="Sin observaciones" subtitle="No hay notas cargadas para este alumno." />
          )}
        </Card>
      )}
    </div>
  );
}

/* ============================================================================
   pages/ — Asistencias
   ========================================================================= */

function RegistrarAsistenciaModal({ open, onClose, onSave }) {
  return (
    <Modal open={open} onClose={onClose} title="Registrar asistencia" footer={<>
      <Button variant="outline" onClick={onClose}>Cancelar</Button>
      <Button variant="accent" icon={Check} onClick={onSave}>Registrar</Button>
    </>}>
      <div className="space-y-4">
        <Field label="Alumno">
          <select className={inputCls}>
            {ALUMNOS.slice(0, 12).map((a) => <option key={a.id}>{a.nombreCompleto}</option>)}
          </select>
        </Field>
        <Field label="Hora de ingreso"><input className={inputCls} defaultValue={TODAY.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })} /></Field>
      </div>
    </Modal>
  );
}

function Asistencias({ notify }) {
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const filtered = ASISTENCIAS.filter((a) => a.alumno.toLowerCase().includes(query.toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-5">
      <div className="anim-fade-up">
        <h2 className="font-display text-2xl font-bold text-slate-800">Asistencias</h2>
        <p className="text-sm text-slate-400">Seguimiento de ingresos diarios al gimnasio</p>
      </div>

      <Card className="flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:justify-between sm:text-left" delay={60}>
        <div>
          <p className="font-display text-lg font-semibold text-slate-800">Registrar nueva asistencia</p>
          <p className="text-sm text-slate-400">Marcá el ingreso de un alumno al instante</p>
        </div>
        <Button variant="accent" size="lg" icon={CalendarCheck} onClick={() => setModalOpen(true)}>Registrar asistencia</Button>
      </Card>

      <div className="anim-fade-up" style={{ animationDelay: "120ms" }}>
        <SearchBar value={query} onChange={(v) => { setQuery(v); setPage(1); }} placeholder="Buscar alumno..." />
      </div>

      {pageData.length === 0 ? (
        <Card><EmptyState icon={CalendarCheck} title="Sin resultados" /></Card>
      ) : (
        <TableWrap headers={["Alumno", "Fecha", "Hora", "Estado"]} delay={180}>
          {pageData.map((a) => (
            <tr key={a.id} className="hover:bg-slate-50/80">
              <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                  <Avatar name={a.alumno.split(" ").map((s) => s[0]).join("").slice(0, 2)} color={a.avatar} size="h-8 w-8" />
                  <span className="font-medium text-slate-700">{a.alumno}</span>
                </div>
              </td>
              <td className="px-5 py-3 text-slate-500">{fmtDate(a.fecha)}</td>
              <td className="px-5 py-3 text-slate-500">{a.hora}</td>
              <td className="px-5 py-3"><Badge estado={a.estado} /></td>
            </tr>
          ))}
        </TableWrap>
      )}
      {pageData.length > 0 && <Pagination page={page} totalPages={totalPages} onChange={setPage} />}

      <RegistrarAsistenciaModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={() => { setModalOpen(false); notify("Asistencia registrada con éxito"); }} />
    </div>
  );
}

/* ============================================================================
   pages/ — Pagos
   ========================================================================= */

function RegistrarPagoModal({ open, onClose, onSave }) {
  return (
    <Modal open={open} onClose={onClose} title="Registrar pago" wide footer={<>
      <Button variant="outline" onClick={onClose}>Cancelar</Button>
      <Button variant="accent" icon={Check} onClick={onSave}>Confirmar pago</Button>
    </>}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Alumno">
          <select className={inputCls}>{ALUMNOS.slice(0, 12).map((a) => <option key={a.id}>{a.nombreCompleto}</option>)}</select>
        </Field>
        <Field label="Plan">
          <select className={inputCls}>{PLANES.map((p) => <option key={p.nombre}>{p.nombre} — {fmtCurrency(p.precio)}</option>)}</select>
        </Field>
        <Field label="Monto"><input className={inputCls} defaultValue="16.000" /></Field>
        <Field label="Método de pago">
          <select className={inputCls}>{METODOS.map((m) => <option key={m}>{m}</option>)}</select>
        </Field>
      </div>
    </Modal>
  );
}

function Pagos({ notify }) {
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const filtered = PAGOS.filter((p) => p.alumno.toLowerCase().includes(query.toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 anim-fade-up">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-800">Pagos</h2>
          <p className="text-sm text-slate-400">{PAGOS.length} movimientos registrados</p>
        </div>
        <Button variant="accent" icon={Plus} onClick={() => setModalOpen(true)}>Registrar pago</Button>
      </div>

      <div className="anim-fade-up" style={{ animationDelay: "60ms" }}>
        <SearchBar value={query} onChange={(v) => { setQuery(v); setPage(1); }} placeholder="Buscar alumno..." />
      </div>

      {pageData.length === 0 ? (
        <Card><EmptyState icon={CreditCard} title="Sin pagos" /></Card>
      ) : (
        <TableWrap headers={["Alumno", "Monto", "Método", "Fecha", "Estado"]} delay={120}>
          {pageData.map((p) => (
            <tr key={p.id} className="hover:bg-slate-50/80">
              <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                  <Avatar name={p.alumno.split(" ").map((s) => s[0]).join("").slice(0, 2)} color={p.avatar} size="h-8 w-8" />
                  <span className="font-medium text-slate-700">{p.alumno}</span>
                </div>
              </td>
              <td className="px-5 py-3 font-medium text-slate-700">{fmtCurrency(p.monto)}</td>
              <td className="px-5 py-3 text-slate-500">{p.metodo}</td>
              <td className="px-5 py-3 text-slate-500">{fmtDate(p.fecha)}</td>
              <td className="px-5 py-3"><Badge estado={p.estado} /></td>
            </tr>
          ))}
        </TableWrap>
      )}
      {pageData.length > 0 && <Pagination page={page} totalPages={totalPages} onChange={setPage} />}

      <RegistrarPagoModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={() => { setModalOpen(false); notify("Pago registrado correctamente"); }} />
    </div>
  );
}

/* ============================================================================
   pages/ — Caja (admin)
   ========================================================================= */

function Caja() {
  const totalDia = CAJA.dia.efectivo + CAJA.dia.transferencia + CAJA.dia.tarjeta;
  const totalSemana = CAJA.semana.efectivo + CAJA.semana.transferencia + CAJA.semana.tarjeta;
  const totalMes = CAJA.mes.efectivo + CAJA.mes.transferencia + CAJA.mes.tarjeta;
  const pie = [
    { name: "Efectivo", value: CAJA.dia.efectivo, color: "#10b981" },
    { name: "Transferencia", value: CAJA.dia.transferencia, color: "#6366f1" },
    { name: "Tarjeta", value: CAJA.dia.tarjeta, color: "#f59e0b" },
  ];

  return (
    <div className="space-y-5">
      <div className="anim-fade-up">
        <h2 className="font-display text-2xl font-bold text-slate-800">Caja</h2>
        <p className="text-sm text-slate-400">Resumen financiero de ingresos por período</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total del día" value={fmtCurrency(totalDia)} icon={Wallet} trend="+4.1%" trendUp accent="emerald" delay={0} />
        <StatCard label="Total semanal" value={fmtCurrency(totalSemana)} icon={Banknote} trend="+9.8%" trendUp accent="indigo" delay={60} />
        <StatCard label="Total mensual" value={fmtCurrency(totalMes)} icon={DollarSign} trend="+6.9%" trendUp accent="amber" delay={120} />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="p-5 xl:col-span-2" delay={180}>
          <p className="font-display text-sm font-semibold text-slate-700">Ingresos — últimos 7 días</p>
          <p className="mb-3 text-xs text-slate-400">Total combinado por método de pago</p>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={ASISTENCIAS_POR_DIA.map((d) => ({ dia: d.dia, ingresos: d.asistencias * 1450 }))} margin={{ left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="dia" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#cbd5e1" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip formatter={(v) => fmtCurrency(v)} contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
              <Bar dataKey="ingresos" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5" delay={240}>
          <p className="font-display text-sm font-semibold text-slate-700">Métodos de pago — hoy</p>
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie data={pie} dataKey="value" innerRadius={48} outerRadius={70} paddingAngle={3}>
                {pie.map((p, i) => <Cell key={i} fill={p.color} />)}
              </Pie>
              <Tooltip formatter={(v) => fmtCurrency(v)} contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-2">
            {pie.map((p, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-500"><span className="h-2 w-2 rounded-full" style={{ background: p.color }} />{p.name}</span>
                <span className="font-medium text-slate-700">{fmtCurrency(p.value)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ============================================================================
   pages/ — Reportes (admin)
   ========================================================================= */

function Reportes() {
  const totalAlumnos = ALUMNOS.length;
  const nuevosMes = INGRESOS_MES[INGRESOS_MES.length - 1].nuevos;
  const ingresosMes = INGRESOS_MES[INGRESOS_MES.length - 1].ingresos;
  const renovaciones = PAGOS.filter((p) => p.estado === "Pagado" && p.fecha >= addDays(TODAY, -30)).length;
  const vencimientos = ALUMNOS.filter((a) => a.estado === "Vencido").length;
  const porPlan = PLANES.map((p) => ({ plan: p.nombre, alumnos: ALUMNOS.filter((a) => a.plan === p.nombre).length }));

  return (
    <div className="space-y-5">
      <div className="anim-fade-up">
        <h2 className="font-display text-2xl font-bold text-slate-800">Reportes</h2>
        <p className="text-sm text-slate-400">Estadísticas generales del gimnasio</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Cantidad de alumnos" value={totalAlumnos} icon={Users} accent="emerald" delay={0} />
        <StatCard label="Nuevos este mes" value={nuevosMes} icon={UserPlus} accent="indigo" delay={50} />
        <StatCard label="Ingresos del mes" value={fmtCurrency(ingresosMes)} icon={DollarSign} accent="amber" delay={100} />
        <StatCard label="Renovaciones (30d)" value={renovaciones} icon={CheckCircle2} accent="emerald" delay={150} />
        <StatCard label="Vencimientos" value={vencimientos} icon={AlertCircle} accent="rose" delay={200} />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="p-5 xl:col-span-2" delay={260}>
          <p className="font-display text-sm font-semibold text-slate-700">Ingresos mensuales</p>
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={INGRESOS_MES} margin={{ left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#cbd5e1" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip formatter={(v) => fmtCurrency(v)} contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
              <Line type="monotone" dataKey="ingresos" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 3, fill: "#6366f1" }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-5" delay={320}>
          <p className="font-display text-sm font-semibold text-slate-700">Alumnos por plan</p>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={porPlan} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#cbd5e1" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="plan" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={80} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
              <Bar dataKey="alumnos" fill="#10b981" radius={[0, 6, 6, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

/* ============================================================================
   pages/ — Configuración (admin)
   ========================================================================= */

function Configuracion() {
  return (
    <div className="space-y-5">
      <div className="anim-fade-up">
        <h2 className="font-display text-2xl font-bold text-slate-800">Configuración</h2>
        <p className="text-sm text-slate-400">Datos del gimnasio, planes, usuarios y preferencias</p>
      </div>

      <Card className="p-6" delay={60}>
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><Building2 className="h-4.5 w-4.5" /></div>
          <p className="font-display text-sm font-semibold text-slate-700">Información del gimnasio</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Nombre del gimnasio"><input className={inputCls} defaultValue="Pulso Fitness Club" /></Field>
          <Field label="Teléfono"><input className={inputCls} defaultValue="+54 299 442-1190" /></Field>
          <Field label="Dirección"><input className={inputCls} defaultValue="Av. Argentina 1450, Neuquén" /></Field>
          <Field label="Email de contacto"><input className={inputCls} defaultValue="contacto@pulsogym.com" /></Field>
        </div>
      </Card>

      <Card className="p-6" delay={120}>
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><DollarSign className="h-4.5 w-4.5" /></div>
          <p className="font-display text-sm font-semibold text-slate-700">Precios de membresías</p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {PLANES.map((p) => (
            <div key={p.nombre} className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs font-medium text-slate-400">{p.nombre}</p>
              <input className="mt-1 w-full border-none bg-transparent p-0 font-display text-lg font-bold text-slate-800 outline-none" defaultValue={fmtCurrency(p.precio)} />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6" delay={180}>
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><Users className="h-4.5 w-4.5" /></div>
          <p className="font-display text-sm font-semibold text-slate-700">Usuarios del sistema</p>
        </div>
        <div className="divide-y divide-slate-100">
          {USUARIOS_SISTEMA.map((u, i) => (
            <div key={i} className="flex items-center gap-3 py-3">
              <Avatar name={u.nombre.split(" ").map((s) => s[0]).join("")} color={u.avatar} />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-700">{u.nombre}</p>
                <p className="text-xs text-slate-400">{u.email}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{u.rol}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6" delay={240}>
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600"><Settings className="h-4.5 w-4.5" /></div>
          <p className="font-display text-sm font-semibold text-slate-700">Preferencias</p>
        </div>
        <div className="space-y-3">
          {["Notificaciones de vencimientos", "Recordatorios automáticos por WhatsApp", "Resumen semanal por email"].map((p, i) => (
            <ToggleRow key={i} label={p} defaultOn={i !== 2} />
          ))}
        </div>
      </Card>
    </div>
  );
}

function ToggleRow({ label, defaultOn }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3">
      <span className="text-sm text-slate-600">{label}</span>
      <button onClick={() => setOn((v) => !v)} className={cn("relative h-6 w-11 rounded-full transition-colors duration-200", on ? "bg-emerald-500" : "bg-slate-200")}>
        <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200", on ? "translate-x-5" : "translate-x-0.5")} />
      </button>
    </div>
  );
}

/* ============================================================================
   app — root
   ========================================================================= */

const PAGE_META = {
  dashboard: ["Dashboard", "Resumen general del gimnasio"],
  alumnos: ["Alumnos", "Gestión de socios y membresías"],
  perfil: ["Perfil del alumno", ""],
  asistencias: ["Asistencias", "Control de ingresos diarios"],
  pagos: ["Pagos", "Movimientos y cobros"],
  caja: ["Caja", "Resumen financiero"],
  reportes: ["Reportes", "Estadísticas del negocio"],
  configuracion: ["Configuración", "Ajustes del sistema"],
};

export default function App() {
  const [role, setRole] = useState("Administrador");
  const [page, setPage] = useState("dashboard");
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    const allowed = NAV_ITEMS.find((i) => i.key === page)?.roles.includes(role);
    if (page !== "perfil" && !allowed) setPage("dashboard");
  }, [role]); // eslint-disable-line

  const notify = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  };

  const goPerfil = (alumno) => { setSelectedAlumno(alumno); setPage("perfil"); };

  const [title, subtitle] = PAGE_META[page];

  return (
    <div className="font-body flex min-h-screen w-full bg-slate-50">
      <GlobalStyles />
      <Sidebar page={page} setPage={(p) => { setPage(p); setSelectedAlumno(null); }} role={role} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex min-h-screen flex-1 flex-col">
        <Navbar role={role} setRole={setRole} setMobileOpen={setMobileOpen} title={title} subtitle={subtitle} />
        <main key={page + (selectedAlumno?.id || "")} className="flex-1 p-5 lg:p-8">
          {page === "dashboard" && <Dashboard setPage={setPage} goPerfil={goPerfil} />}
          {page === "alumnos" && <Alumnos goPerfil={goPerfil} notify={notify} />}
          {page === "perfil" && <AlumnoPerfil alumno={selectedAlumno} back={() => setPage("alumnos")} />}
          {page === "asistencias" && <Asistencias notify={notify} />}
          {page === "pagos" && <Pagos notify={notify} />}
          {page === "caja" && role === "Administrador" && <Caja />}
          {page === "reportes" && role === "Administrador" && <Reportes />}
          {page === "configuracion" && role === "Administrador" && <Configuracion />}
        </main>
      </div>
      <Toast toast={toast} />
    </div>
  );
}

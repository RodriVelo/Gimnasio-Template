# FORJA Gym — Sistema de Gestión (Frontend Template)

Template completo de frontend para un sistema de gestión de gimnasios, construido con **React + Vite + Tailwind CSS**. Sin backend, sin base de datos, sin autenticación real — todos los datos son estáticos (mock) para mostrar el diseño y la navegación completa del sistema.

## Stack

- React 19 + Vite
- Tailwind CSS 3
- React Router 6
- Lucide React (iconos)
- Recharts (gráficos)

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

Abrí `http://localhost:5173` en el navegador. Vas a ver una pantalla de inicio para elegir entre los 3 paneles (Administrador, Entrenador, Cliente) — no hace falta loguearse.

## Estructura

```
src/
  components/
    ui/        → Card, Badge, Button, Input, SearchBar, Table, Modal, Pagination, StatsCard, PageHeader
    layout/    → Sidebar, Navbar, DashboardLayout, navConfig (rutas de cada panel)
    charts/    → Theming compartido para los gráficos (recharts)
  data/        → Datos ficticios (clientes, pagos, entrenadores, ejercicios, rutinas, etc.)
  pages/
    admin/     → Dashboard, Clientes, Membresías, Pagos, Entrenadores, Ejercicios, Horarios, Reportes
    trainer/   → Inicio, Mis alumnos, Rutinas, Asignar rutina, Mensajes
    client/    → Inicio, Mis rutinas, Detalle de rutina, Calendario, Confirmar asistencia, Progreso, Pagos, Perfil
  utils/       → Formateo de moneda, fechas y badges de estado
```

## Notas

- Todos los datos están hardcodeados en `src/data/`. Para conectar un backend real, esos archivos son el punto de partida: reemplazá los arrays estáticos por llamadas a tu API.
- El sidebar es colapsable y cada panel tiene un selector rápido ("Cambiar panel") para navegar entre Administrador / Entrenador / Cliente durante la demo.
- Paleta: fondo oscuro (#0a0a0c / #131316), acento rojo (#dc2626), texto en grises claros. Tipografía Inter + JetBrains Mono para números.

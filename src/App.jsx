import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Landing from "./pages/Landing";

import Dashboard from "./pages/admin/Dashboard";
import Clientes from "./pages/admin/Clientes";
import AsistenciaManual from "./pages/admin/AsistenciaManual";
import Membresias from "./pages/admin/Membresias";
import EstadoMembresias from "./pages/admin/EstadoMembresias";
import Pagos from "./pages/admin/Pagos";
import Entrenadores from "./pages/admin/Entrenadores";
import Ejercicios from "./pages/admin/Ejercicios";
import Horarios from "./pages/admin/Horarios";
import Reportes from "./pages/admin/Reportes";

import TrainerHome from "./pages/trainer/TrainerHome";
import MisAlumnos from "./pages/trainer/MisAlumnos";
import Rutinas from "./pages/trainer/Rutinas";
import AsignarRutina from "./pages/trainer/AsignarRutina";
import Mensajes from "./pages/trainer/Mensajes";

import ClientHome from "./pages/client/ClientHome";
import MisRutinas from "./pages/client/MisRutinas";
import DetalleRutina from "./pages/client/DetalleRutina";
import Calendario from "./pages/client/Calendario";
import ConfirmarAsistencia from "./pages/client/ConfirmarAsistencia";
import Progreso from "./pages/client/Progreso";
import ClientPagos from "./pages/client/ClientPagos";
import Perfil from "./pages/client/Perfil";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/admin" element={<DashboardLayout role="admin" />}>
          <Route index element={<Dashboard />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="asistencia" element={<AsistenciaManual />} />
          <Route path="membresias" element={<Membresias />} />
          <Route path="estado-membresias" element={<EstadoMembresias />} />
          <Route path="pagos" element={<Pagos />} />
          <Route path="entrenadores" element={<Entrenadores />} />
          <Route path="ejercicios" element={<Ejercicios />} />
          <Route path="horarios" element={<Horarios />} />
          <Route path="reportes" element={<Reportes />} />
        </Route>

        <Route path="/entrenador" element={<DashboardLayout role="entrenador" />}>
          <Route index element={<TrainerHome />} />
          <Route path="alumnos" element={<MisAlumnos />} />
          <Route path="rutinas" element={<Rutinas />} />
          <Route path="asignar" element={<AsignarRutina />} />
          <Route path="mensajes" element={<Mensajes />} />
        </Route>

        <Route path="/cliente" element={<DashboardLayout role="cliente" />}>
          <Route index element={<ClientHome />} />
          <Route path="rutinas" element={<MisRutinas />} />
          <Route path="rutinas/:id" element={<DetalleRutina />} />
          <Route path="calendario" element={<Calendario />} />
          <Route path="asistencia" element={<ConfirmarAsistencia />} />
          <Route path="progreso" element={<Progreso />} />
          <Route path="pagos" element={<ClientPagos />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

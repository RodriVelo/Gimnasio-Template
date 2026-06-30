import { Mail, Phone, Target, Pencil } from "lucide-react";
import { PageHeader, Card, Button, Input } from "../../components/ui";
import { myProfile } from "../../data/clientData";

export default function Perfil() {
  return (
    <div>
      <PageHeader title="Mi perfil" subtitle="Información personal y objetivos" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-1 flex flex-col items-center text-center">
          <img src={myProfile.foto} alt={myProfile.nombre} className="w-24 h-24 rounded-2xl object-cover mb-4" />
          <h3 className="text-base font-semibold text-ink">{myProfile.nombre}</h3>
          <p className="text-xs text-ink-faint mt-1">Cliente · {myProfile.membresia}</p>
          <Button variant="secondary" icon={Pencil} className="w-full mt-5">Editar perfil</Button>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="text-sm font-semibold text-ink mb-4">Información de contacto</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 border border-border">
              <Mail size={16} className="text-accent-500 flex-shrink-0" />
              <div>
                <p className="text-[11px] text-ink-faint">Email</p>
                <p className="text-sm text-ink">{myProfile.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 border border-border">
              <Phone size={16} className="text-accent-500 flex-shrink-0" />
              <div>
                <p className="text-[11px] text-ink-faint">Teléfono</p>
                <p className="text-sm text-ink">{myProfile.telefono}</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-50 border border-border mb-6">
            <Target size={16} className="text-accent-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] text-ink-faint">Objetivos</p>
              <p className="text-sm text-ink">{myProfile.objetivos}</p>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-ink mb-4">Editar datos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="Nombre completo" defaultValue={myProfile.nombre} />
            <Input label="Email" defaultValue={myProfile.email} />
            <Input label="Teléfono" defaultValue={myProfile.telefono} />
            <Input label="Objetivo" defaultValue={myProfile.objetivos} />
          </div>
          <div className="flex justify-end mt-5">
            <Button>Guardar cambios</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

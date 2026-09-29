import { toast } from "sonner";

import { Button } from "@/components/ui/button";

// Código de acceso del jugador en grande, con botón para copiarlo. Se usa al
// registrarse (UsernameGate) y en "Mi perfil" (AppHeader).
export function PlayerCode({ code }: { code: string }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("¡Código copiado!");
    } catch {
      toast.error("No pudimos copiarlo, anótalo a mano");
    }
  };

  return (
    <div className="space-y-3">
      <p
        className="px-frame px-c-night select-all py-4 text-center font-pixel text-3xl tracking-[0.3em] text-gold sm:text-4xl"
        aria-label={`Tu código es ${code.split("").join(" ")}`}
      >
        {code}
      </p>
      <Button type="button" variant="secondary" onClick={() => void copy()} className="w-full">
        Copiar código
      </Button>
    </div>
  );
}

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import { GroundParade, PixelGround, PixelIcon } from "@/components/pixel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ApiError,
  getUserService,
  isValidUsername,
  sanitizeUsername,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "@/core";
import { type Perfil, randomEmoji, randomUsername, savePerfil } from "@/lib/perfil";

type OnJoin = (perfil: Perfil) => void;

// Pantalla de entrada del jugador. Tres vistas:
// - "new": crear jugador nuevo (solo nombre).
// - "returning": volver a entrar con nombre + código de acceso.
// - código recién creado: se muestra una vez tras registrarse, antes de jugar.
export function UsernameGate({ onJoin }: { onJoin: OnJoin }) {
  const [mode, setMode] = useState<"new" | "returning">("new");
  const [name, setName] = useState("");
  // Jugador recién registrado: se le muestra su código antes de entrar.
  const [registered, setRegistered] = useState<Perfil | null>(null);

  const goToLogin = (prefillName?: string) => {
    if (prefillName !== undefined) setName(prefillName);
    setMode("returning");
  };

  let content: React.ReactNode;
  let subtitle: string;
  if (registered) {
    subtitle = `¡Listo, ${registered.name}!`;
    content = <ShowCode perfil={registered} onContinue={() => onJoin(registered)} />;
  } else if (mode === "returning") {
    subtitle = "¡Qué bueno verte de nuevo!";
    content = (
      <ReturningPlayerForm
        name={name}
        onNameChange={setName}
        onJoin={onJoin}
        onBack={() => setMode("new")}
      />
    );
  } else {
    subtitle = "¿Cuál es tu nombre de jugador?";
    content = (
      <NewPlayerForm
        name={name}
        onNameChange={setName}
        onRegistered={(perfil) => (perfil.code ? setRegistered(perfil) : onJoin(perfil))}
        onJoin={onJoin}
        onGoToLogin={goToLogin}
      />
    );
  }

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">
      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-12 pt-10">
        <PixelIcon name="book" scale={6} className="animate-px-bob-big" />
        <h1 className="px-title animate-px-pop mt-8 max-w-3xl text-balance text-center text-[1.5rem] leading-snug sm:text-[2.5rem]">
          ¡Bienvenido a BooksQuest!
        </h1>
        <p
          className="animate-px-pop mt-6 flex items-center gap-3 text-center text-xl text-star sm:text-2xl"
          style={{ animationDelay: "0.15s" }}
        >
          <PixelIcon name="sparkle" scale={2} className="shrink-0 text-gold" />
          {subtitle}
        </p>

        {content}
      </main>

      <PixelGround>
        <GroundParade />
      </PixelGround>
    </div>
  );
}

function NewPlayerForm({
  name,
  onNameChange,
  onRegistered,
  onJoin,
  onGoToLogin,
}: {
  name: string;
  onNameChange: (name: string) => void;
  onRegistered: (perfil: Perfil) => void;
  onJoin: OnJoin;
  onGoToLogin: (prefillName?: string) => void;
}) {
  const { mutate: join, isPending: isJoining } = useMutation({
    mutationFn: ({ name }: { name: string; emoji: string }) =>
      getUserService().createUser({ name }),
    // El backend no guarda el emoji: se queda solo en el perfil local.
    onSuccess: (user, { emoji }) => onRegistered(savePerfil({ ...user, emoji })),
    onError: (error, { name, emoji }) => {
      if (error instanceof ApiError && error.status === 409) {
        // Puede ser el mismo niño que ya se registró: lo llevamos a entrar
        // con su código, con el nombre ya escrito.
        toast.info("Ese nombre ya existe. Si eres tú, entra con tu código.");
        onGoToLogin(name);
        return;
      }
      if (error instanceof ApiError && error.status === 400) {
        // No debería pasar (el nombre se valida antes), pero si el backend
        // cambia la regla, no dejamos entrar con un perfil solo local.
        console.error(error);
        toast.error("Ese nombre no es válido, prueba con otro");
        return;
      }
      // El backend puede no estar disponible todavía (o fallar): seguimos
      // dejando jugar con un perfil solo local, sin id de servidor.
      console.error(error);
      toast.error("No pudimos guardarte en el servidor, ¡pero puedes seguir jugando!");
      onJoin(savePerfil({ name, emoji }));
    },
  });

  const isValid = isValidUsername(name);

  const handleJoin = () => {
    if (!isValid || isJoining) return;
    join({ name, emoji: randomEmoji() });
  };

  return (
    <>
      <form
        className="px-frame px-c-deep px-drop animate-px-pop mt-8 w-full max-w-lg"
        style={{ animationDelay: "0.3s" }}
        onSubmit={(e) => {
          e.preventDefault();
          handleJoin();
        }}
      >
        <div className="px-bar [--px-bar-hi:var(--px-cyan-hi)] [--px-bar:var(--px-cyan)]">
          <PixelIcon name="star" scale={2} />
          Nueva partida
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <div className="space-y-2">
            <Input
              value={name}
              onChange={(e) => onNameChange(sanitizeUsername(e.target.value))}
              maxLength={USERNAME_MAX_LENGTH}
              placeholder="Escribe tu nombre..."
              aria-label="Nombre de jugador"
              aria-describedby="username-hint"
              autoComplete="off"
            />
            <UsernameHint name={name} />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              type="button"
              variant="secondary"
              onClick={() => onNameChange(randomUsername())}
              className="flex-1"
            >
              <PixelIcon name="dice" scale={2} />
              ¡Sorpréndeme!
            </Button>
            <Button
              type="submit"
              variant="success"
              disabled={!isValid || isJoining}
              className="flex-1"
            >
              <PixelIcon name="play" scale={2} />
              {isJoining ? "Entrando" : "¡A jugar!"}
            </Button>
          </div>
        </div>
      </form>

      <button
        type="button"
        onClick={() => onGoToLogin()}
        className="animate-px-pop mt-6 text-lg text-star underline underline-offset-4 hover:text-gold"
        style={{ animationDelay: "0.45s" }}
      >
        ¿Ya tienes usuario? Entra con tu código
      </button>
    </>
  );
}

function ReturningPlayerForm({
  name,
  onNameChange,
  onJoin,
  onBack,
}: {
  name: string;
  onNameChange: (name: string) => void;
  onJoin: OnJoin;
  onBack: () => void;
}) {
  const [code, setCode] = useState("");

  const { mutate: login, isPending } = useMutation({
    mutationFn: () => getUserService().loginUser({ name, code }),
    // El emoji no viaja con la cuenta: en un dispositivo nuevo se elige otro.
    onSuccess: (user) => onJoin(savePerfil({ ...user, emoji: randomEmoji() })),
    onError: (error) => {
      if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
        toast.error("Nombre o código incorrecto");
        return;
      }
      console.error(error);
      toast.error("No pudimos conectar con el servidor, inténtalo de nuevo");
    },
  });

  const canSubmit = isValidUsername(name) && !!code.trim() && !isPending;

  return (
    <>
      <form
        className="px-frame px-c-deep px-drop animate-px-pop mt-8 w-full max-w-lg"
        style={{ animationDelay: "0.3s" }}
        onSubmit={(e) => {
          e.preventDefault();
          if (canSubmit) login();
        }}
      >
        <div className="px-bar [--px-bar-hi:var(--px-gold-hi)] [--px-bar:var(--px-gold)]">
          <PixelIcon name="shield" scale={2} />
          Ya tengo usuario
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <Input
            value={name}
            onChange={(e) => onNameChange(sanitizeUsername(e.target.value))}
            maxLength={USERNAME_MAX_LENGTH}
            placeholder="Tu nombre de jugador..."
            aria-label="Nombre de jugador"
            autoComplete="username"
          />
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            maxLength={12}
            placeholder="Tu código (ej. AB12CD)"
            aria-label="Código de acceso"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            className="font-pixel tracking-widest"
          />

          <Button type="submit" variant="success" disabled={!canSubmit} className="w-full">
            <PixelIcon name="play" scale={2} />
            {isPending ? "Entrando..." : "¡Entrar!"}
          </Button>
        </div>
      </form>

      <p className="mt-4 max-w-lg text-center text-lg text-muted-foreground">
        ¿Olvidaste tu código? Pídeselo a tu profe.
      </p>
      <button
        type="button"
        onClick={onBack}
        className="mt-4 text-lg text-star underline underline-offset-4 hover:text-gold"
      >
        ¿Eres nuevo? Crea tu jugador
      </button>
    </>
  );
}

function ShowCode({ perfil, onContinue }: { perfil: Perfil; onContinue: () => void }) {
  const code = perfil.code ?? "";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("¡Código copiado!");
    } catch {
      toast.error("No pudimos copiarlo, anótalo a mano");
    }
  };

  return (
    <div
      className="px-frame px-c-deep px-drop animate-px-pop mt-8 w-full max-w-lg"
      style={{ animationDelay: "0.3s" }}
    >
      <div className="px-bar [--px-bar-hi:var(--px-gold-hi)] [--px-bar:var(--px-gold)]">
        <PixelIcon name="shield" scale={2} />
        Tu código secreto
      </div>

      <div className="space-y-5 p-5 text-center sm:p-6">
        <p className="text-xl">
          Con tu nombre <strong>{perfil.name}</strong> y este código puedes volver a entrar:
        </p>
        <p
          className="px-frame px-c-night select-all py-4 font-pixel text-3xl tracking-[0.3em] text-gold sm:text-4xl"
          aria-label={`Tu código es ${code.split("").join(" ")}`}
        >
          {code}
        </p>
        <p className="text-lg text-muted-foreground">
          ¡Anótalo en tu cuaderno! Si lo olvidas, tu profe puede dártelo.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button type="button" variant="secondary" onClick={copy} className="flex-1">
            Copiar código
          </Button>
          <Button type="button" variant="success" onClick={onContinue} className="flex-1">
            <PixelIcon name="play" scale={2} />
            ¡Ya lo anoté!
          </Button>
        </div>
      </div>
    </div>
  );
}

// Regla del nombre, siempre visible y en tono amable. Los caracteres no
// permitidos ya se corrigen al escribir (ver sanitizeUsername); aquí solo
// queda avisar si falta largo.
function UsernameHint({ name }: { name: string }) {
  const tooShort = name.length > 0 && name.length < USERNAME_MIN_LENGTH;
  return (
    <p
      id="username-hint"
      className={`text-base ${tooShort ? "text-gold" : "text-muted-foreground"}`}
      aria-live="polite"
    >
      {tooShort
        ? `¡Un poquito más largo! Mínimo ${USERNAME_MIN_LENGTH} letras.`
        : `De ${USERNAME_MIN_LENGTH} a ${USERNAME_MAX_LENGTH} letras o números, sin tildes ni espacios (usa _).`}
    </p>
  );
}

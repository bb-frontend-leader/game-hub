import { Toaster as Sonner } from "sonner";

import { PixelIcon } from "@/components/pixel";

type ToasterProps = React.ComponentProps<typeof Sonner>;

// Avisos pixel: sin estilos base de sonner (unstyled) y con los mismos marcos y
// materiales del sistema (verde = éxito, rojo = error, azul = info, naranja = aviso).
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      icons={{
        success: <PixelIcon name="check" scale={2} />,
        error: <PixelIcon name="close" scale={2} />,
        info: <PixelIcon name="info" scale={2} />,
        warning: <PixelIcon name="alert" scale={2} />,
        loading: <PixelIcon name="reset" scale={2} className="animate-px-spin" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "px-frame px-drop flex w-full items-center gap-3 p-3 pr-4 font-body text-lg font-semibold leading-tight",
          default: "px-c-night",
          success: "px-c-green",
          error: "px-c-red",
          info: "px-c-blue",
          warning: "px-c-orange",
          icon: "flex shrink-0 items-center",
          title: "text-lg font-semibold",
          description: "text-base opacity-80",
          actionButton: "px-frame px-btn px-btn--sm px-c-gold",
          cancelButton: "px-frame px-btn px-btn--sm px-c-night",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

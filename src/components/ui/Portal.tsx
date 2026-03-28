import type { ReactNode } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
}

const Portal = ({ children }: PortalProps) => {
  const [container] = useState<HTMLElement | null>(() =>
    typeof document !== "undefined"
      ? document.getElementById("modal-root")
      : null,
  );

  if (!container) return null;
  return createPortal(children, container);
};

export default Portal;

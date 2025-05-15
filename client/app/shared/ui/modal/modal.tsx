import type { ReactElement } from "react";

import { CircleX } from "lucide-react";
import ReactDOM from "react-dom";

import { useClient } from "@/utils/hooks";

import * as style from "./style";

interface ModalProps {
  className?: string;
  children: ReactElement;
  onClose: () => void;
  title?: string;
  isClosing?: boolean;
  isOpen: boolean;
}

const Modal = ({ children, onClose, title, isClosing = true, isOpen, className }: ModalProps) => {
  const isClient = useClient();
  if (!isOpen || !isClient) return <></>;

  return ReactDOM.createPortal(
    <div className={style.overlay()}>
      <div className={style.container()}>
        <div className={style.header()}>
          {title && <h3>{title}</h3>}
          {isClosing && (
            <button onClick={onClose} type="button">
              <CircleX />
            </button>
          )}
        </div>
        <div className={`${className}`}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;

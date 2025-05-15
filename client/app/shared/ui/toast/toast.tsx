import { useEffect } from "react";

import { CircleX } from "lucide-react";
import ReactDOM from "react-dom";

import { useTimeout } from "@/utils/hooks";

import * as style from "./style";

interface ToastProps {
  title: string;
  massage: string;
  onClose: () => void;
  isOpen: boolean;
  closeDelay?: number;
}

const Toast = ({ title, massage, onClose, isOpen, closeDelay = 2000 }: ToastProps) => {
  if (!isOpen) return <></>;

  const timeout = useTimeout();

  useEffect(() => {
    timeout(() => {
      onClose();
    }, closeDelay);
  }, []);

  return ReactDOM.createPortal(
    <div className={style.overlay()}>
      <div className={style.container()}>
        <div className={style.header()}>
          <h3>{title}</h3>
          <button onClick={onClose} type="button" className={style.close()}>
            <CircleX />
          </button>
        </div>
        <strong className={style.msg()}>{massage}</strong>
      </div>
    </div>,
    document.body
  );
};

export default Toast;

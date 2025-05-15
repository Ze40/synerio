import ReCAPTCHA from "react-google-recaptcha";

import Modal from "../../shared/ui/modal/modal";
import * as style from "./style";

interface CaptchaProps {
  className?: string;
  value?: boolean;
  onChange?: (token: string | null) => void;
  siteKey: string;
  isOpen: boolean;
}

const Captcha = ({ className, value, onChange, siteKey, isOpen }: CaptchaProps) => {
  return (
    <Modal isClosing={false} onClose={() => {}} isOpen={isOpen}>
      <ReCAPTCHA sitekey={siteKey} className={style.recaptcha()} onChange={onChange} />
    </Modal>
  );
};

export default Captcha;

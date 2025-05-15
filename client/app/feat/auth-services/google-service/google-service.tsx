import { authService } from "@/feat/auth/services";
import { useClient } from "@/utils/hooks";

import { service, serviceIcon } from "../style";

const GoogleService = () => {
  const isClinet = useClient();
  const handleClick = async () => {
    const res = await authService.oauthByProvider("google");

    if (res && isClinet) {
      window.location.href = res.url;
    }
  };

  return (
    <button type={"button"} className={service()} onClick={handleClick}>
      <img src="/shared/google-logo.svg" alt="google logo" className={serviceIcon()} />
      Google
    </button>
  );
};

export default GoogleService;

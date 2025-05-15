import { authService } from "@/feat/auth/services";
import { useClient } from "@/utils/hooks";

import { service, serviceIcon } from "../style";

const YandexService = () => {
  const isClinet = useClient();
  const handleClick = async () => {
    const res = await authService.oauthByProvider("yandex");

    if (res && isClinet) {
      window.location.href = res.url;
    }
  };
  return (
    <button type={"button"} className={service()} onClick={handleClick}>
      <img src="/shared/yandex-logo.svg" alt="yandex logo" className={serviceIcon()} />
      Yandex
    </button>
  );
};

export default YandexService;

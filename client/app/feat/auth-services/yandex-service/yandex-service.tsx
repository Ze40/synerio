import { service, serviceIcon } from "../style";

const YandexService = () => {
  return (
    <button type={"button"} className={service()}>
      <img src="/shared/yandex-logo.svg" alt="yandex logo" className={serviceIcon()} />
      Yandex
    </button>
  );
};

export default YandexService;

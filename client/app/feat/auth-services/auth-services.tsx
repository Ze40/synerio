import GoogleService from "./google-service/google-service";
import * as style from "./style";
import YandexService from "./yandex-service/yandex-service";

const AuthServices = () => {
  return (
    <div className={style.container()}>
      <GoogleService />
      <YandexService />
    </div>
  );
};

export default AuthServices;

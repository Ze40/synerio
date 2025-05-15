import GoogleService from "./google-service/google-service";
import * as style from "./style";
import YandexService from "./yandex-service/yandex-service";

interface AuthServicesProps {
  className?: string;
}

const OAuthServices = ({ className }: AuthServicesProps) => {
  return (
    <div className={`${style.container()} ${className}`}>
      <GoogleService />
      <YandexService />
    </div>
  );
};

export default OAuthServices;

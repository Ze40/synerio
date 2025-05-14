import { service, serviceIcon } from "../style";

const GoogleService = () => {
  return (
    <button type={"button"} className={service()}>
      <img src="/shared/google-logo.svg" alt="google logo" className={serviceIcon()} />
      Google
    </button>
  );
};

export default GoogleService;

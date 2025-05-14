import { useEffect, useState } from "react";

export const useClient = (): boolean => {
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

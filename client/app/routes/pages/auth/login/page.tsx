import { useFetcher } from "react-router";
import { css } from "styled-system/css";

import { AuthWrapper } from "@/shared/ui";

const LoginPage = () => {
  const { Form } = useFetcher();
  return (
    <AuthWrapper type="login">
      <Form></Form>
    </AuthWrapper>
  );
};

export default LoginPage;

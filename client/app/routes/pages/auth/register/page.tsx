import { useFetcher } from "react-router";
import { css } from "styled-system/css";

import { AuthWrapper } from "@/shared/ui";

const RegisterPage = () => {
  const { Form } = useFetcher();
  return (
    <AuthWrapper type="register">
      <Form></Form>
    </AuthWrapper>
  );
};

export default RegisterPage;

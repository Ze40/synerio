/* eslint-disable prettier/prettier */
import { Body, Heading, Html, Link, Text } from "@react-email/components";
import * as React from "react"

interface ConfirmationTemplateProps {
  domain: string;
  token: string;
}

const ConfirmationTemplate = ({ domain, token }: ConfirmationTemplateProps) => {
  const confirmLink = `${domain}/auth/verify?token=${token}`;

  return (
    <Html>
        <Body>
            <Heading>Подтверждение почты</Heading>
            <Text>
                Здравствуйте! Чтобы подтвердить свой адресс электронной почты, пожалуйста, перейдите по следующей ссылке
            </Text>
            <Link href={confirmLink}>Подтвердить почту</Link>
        </Body>
    </Html>
  )
};

export default ConfirmationTemplate;

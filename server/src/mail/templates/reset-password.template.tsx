/* eslint-disable prettier/prettier */
import { Body, Heading, Html, Link, Text } from '@react-email/components';
import * as React from 'react';

interface ResetPasswordTemplateProps {
  domain: string;
  token: string;
}

const ResetPasswordTemplate = ({
  domain,
  token,
}: ResetPasswordTemplateProps) => {
  const confirmLink = `${domain}/auth/new-password?token=${token}`;

  return (
        <Html>
            <Body>
                <Heading>Сброс пароля</Heading>
                <Text>
                    Здравствуйте! Чтобы подтвердить сброс пароля и установить новый перейдите по ссылке:
                </Text>
                <Link href={confirmLink}>Подтвердить почту</Link>
            </Body>
        </Html>
  )
};

export default ResetPasswordTemplate;

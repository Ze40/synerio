/* eslint-disable prettier/prettier */
import { Body, Heading, Html, Text } from '@react-email/components';
import * as React from 'react';

interface TwoFactorTemplateProps {
  token: string;
}

const TwoFactorTemplate = ({
  token,
}: TwoFactorTemplateProps) => {

  return (
        <Html>
            <Body>
                <Heading>Подтверждение личности</Heading>
                <Text>
                    Здравствуйте! Ваш код для подтверждения личности: <strong>{token}</strong>
                </Text>
                <Text>Данный код действует 15 минут, по истечению срока запросите новый</Text>
            </Body>
        </Html>
  )
};

export default TwoFactorTemplate;

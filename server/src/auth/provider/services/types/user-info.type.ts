export type TypeUserInfo = {
  id: string;
  picture: string;
  firstName: string;
  lastName: string;
  email: string;
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
  provider: string;
};

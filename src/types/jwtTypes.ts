export interface JwtPayload {
  id: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
}

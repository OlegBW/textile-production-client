export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignUpCredentials = {
  email: string;
  password: string;
  username: string;
};

export type User = {
  email: string;
  id: number;
  username: string;
  role: string;
};

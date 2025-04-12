export type UserSave = {
  login: string;
  password: string;
  isLogined: boolean;
};

export const userState: Record<string, UserSave> = {};

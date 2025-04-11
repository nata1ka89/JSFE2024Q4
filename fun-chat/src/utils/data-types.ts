export type UserLog = {
  id: string;
  type: string;
  payload: {
    user: {
      login: string;
      password: string;
    };
  };
};
export type UserLogResponse = {
  id: string;
  type: string;
  payload: {
    user: {
      login: string;
      isLogined: string;
    };
  };
};
export type UserErrorResponse = {
  id: string;
  type: string;
  payload: {
    error: string;
  };
};

export type UserData = {
  login: string;
  password: string;
  isLogined: boolean;
};

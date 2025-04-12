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
      isLogined: boolean;
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

export type UsersAllResponse = {
  id: string,
  type: string,
  payload: {
    users: [],
  }
}

export type UsersActive = {
  id: string,
  type: "USER_ACTIVE",
  payload: null
}

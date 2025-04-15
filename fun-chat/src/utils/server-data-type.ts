export enum Type {
  USER_LOGIN = 'USER_LOGIN',
  USER_LOGOUT = 'USER_LOGOUT',
  ERROR = 'ERROR',
  USER_EXTERNAL_LOGIN = 'USER_EXTERNAL_LOGIN',
  USER_EXTERNAL_LOGOUT = 'USER_EXTERNAL_LOGOUT',
  USER_ACTIVE = 'USER_ACTIVE',
  USER_INACTIVE = 'USER_INACTIVE',
  MSG_SEND = 'MSG_SEND',
  MSG_FROM_USER = 'MSG_FROM_USER',
}

export type User = {
  login: string;
  isLogined: boolean;
};

export type Message = {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: {
    isDelivered: boolean;
    isReaded: boolean;
    isEdited: boolean;
  };
};
export type UserRequest = {
  id: string;
  type: Type.USER_LOGIN | Type.USER_LOGOUT;
  payload: {
    user: {
      login: string;
      password: string;
    };
  };
};

export type UserResponse = {
  id: string;
  type: Type.USER_LOGIN | Type.USER_LOGOUT | Type.USER_EXTERNAL_LOGIN | Type.USER_EXTERNAL_LOGOUT;
  payload: {
    user: User;
  };
};

export type UserErrorResponse = {
  id: string;
  type: Type.ERROR;
  payload: {
    error: string;
  };
};

export type AllUsersRequest = {
  id: string;
  type: Type.USER_ACTIVE | Type.USER_INACTIVE;
  payload: null;
};

export type AllUsersResponse = {
  id: string;
  type: Type.USER_ACTIVE | Type.USER_INACTIVE;
  payload: {
    users: User[];
  };
};

export type MessageSendRequest = {
  id: string;
  type: Type.MSG_SEND;
  payload: {
    message: {
      to: string;
      text: string;
    };
  };
};

export type MessageSendResponse = {
  id: string;
  type: Type.MSG_SEND;
  payload: {
    message: {
      id: string;
      from: string;
      to: string;
      text: string;
      datetime: number;
      status: {
        isDelivered: boolean;
        isReaded: boolean;
        isEdited: boolean;
      };
    };
  };
};

export type MessageFromUserRequest = {
  id: string;
  type: Type.MSG_FROM_USER;
  payload: {
    user: {
      login: string;
    };
  };
};

export type MessageFromUserResponse = {
  id: string;
  type: Type.MSG_FROM_USER;
  payload: {
    messages: Message[];
  };
};

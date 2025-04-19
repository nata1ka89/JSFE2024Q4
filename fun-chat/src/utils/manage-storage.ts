export type UserData = {
  id: string | null;
  login: string | null;
  password: string | null;
  userTo: string | null;
  userToStatus: string | null;
};

export function getDataSessionStorage(): UserData {
  return {
    id: sessionStorage.getItem('currentUserId'),
    login: sessionStorage.getItem('currentUserLogin'),
    password: sessionStorage.getItem('currentUserPassword'),
    userTo: sessionStorage.getItem('currentUserTo'),
    userToStatus: sessionStorage.getItem('currentUserToStatus'),
  };
}
export function removeDataSessionStorage(): void {
  sessionStorage.removeItem('currentUserId');
  sessionStorage.removeItem('currentUserLogin');
  sessionStorage.removeItem('currentUserPassword');
  sessionStorage.removeItem('currentUserTo');
  sessionStorage.removeItem('currentUserToStatus');
}

export function setDataSessionStorage(
  id: string,
  login: string,
  password: string,
  userTo: string,
  userToStatus: string
): void {
  if (id && login && password && userTo) {
    sessionStorage.setItem('currentUserId', id);
    sessionStorage.setItem('currentUserLogin', login);
    sessionStorage.setItem('currentUserPassword', password);
    sessionStorage.setItem('currentUserTo', userTo);
    sessionStorage.setItem('currentUserToStatus', userToStatus);
  }
}

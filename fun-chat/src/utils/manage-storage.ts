export type UserData = {
  id: string | null;
  login: string | null;
  password: string | null;
};

export function getDataSessionStorage(): UserData {
  return {
    id: sessionStorage.getItem('currentUserId'),
    login: sessionStorage.getItem('currentUserLogin'),
    password: sessionStorage.getItem('currentUserPassword'),
  };
}
export function removeDataSessionStorage(): void {
  sessionStorage.removeItem('currentUserId');
  sessionStorage.removeItem('currentUserLogin');
  sessionStorage.removeItem('currentUserPassword');
}

export function setDataSessionStorage(id: string, login: string, password: string): void {
  if (id && login && password) {
    sessionStorage.setItem('currentUserId', id);
    sessionStorage.setItem('currentUserLogin', login);
    sessionStorage.setItem('currentUserPassword', password);
  }
}

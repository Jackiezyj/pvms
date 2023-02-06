export interface UserList {
  employeeID: string;
  name: string;
  isAuthentication: boolean;
}

//初始状态
export const initCount = 0;   //state

export const USERAll: UserList[] = [
]

export interface AppState {
  todos: UserList;
}

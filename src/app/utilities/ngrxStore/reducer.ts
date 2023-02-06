import { Action } from '@ngrx/store';

import { USERAll, initCount } from './state';


// reducer定义了action被派发时state的具体改变方式
// export function counterReducer(state: number = initCount, action: Action) {

//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1;

//     case 'DECREMENT':
//       return state - 1;

//     case 'RESET':
//       return 0;

//     default:
//       return state;
//   }
// }

// reducer定义了action被派发时state的具体改变方式

export const todoReducer = (state = USERAll, action:any) => {
  switch (action.type) {
    case 'ADDSTATE':
      const {employeeID,name} = action.payload;
      return [...state, {
        employeeID,
        name,
        isAuthentication: true,
      }];
    case 'UPDATESTATE':
      return state.map(todo =>
        (todo.employeeID === action.payload.employeeID)
          ? { ...todo,employeeID:action.payload.employeeID,name: action.payload.name,isAuthentication: !todo.isAuthentication }
          : todo
      )
    default:
      return state;
  }
}

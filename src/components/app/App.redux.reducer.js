// import { ADD_TODO, FETCH_TASKS, FETCH_TASKS_ERROR } from "../../redux/actionTypes";

// let toDoInitialState = { allIds: [], byIds: {} }

// export const toDoReducer = (state = toDoInitialState, action) => {
//     switch (action.type) {
//         case ADD_TODO:
//             const { id, content } = action.payload;
//             return {
//                 ...state,
//                 allIds: [...state.allIds, id],
//                 byIds: {
//                     ...state.byIds,
//                     [id]: {
//                         id,
//                         content,
//                         completed: false
//                     }
//                 }
//             };
//         default:
//             return toDoInitialState
//     }
// }
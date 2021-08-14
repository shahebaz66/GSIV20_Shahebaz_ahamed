import { ADD_INIT_DATA, UPDATE_DATA, CHANGE_PAGE } from "../actions/types";
const initState = {
  page: 0,
  totalPages: 500,
  loader: true,
  availablePages: [],
  movies: [],
};
export default function termsReducer(state = initState, action) {
  switch (action.type) {
    case ADD_INIT_DATA:
      state.availablePages.push(action.payload.page);
      state.movies.push({
        page: action.payload.page,
        list: action.payload.results,
      });
      return {
        ...state,
        page: 1,
        loader: false,
      };
    case UPDATE_DATA:
      state.availablePages.push(action.payload.page);
      state.movies.push({
        page: action.payload.page,
        list: action.payload.results,
      });
      return {
        ...state,
        page: action.payload.page,
      };
      case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
}

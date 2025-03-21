import uniqBy from 'lodash.uniqby';
import {
  SET_SELECTED_ROWS,
  DELETE_ROW,
  ADD_ROW,
  CLEAR_SELECTION,
  CLEAR_PAGE_SELECTION,
  SET_SELECT_ALL_ROWS_ALL_PAGES,
  TOGGLE_IS_ENTIRE_TABLE_SELECTED,
  SET_IS_ENTIRE_TABLE_SELECTED,
} from './actions';

export const initialState = {
  selectedRows: [],
  isEntireTableSelected: false,
};

const selectionsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_ROWS: {
      const selectedRows = uniqBy([...state.selectedRows, ...action.rows], row => row.id);
      const updatedState = {
        ...state,
        selectedRows,
      };
      if (action.options?.shouldUpdateIsEntireTableSelected) {
        if (selectedRows.length === action.itemCount) {
          updatedState.isEntireTableSelected = true;
        } else {
          updatedState.isEntireTableSelected = false;
        }
      }
      return updatedState;
    }
    case SET_SELECT_ALL_ROWS_ALL_PAGES:
      return {
        ...state,
        isEntireTableSelected: true,
      };
    case DELETE_ROW:
      return {
        selectedRows: state.selectedRows.filter((row) => row.id !== action.rowId),
        isEntireTableSelected: false,
      };
    case ADD_ROW: {
      const selectedRows = uniqBy([...state.selectedRows, action.row], row => row.id);
      const isEntireTableSelected = selectedRows.length === action.itemCount;
      return {
        ...state,
        selectedRows,
        isEntireTableSelected,
      };
    }
    case CLEAR_SELECTION:
      return initialState;
    case CLEAR_PAGE_SELECTION:
      return {
        isEntireTableSelected: false,
        selectedRows: state.selectedRows.filter(row => !action.rowIds.includes(row.id)),
      };
    case TOGGLE_IS_ENTIRE_TABLE_SELECTED:
      return {
        ...state,
        isEntireTableSelected: !state.isEntireTableSelected,
      };
    case SET_IS_ENTIRE_TABLE_SELECTED:
      return {
        ...state,
        isEntireTableSelected: action.isEntireTableSelected,
      };
    default:
      return state;
  }
};

export default selectionsReducer;

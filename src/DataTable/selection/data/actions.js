export const SET_SELECT_ALL_ROWS_ALL_PAGES = 'SELECT ALL ROWS ALL PAGES';
export const setSelectAllRowsAllPagesAction = () => ({
  type: SET_SELECT_ALL_ROWS_ALL_PAGES,
});

export const SET_SELECTED_ROWS = 'SET SELECTED ROWS';
export const setSelectedRowsAction = (rows, itemCount) => ({
  type: SET_SELECTED_ROWS,
  rows,
  itemCount,
});

export const DELETE_ROW = 'DELETE ROW';
export const deleteSelectedRowAction = (rowId) => ({
  type: DELETE_ROW,
  rowId,
});

export const ADD_ROW = 'ADD ROW';
export const addSelectedRowAction = (row, itemCount) => ({
  type: ADD_ROW,
  row,
  itemCount,
});

export const CLEAR_SELECTION = 'CLEAR SELECTION';
export const clearSelectionAction = () => ({
  type: CLEAR_SELECTION,
});

export const CLEAR_PAGE_SELECTION = 'CLEAR PAGE SELECTION';
export const clearPageSelectionAction = (rowIds) => ({
  type: CLEAR_PAGE_SELECTION,
  rowIds,
});

export const TOGGLE_IS_ENTIRE_TABLE_SELECTED = 'TOGGLE IS ENTIRE TABLE SELECTED';
export const toggleIsEntireTableSelected = () => ({
  type: TOGGLE_IS_ENTIRE_TABLE_SELECTED,
});

export const SET_IS_ENTIRE_TABLE_SELECTED = 'SET IS ENTIRE TABLE SELECTED';
export const setIsEntireTableSelected = (isEntireTableSelected) => ({
  type: SET_IS_ENTIRE_TABLE_SELECTED,
  isEntireTableSelected,
});

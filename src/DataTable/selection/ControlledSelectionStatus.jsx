import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';

import DataTableContext from '../DataTableContext';
import BaseSelectionStatus from './BaseSelectionStatus';

import {
  clearSelectionAction,
  setSelectAllRowsAllPagesAction,
  setSelectedRowsAction,
} from './data/actions';
import {
  getUnselectedPageRows,
  getRowIds,
} from './data/helpers';

function ControlledSelectionStatus({ className, clearSelectionText }) {
  const {
    itemCount,
    page,
    controlledTableSelections: [{ selectedRows, isSelectAllEnabled, isEntireTableSelected }, dispatch],
  } = useContext(DataTableContext);
  console.log(useContext(DataTableContext))
  console.log(isSelectAllEnabled, itemCount > selectedRows.length, isEntireTableSelected)
  useEffect(
    () => {
      if ((isSelectAllEnabled) && itemCount > selectedRows.length) {
        const selectedRowIds = getRowIds(selectedRows);
        const unselectedPageRows = getUnselectedPageRows(selectedRowIds, page);
        if (unselectedPageRows.length) {
          dispatch(setSelectedRowsAction(unselectedPageRows, itemCount));
          dispatch(setSelectAllRowsAllPagesAction());
        }
      }
    },
    [selectedRows, itemCount, page, dispatch, isSelectAllEnabled],
  );
  console.log(itemCount, selectedRows.length, selectedRows, 'itemCount, selectedRows.length, selectedRows', 'controlledselectionstatus')
  const numSelectedRows = itemCount === selectedRows.length || isSelectAllEnabled ? itemCount : selectedRows.length;
  const numSelectedRowsOnPage = (page || []).filter(r => r.isSelected).length;
  console.log(numSelectedRowsOnPage, numSelectedRows, page, 'numSelectedRowsOnPage, numSelectedRows, page', 'controlledselectionstatus')
  const selectionStatusProps = {
    className,
    numSelectedRows,
    numSelectedRowsOnPage,
    clearSelectionText,
    onSelectAll: () => dispatch(setSelectAllRowsAllPagesAction()),
    onClear: () => dispatch(clearSelectionAction()),
  };
  return <BaseSelectionStatus {...selectionStatusProps} />;
}

ControlledSelectionStatus.defaultProps = {
  className: undefined,
  clearSelectionText: undefined,
};

ControlledSelectionStatus.propTypes = {
  /** A class name to append to the base element */
  className: PropTypes.string,
  /** A text that appears on the `Clear selection` button, defaults to 'Clear Selection' */
  clearSelectionText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default ControlledSelectionStatus;

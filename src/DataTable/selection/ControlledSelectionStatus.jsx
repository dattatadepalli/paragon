import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import DataTableContext from '../DataTableContext';
import BaseSelectionStatus from './BaseSelectionStatus';

import {
  clearSelectionAction,
  setSelectAllRowsAllPagesAction,
  setSelectedRowsAction,
  toggleIsEntireTableSelected,
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
  useEffect(
    () => {
      if (isSelectAllEnabled && itemCount > selectedRows.length) {
        const selectedRowIds = getRowIds(selectedRows);
        const unselectedPageRows = getUnselectedPageRows(selectedRowIds, page);
        if (unselectedPageRows.length) {
          dispatch(setSelectedRowsAction(unselectedPageRows, itemCount));
        }
      }
    },
    [selectedRows, itemCount, page, dispatch, isSelectAllEnabled, isEntireTableSelected],
  );

  useEffect(() => {
    if (isSelectAllEnabled && !isEntireTableSelected) {
      dispatch(toggleIsEntireTableSelected());
    }
  }, [dispatch, isEntireTableSelected, isSelectAllEnabled]);

  const numSelectedRows = itemCount === selectedRows.length || isSelectAllEnabled ? itemCount : selectedRows.length;
  const numSelectedRowsOnPage = (page || []).filter(r => r.isSelected).length;
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

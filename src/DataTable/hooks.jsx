import { useContext, useEffect, useState } from 'react';
import DataTableContext from './DataTableContext';
import { clearSelectionAction, setIsEntireTableSelected, setSelectedRowsAction } from './selection/data/actions';
import { getRowIds, getUnselectedPageRows } from './selection/data/helpers';

export const useRows = () => {
  const {
    getTableProps, prepareRow, page, rows, headerGroups, getTableBodyProps,
  } = useContext(DataTableContext);

  const displayRows = page || rows;

  return {
    getTableProps, prepareRow, displayRows, headerGroups, getTableBodyProps,
  };
};

/**
 * Hook that provides selection state functionality
 * @param {Object} param0 Table instance
 * @param {Array} controlledTableSelections Selection Object and dispatch function
 * @returns
 */
export const useSelectionActions = (
  { toggleAllRowsSelected },
  controlledTableSelections,
) => {
  const [{ selectedRows, isEntireTableSelected }, dispatch] = controlledTableSelections;

  const clearSelection = () => {
    // if using controlled selection component DataTable.ControlledSelectionStatus
    if (selectedRows.length > 0 || isEntireTableSelected) {
      dispatch(clearSelectionAction());
    } else {
      toggleAllRowsSelected(false);
    }
  };

  return {
    clearSelection,
  };
};

export const useDataTableControlledSelections = ({
  selections,
  selectionsDispatch,
  selectedRows,
  itemCount,
  page,
  filters,
}) => {
  const [originalItemCount, setOriginalItemCount] = useState(itemCount);
  const [originalFilters, setOriginalFilters] = useState(filters);

  // Keep a reference to the original item count, derived from the itemCount prop
  useEffect(() => {
    if (originalItemCount !== itemCount) {
      setOriginalItemCount(itemCount);
    }
  }, [originalItemCount, itemCount]);

  // Keep a reference to the original item count, derived from the table instance.state.filters
  useEffect(() => {
    if (JSON.stringify(originalFilters) !== JSON.stringify(filters)) {
      setOriginalFilters(filters);
    }
  }, [originalFilters, filters]);

  // If the item count or filters change, reset the entire table selection state but keep the selected rows
  useEffect(() => {
    if (!selections.isEntireTableSelected) {
      return;
    }
    const hasItemCountChanged = originalItemCount !== itemCount;
    const hasFiltersChanged = JSON.stringify(originalFilters) !== JSON.stringify(filters);

    if (hasItemCountChanged || hasFiltersChanged) {
      selectionsDispatch(setIsEntireTableSelected(false));
    }
  }, [
    selections.isEntireTableSelected,
    originalItemCount,
    itemCount,
    originalFilters,
    filters,
    selectionsDispatch,
  ]);

  // If the selected rows length is greater than the item count, set isEntireTableSelected to true
  useEffect(() => {
    if (selectedRows.length > itemCount) {
      selectionsDispatch(setIsEntireTableSelected(true));
    }
  }, [itemCount, selectedRows, selectionsDispatch]);

  // If the entire table is selected, ensure that all rows on the current page are selected
  useEffect(
    () => {
      if (!selections.isEntireTableSelected || selectedRows.length >= itemCount) {
        return;
      }
      const selectedRowIds = getRowIds(selectedRows);
      const unselectedPageRows = getUnselectedPageRows(selectedRowIds, page);
      if (unselectedPageRows.length) {
        selectionsDispatch(
          setSelectedRowsAction(
            unselectedPageRows,
            itemCount,
            { shouldUpdateEntireTableSelected: false },
          ),
        );
      }
    },
    [
      selectedRows,
      itemCount,
      page,
      selectionsDispatch,
      selections.isEntireTableSelected,
    ],
  );
};

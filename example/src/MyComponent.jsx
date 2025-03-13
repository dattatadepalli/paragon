import { useCallback, useState } from 'react';
import { Container, DataTable, TextFilter } from '@openedx/paragon'; // eslint-disable-line
import debounce from 'lodash.debounce';

const DEFAULT_PAGE_SIZE = 3;
const DATA = [
  {
    id: '2baf70d1-42bb-4437-b551-e5fed5a87abe',
    title: 'Castle in the Sky',
    director: 'Hayao Miyazaki',
    producer: 'Isao Takahata',
    release_date: 1986,
    rt_score: 95,
  }, {
    id: '12cfb892-aac0-4c5b-94af-521852e46d6a',
    title: 'Grave of the Fireflies',
    director: 'Isao Takahata',
    producer: 'Toru Hara',
    release_date: 1988,
    rt_score: 97,
  },
  {
    id: '58611129-2dbc-4a81-a72f-77ddfc1b1b49',
    title: 'My Neighbor Totoro',
    director: 'Hayao Miyazaki',
    producer: 'Hayao Miyazaki',
    release_date: 1988,
    rt_score: 93,
  },
  {
    id: 'ea660b10-85c4-4ae3-8a5f-41cea3648e3e',
    title: 'Kiki\'s Delivery Service',
    director: 'Hayao Miyazaki',
    producer: 'Hayao Miyazaki',
    release_date: 1989,
    rt_score: 96,
  },
  {
    id: '4e236f34-b981-41c3-8c65-f8c9000b94e7',
    title: 'Only Yesterday',
    director: 'Isao Takahata',
    producer: 'Toshio Suzuki',
    release_date: 1991,
    rt_score: 100,
  },
  {
    id: 'ebbb6b7c-945c-41ee-a792-de0e43191bd8',
    title: 'Porco Rosso',
    director: 'Hayao Miyazaki',
    producer: 'Toshio Suzuki',
    release_date: 1992,
    rt_score: 94,
  },
  {
    id: '1b67aa9a-2e4a-45af-ac98-64d6ad15b16c',
    title: 'Pom Poko',
    director: 'Isao Takahata',
    producer: 'Toshio Suzuki',
    release_date: 1994,
    rt_score: 78,
  },
];

function paginateData(data, pageSize = DEFAULT_PAGE_SIZE) {
  if (pageSize <= 0) {
    throw new Error("Invalid page size");
  }
  const pages = [];
  for (let i = 0; i < data.length; i += pageSize) {
    pages.push(data.slice(i, i + pageSize));
  }
  return pages;
}

function filterData(data, filters) {
  return data.filter((item) => filters.every(filter => (
    String(item[filter.id]).toLowerCase().includes(String(filter.value).toLowerCase())
  )));
}

const useDebouncedFetchData = (setData, setTotalItems, setTotalPages) => useCallback(
  debounce((args) => {
    if (!args) return;
    
    setTimeout(() => {
      // Filter the data based on the current filters
      const filteredData = filterData(DATA, args.filters);

      // Paginate the filtered data
      const paginatedData = paginateData(filteredData, args.pageSize);
      const currentPageData = paginatedData[args.pageIndex] || [];

      // Update the state with the paginated data, total items, and total pages
      setData(currentPageData);
      setTotalItems(filteredData.length);
      setTotalPages(paginatedData.length);
    }, 1000);
  }, 300),
  []
);

const PAGINATED_DATA = paginateData(DATA);

const selectColumn = {
  id: 'selection',
  Header: DataTable.ControlledSelectHeader,
  Cell: DataTable.ControlledSelect,
  disableSortBy: true,
};

function MyComponent() {
  const [data, setData] = useState(PAGINATED_DATA[0]);
  const [totalItems, setTotalItems] = useState(DATA.length);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = useDebouncedFetchData(setData, setTotalItems, setTotalPages);

  return (
    <Container className="p-5">
      <DataTable
        isSelectable
        manualSelectColumn={selectColumn}
        SelectionStatusComponent={DataTable.ControlledSelectionStatus}
        isFilterable
        manualFilters
        defaultColumnValues={{ Filter: TextFilter }}
        isPaginated
        manualPagination
        initialState={{
          pageSize: 3,
          pageIndex: 0,
        }}
        initialTableOptions={{
          getRowId: row => row.id,
        }}
        itemCount={totalItems}
        pageCount={totalPages}
        fetchData={fetchData}
        data={data}
        columns={[
          {
            Header: 'Title',
            accessor: 'title',
          },
          {
            Header: 'Director',
            accessor: 'director',
          },
          {
            Header: 'Release date',
            accessor: 'release_date',
          },
        ]}
      />
    </Container>
  );
}

export default MyComponent;

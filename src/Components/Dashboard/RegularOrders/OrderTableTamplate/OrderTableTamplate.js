import React, { useMemo } from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter, useAsyncDebounce } from 'react-table';
import { Button, InputGroup, Table } from 'react-bootstrap';
import './OrderTableTamplate.css'

const OrderTableTamplate = ({ tdRows, thRow, handleChange }) => {

    // console.log(statusChange)
    const data = useMemo(() => tdRows, [handleChange])
    const columns = useMemo(() => thRow, [handleChange])
    // console.log('This is data for table', data);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        pageOptions,
        page,
        state: { pageIndex, pageSize, globalFilter },
        gotoPage,
        pageCount,
        previousPage,
        nextPage,
        setPageSize,
        canPreviousPage,
        canNextPage,

        setGlobalFilter
    } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination)


    const handleChangeSearchInput = useAsyncDebounce((e) => {
        // console.log(e.target.value)
        setGlobalFilter(e.target.value);
    }, 1000)

    return (
        <div>
            <InputGroup className="mb-3 float-right searchSection">
                <input type="text" className="searchInput form-control" defaultValue={globalFilter || ""} placeholder={`Search...`} onChange={handleChangeSearchInput} />
                <Button variant="outline-secondary" className="searchButton" onClick={handleChangeSearchInput}>
                    Search
                </Button>
            </InputGroup>
            {
                (data.length > 0) && <>
                    <Table {...getTableProps()} striped bordered hover className="mt-3 shadow" responsive>
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        // <th {...column.getHeaderProps()} >
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render('Header')}
                                            <span>
                                                {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row, i) => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>

                    {/* Pagination */}

                    <div className="pagination p-3 shadow d-flex flex-wrap">
                        <div className="paginationButtons">
                            <button className="mr-2" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                                {'<<'}
                            </button>{' '}
                            <button className="mr-2" onClick={() => previousPage()} disabled={!canPreviousPage}>
                                {'<'}
                            </button>{' '}
                            <button className="mr-2" onClick={() => nextPage()} disabled={!canNextPage}>
                                {'>'}
                            </button>{' '}
                            <button className="mr-2" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                                {'>>'}
                            </button>{' '}
                        </div>
                        <span className="mr-2" >
                            Page{' '}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{' '}
                        </span>
                        <span className="mr-2">
                            | Go to page:{' '}
                            <input
                                type="number"
                                defaultValue={pageIndex + 1}
                                onChange={e => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                                    gotoPage(page)
                                }}
                                style={{ width: '100px' }}
                            />
                        </span>{' '}
                        <select
                            value={pageSize}
                            onChange={e => {
                                setPageSize(Number(e.target.value))
                            }}
                        >
                            {[5, 10, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                </>
            }

        </div>
    );
};

export default OrderTableTamplate;
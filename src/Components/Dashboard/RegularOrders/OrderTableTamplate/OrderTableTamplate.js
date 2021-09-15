import React, { useEffect, useMemo, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useTable, useSortBy, usePagination, } from 'react-table';

const OrderTableTamplate = ({ tdRows, thRow, handleChange }) => {

    // console.log(statusChange)
    const data = useMemo(() => tdRows, [handleChange])
    const columns = useMemo(() => thRow, [handleChange])
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        pageOptions,
        page,
        state: { pageIndex, pageSize },
        gotoPage,
        pageCount,
        previousPage,
        nextPage,
        setPageSize,
        canPreviousPage,
        canNextPage,
    } = useTable({ columns, data }, useSortBy, usePagination)

    return (
        <div>
            {
                (data.length > 0) && <>
                    <Table {...getTableProps()} striped bordered hover className="mt-3 shadow">
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
                            {[10, 20, 30, 40, 50].map(pageSize => (
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
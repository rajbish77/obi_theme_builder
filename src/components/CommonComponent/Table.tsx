import React from "react";
import { Table } from "react-bootstrap"
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    SortingState,
    PaginationState,
    useReactTable
} from "@tanstack/react-table"
import { faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { REGEX_NUMERIC} from "../../config/commonConstan 

interface CustomTableProps {
    data: any[];
    columns: any[];
    noDataMessage?: string;
    tableClassName?: string;
    showPaginationControls?: boolean;
}

export const CustomTable: React.FC<CustomTableProps> = ({
    data,
    columns,
    noDataMessage = "",
    tableClassName = "myTable",
    showPaginationControls = true,
}) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: false,
    })

    return (
        <>
            {showPaginationControls &&
                <div className="flex items-center gap-2 my-2">
                    {"Show"}{" "}
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            table.setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            }
            <Table striped bordered hover responsive size="sm" className={tableClassName}>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder ? null : (
                                        <div
                                            {...{
                                                className: header.column.getCanSort()
                                                    ? "cursor-pointer select-none"
                                                    : "",
                                                onClick: header.column.getToggleSortingHandler()
                                            }}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {{
                                                asc: " ▲",
                                                desc: " ▼"
                                            }[header.column.getIsSorted() as string ] ?? null}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getPageCount() === 0 ?
                        <tr>
                            <td className="text-center" colSpan={table.getAllFlatColumns().length}>{noDataMessage}</td>
                        </tr>
                        :
                        table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            {showPaginationControls &&
                table.getPageCount() !== 0 ?
                <>
                    <div className="flex items-center gap-2">
                        <div className="row">
                            <div className="col-md-6 my-3 my-md-0 d-flex justify-content-start">
                                <span className="flex items-center gap-1 mt-1">
                                    <span>Page</span>
                                    <strong>
                                        {table.getState().pagination.pageIndex + 1} of{' '}
                                        {table.getPageCount()}
                                    </strong>
                                </span>
                                <span className="flex items-center gap-1">
                                    &nbsp;| Go to page{' '}
                                    <input
                                        type="text"
                                        max={table.getPageCount()}
                                        min={table.getState().pagination.pageIndex + 1}
                                        defaultValue={table.getState().pagination.pageIndex + 1}
                                        onChange={e => {
                                            // e.target.value = e.target.value?.replace(REGEX_NUMERIC, "");
                                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                                            table.setPageIndex(page)
                                        }}
                                        className="border p-1 rounded w-16"
                                        style={{ width: "70px" }}
                                    />
                                </span>
                            </div>
                            <div className="col-md-6 d-flex justify-content-end">
                                <button
                                    className="border mx-1"
                                    onClick={() => table.setPageIndex(0)}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    {<FontAwesomeIcon
                                        className="ms/1 icon-color"
                                        icon={faAngleDoubleLeft}
                                        size="sm"
                                    />}
                                </button>
                                <button
                                    className="border  mx-1"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    {<FontAwesomeIcon
                                        className="ms/1 icon-color"
                                        icon={faAngleLeft}
                                        size="sm"
                                    />}
                                </button>
                                <button
                                    className="border  mx-1"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                >
                                    {<FontAwesomeIcon
                                        className="ms/1 icon-color"
                                        icon={faAngleRight}
                                        size="sm"
                                    />}
                                </button>
                                <button
                                    className="border mx-1"
                                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                    disabled={!table.getCanNextPage()}
                                >
                                    {<FontAwesomeIcon
                                        className="ms/1 icon-color"
                                        icon={faAngleDoubleRight}
                                        size="sm"
                                    />}
                                </button>
                            </div>
                        </div>
                    </div>
                </> : null
            }
        </>
    );
}
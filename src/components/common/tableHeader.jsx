import React from 'react';

const TableHeader = ({ columns, sortColumn, onSort }) => {
    const raiseSort = path => {
        const order = sortColumn.path === path && sortColumn.order === "asc" ? "desc" : "asc";
        onSort({ path, order });
    };

    const renderSortIcon = column => {
        if (sortColumn.path !== column.path) return null;
        if (sortColumn.order === "asc") return (<i className="fa fa-sort-asc"></i>);
        return (<i className="fa fa-sort-desc"></i>);
    }

    return (
        <thead>
            <tr>
                {columns.map(column => (
                    <th 
                        key={column.path || column.key} 
                        style={{cursor: "pointer"}} 
                        onClick={() => raiseSort(column.path)}>
                            {column.label} {renderSortIcon(column)} 
                    </th>
                ))}
            </tr>
        </thead>
      );
}
 
export default TableHeader;
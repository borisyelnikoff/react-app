import React from 'react';
import PropTypes from 'prop-types';

const ListGroup = ({ items,  selectedItem, onItemSelect }) => {
    return (
        <ul className="list-group">
            {items.map(item => 
                <li key={item._id}
                    style={{cursor: "pointer"}}
                    className={(selectedItem && item._id === selectedItem._id) ? "list-group-item active" : "list-group-item"} 
                    onClick={() => onItemSelect(item)}>
                    {item.name}
                </li>)}
        </ul>
      );
};

ListGroup.propTypes = {
    items: PropTypes.array.isRequired,
    // currentFilter: PropTypes.isRequired,
    onItemSelect: PropTypes.func.isRequired
}
 
export default ListGroup;
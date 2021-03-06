import React from 'react';

const SearchBox = ({ value, onChange }) => {
    return (
        <input className="form-control" type="search" value={value} placeholder="Search..." onChange={e => onChange(e.currentTarget.value)}/>
      );
};
 
export default SearchBox;
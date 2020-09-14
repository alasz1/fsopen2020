import React from 'react'

const Filter = (props) => {
    
    const handleFilterChange = (event) => {
        console.log(event.target.value)
        props.setFilter(event.target.value)
      }
    
    return (
        <div>
            filter shown with <input onChange={handleFilterChange} />
        </div>
    );
};

export default Filter;
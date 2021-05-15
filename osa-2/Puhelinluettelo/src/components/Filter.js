import React from 'react';

 const Filter = ({ filterdPerson, onChangeHandle }) => {
  return (
    <div>
      filter shown with <input value={filterdPerson} onChange={onChangeHandle}></input>
    </div>
  );
};
export default Filter
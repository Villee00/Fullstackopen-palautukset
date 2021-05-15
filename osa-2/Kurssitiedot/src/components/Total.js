import React from 'react';


const Total = ({ parts }) => {
  const total = parts.reduce((a, b) => ({ exercises: a.exercises + b.exercises }));

  return (
    <b>total of {total.exercises} exercises</b>
  );
};

export default Total;
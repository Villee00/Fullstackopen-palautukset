import React from 'react';
import persons from '../services/persons'

const Number = ({deletePerson, person }) => {
  return (
    <div>
      <p>{person.name} {person.number}</p>
      <button onClick={() => deletePerson(person)}>delete</button>
    </div>

  );
};

export default Number

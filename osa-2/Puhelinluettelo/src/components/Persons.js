import React from 'react';
import Number from './Number';

const Persons = ({deletePerson, filterdPerson, persons }) => {
  const personsToShow = persons.filter(person => person.name.toLowerCase().startsWith(filterdPerson.toLowerCase()));
  return (
    <div>
      {personsToShow.map(person => <Number key={person.name} person={person} deletePerson={deletePerson}/>)}
    </div>
  );
};

export default Persons
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterdPerson, setFilterdPerson] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [isError, setIsError] = useState(false);

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleChangeFilter = (event) => {
    setFilterdPerson(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newNumber
    }

    if (persons.some(obj => obj.name === newName)) {
      const oldPerson = persons.find(obj => obj.name === newName);
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        personService
          .updatePerson(oldPerson.id, personObj)
          .then(returnedPerson => {
            setPersons(persons.map(per => per !== oldPerson ? per : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
        setNotificationMessage(`Replaced ${newName}`);

        setTimeout(() => {
          setIsError(false);
          setNotificationMessage(null)
        }, 2000)
      }
      return
    }


    personService
      .create(personObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(`Added ${newName}`);
      })
      .catch(error => {
        setIsError(true);
        setNotificationMessage(`Error adding ${newName}`);
        console.log(error.response.data)
      })

    setTimeout(() => {
      setIsError(false);
      setNotificationMessage(null)
    }, 2000)
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          const newList = persons.filter((number) => number.id !== person.id);
          setPersons(newList);
          setNotificationMessage(`Deleted ${person.name}`);
        })
        .catch(error => {
          setIsError(true);
          setNotificationMessage(`Information of ${person.name} has already been removed from the server`)
        })


      setTimeout(() => {
        setIsError(false);
        setNotificationMessage(null)
      }, 2000)
    }
  }

  const hook = () => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons);
      })
  }

  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} error={isError} />
      <Filter filterdPerson={filterdPerson} onChangeHandle={handleChangeFilter} />

      <h2>Add a new</h2>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleChangeName={handleChangeName}
        newNumber={newNumber}
        handleChangeNumber={handleChangeNumber} />

      <h2>Numbers</h2>

      <Persons deletePerson={deletePerson} filterdPerson={filterdPerson} persons={persons} />
    </div>
  )

}
export default App



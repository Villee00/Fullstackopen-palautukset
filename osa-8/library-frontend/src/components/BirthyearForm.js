import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"


const BirthyearForm = ({authors}) =>{
  const [year, setYear] = useState('')
  const [name, setName] = useState('')

  const [changeAuthor] = useMutation(EDIT_AUTHOR,
    {
   refetchQueries: [{query: ALL_AUTHORS}],
   onError: (error) =>{
     console.log(error.graphQLErrors[0])
   }
 })
  const submit = () =>{
    const setBornTo = parseInt(year)
    changeAuthor({variables:{name, setBornTo}})

    setYear('')
    setName('')
  }
  return(
    <div>
      <h3>Set birthyear</h3>
      Author:
      <select value={name} onChange={({target}) => setName(target.value)}>
        {authors.map(n => <option value={n.name}>{n.name}</option>)}
      </select>
    <br/>
      Born: <input type="number" 
      value={year} 
      onChange={({target}) => setYear(target.value)}/>
      <br/>
      <button onClick={submit}>Change author</button>
    </div>
  )
}

export default BirthyearForm
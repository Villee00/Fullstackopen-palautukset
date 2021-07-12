import React from "react"
import { TotalProps } from "../../types"
import Part from "./Part"


const Content = ({courseParts}: TotalProps) =>{
  return(
    <div>
      {courseParts.map(course => <Part key={course.name} course={course}/>)}
  </div>
  )
}

export default Content
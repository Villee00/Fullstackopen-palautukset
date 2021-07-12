import React from "react"
import { CoursePart } from "../../types"

const Part = ({ course }: { course: CoursePart }) => {
  switch (course.type) {
    case "normal":
      return(
        <div>
          <b>{course.name} {course.exerciseCount}</b>
          <p>{course.description}</p>
        </div>)

    case "groupProject":
      return(
        <div>
          <b>{course.name} {course.exerciseCount}</b>
          <p>projects: {course.groupProjectCount}</p>
        </div>)

    case "submission":
      return(
        <div>
          <b>{course.name} {course.exerciseCount}</b>
          <p>{course.description}</p>
          <p>Submit: {course.exerciseSubmissionLink} </p>
        </div>)
    case "special":
      return(
        <div>
          <b>{course.name} {course.exerciseCount}</b>
          <p>{course.description}</p>
          <p>Skills needed: {course.requirements.join(', ')}</p>
        </div>)
    default:
      return(<p>Unkown type</p>)
  }
}

export default Part
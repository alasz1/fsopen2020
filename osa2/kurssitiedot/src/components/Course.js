import React from 'react';

const Header = (props) => {
    return (
      <>
        <h1>{props.coursename}</h1>
      </>
    )
  }
  
  const Part = (props) => {
    console.log("part props:", props)
    return (
      <>
        <p>
          {props.name} {props.exercises}
        </p>
      </>
    )
  }
  
  const Content = (props) => {
    console.log(props.course.course.parts)
    const parts = props.course.course.parts
    console.log(parts)
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </div>
    )
  }
  
  const Total = (props) => {
    const parts = props.course.course.parts
    console.log("total props: ", parts)
  
    const total = parts.reduce((tot, arr) => tot + arr.exercises, 0)
    console.log("total total: ", total)
  
    return (
      <>
        <p>Total number of exercises {total}</p>
      </>
    )
  }
  
  const Course = (props) => {
    console.log("course props: ", props)
    return (
      <div>
        <Header coursename={props.course.name} />
        <Content course={props} />
        <Total course={props} />
      </div>
    )
  }

export default Course;
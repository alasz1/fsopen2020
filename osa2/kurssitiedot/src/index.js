import React from 'react'
import ReactDOM from 'react-dom'

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
        <Part key={part.id} name={part.name} exercises={part.exercises}>
          {/* {part.name} */}
        </Part>
      )}
      {/* <Part part={props.part[0].name} exercises={props.part[0].exercises} />
      <Part part={props.part[1].name} exercises={props.part[1].exercises} />
      <Part part={props.part[2].name} exercises={props.part[2].exercises} /> */}
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
      <p>Number of exercises {total}</p>
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

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (

    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
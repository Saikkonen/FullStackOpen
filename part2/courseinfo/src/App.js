const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content content={course.parts} />
    </div>
  )
}

const Header = ({ name }) => {
  return <h2>{name}</h2>
}

const Content = ({ content }) => {
  const total = content.reduce((s, p) => s + p.exercises, 0);

  return (
    <div>
      {content.map(content =>
        <Part key={content.id} part={content.name} exercises={content.exercises} />)}
      <b>total of {total} exercises</b>
    </div>
  )
}

const Part = ({ part, exercises }) => {
  return (
    <p>{part} {exercises}</p>
  )
}

const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course =>
      <Course key={course.id} course={course} />
      )}
    </div>
  )
}

export default App

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
  const total = content.reduce((s, p) => s + p.exercises, 0)

  return (
    <div>
      {content.map((content) => (
        <Part
          key={content.id}
          part={content.name}
          exercises={content.exercises}
        />
      ))}
      <b>total of {total} exercises</b>
    </div>
  )
}

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  )
}

export default Course
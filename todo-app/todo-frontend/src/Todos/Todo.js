import React from 'react'

const Todo = ({ text, buttons }) => {
  return (
    <>
      <hr />
      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
        <span>
          {text}
        </span>
        {buttons}
      </div>
    </>
  )
}

export default Todo
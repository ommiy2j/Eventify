import { Card, IconButton, TextField, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

import './Activities.css'

const Activities = ({ theme }) => {
  const [todos, setTodos] = React.useState([
    'Get The work done!',
    'Get The work done!',
    'Get The work done!',
    'Get The work done!',
  ])

  const handleTodo = (event) => {
    event.preventDefault()
  }

  return (
    <AllAct>
      <Card
        variant="outlined"
        theme={theme}
        sx={{
          bgcolor: (theme) => (theme === 'dark' ? 'rgb(54, 53, 58)' : '#fff'),
          color: (theme) => (theme === 'dark' ? '#ffff' : '#000'),
        }}
      >
        <p>Activities</p>
        <Spacer height={'20px'} />
        <form
          onSubmit={(e) => {
            handleTodo(e)
          }}
        >
          <Padding padding={'20px'}>
            <TextField
              onSubmit={(event) => {
                const { todo } = event.target
                todos.push(todo)
                setTodos([...todos])
              }}
              className="txtf"
              variant="outlined"
              fullWidth
              multiline
            />
          </Padding>
          <Spacer height={'2%'} />
          <Padding padding={'1px 20px 1px'}>
            <Button type="submit">Add Activity</Button>
          </Padding>
        </form>
        <hr className="hra" />

        {/* Show Todos */}

        <ul className="list">
          {todos.length === 0
            ? 'No items'
            : todos.map((todo) => (
                <Padding padding={'0 10px 0'}>
                  <Items key={todo}>
                    <Typography className="type">{todo}</Typography>
                  </Items>
                </Padding>
              ))}
        </ul>
      </Card>
    </AllAct>
  )
}

export default Activities

const AllAct = styled.div`
  position: fixed;
  width: 20vw;
  right: 0;
  height: calc(100vh - 10vh);
`

const Spacer = styled.div`
  width: 100%;
  height: ${(props) => props.height};
`

const Padding = styled.div`
  padding: ${(props) => props.padding};
`

const Button = styled.div`
  width: 100%;
  height: auto;
  background-color: #152238;
  cursor: pointer;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 10px;
  font-weight: 700;
  letter-spacing: 2;
`

const Items = styled.li`
  text-decoration: none;
  list-style-type: none;
  /* text-align: center; */
  color: black;
  text-align: center;
  font-weight: 400;
  background-color: wheat;
  margin-top: 15px;
`

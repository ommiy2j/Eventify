import {
  Avatar,
  Box,
  Card,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tabs,
  Typography,
  Zoom,
} from '@mui/material'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import copy from 'copy-text-to-clipboard'
import { Tooltip } from '@mui/material'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import TagIcon from '@mui/icons-material/Tag'
import RoomDialog from '../Elements/RoomDialog'

const SideBar = ({ theme, refId, myEvents }) => {
  const [copyTitle, setcopyTitle] = useState('copy')
  const [addPop, setAddPop] = useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(1)
  const [myRoom, setMyRoom] = useState([])

  let reference_id = refId
  const history = useHistory()

  const redirect = (result) => {
    history.push('/event/' + reference_id, { result })
    fetch('http://localhost:8000/api/server/join', {
      method: 'POST',
      body: JSON.stringify({
        reference_id,
      }),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        console.log(err)
      })

    window.flash(`Switched to Room ${result.serverName}`, 'success')
  }

  function stringToColor(string) {
    let hash = 0
    let i
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }
    let color = '#'

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.slice(-2)
    }

    return color
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: '45px',
        height: '45px',
      },
      children: `${name.split(' ')[0][0]}`,
    }
  }
  const handleCopy = () => {
    copy(refId)
    setcopyTitle('copied')
  }

  const showAddEvent = () => {
    console.log(addPop)
    setAddPop(true)
  }
  const closeAddEvent = () => {
    console.log(addPop)
    setAddPop(false)
  }

  const handleListItemClick = (event, index, roomId) => {
    setSelectedIndex(index)
    localStorage.setItem('currentRoom', roomId)
  }

  useEffect(() => {
    setMyRoom(JSON.parse(localStorage.getItem('myEvent')).rooms)
  }, [])

  return (
    <Sidebar>
      <Card
        variant="outlined"
        theme={theme}
        sx={{
          bgcolor: (theme) => (theme === 'dark' ? 'rgb(54, 53, 58)' : '#fff'),
          color: (theme) => (theme === 'dark' ? '#ffff' : '#000'),
        }}
      >
        <Container>
          <AllServer>
            <Stack direction="column" spacing={2}>
              <Tooltip>
                <AddIcon color="primary" fontSize="large" />
              </Tooltip>
              {myEvents.map((event) => (
                <Tooltip
                  onClick={() => redirect(event)}
                  ransitionComponent={Zoom}
                  arrow
                  title={event.serverName}
                  placement="right"
                  sx={{ color: 'primary.main' }}
                >
                  <Avatar {...stringAvatar(event.serverName)} />
                </Tooltip>
              ))}
            </Stack>
          </AllServer>
          <Servers>
            <Box sx={{ width: '100%', maxWidth: 560 }}>
              <Typography sx={{ mt: 1, mb: 1 }} variant="h6">
                Rooms
              </Typography>
              {myRoom.map((room, idx) => (
                <ListItem disablePadding>
                  <ListItemButton
                    selected={selectedIndex === idx}
                    onClick={(event) =>
                      handleListItemClick(event, idx, room.roomId)
                    }
                  >
                    <ListItemIcon></ListItemIcon>
                    <TagIcon />
                    <ListItemText
                      sx={{ ml: 1, mr: 1 }}
                      primary={room.roomName}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
              <ListItem disablePadding>
                <ListItemButton
                  selected={selectedIndex === 999}
                  onClick={(event) => handleListItemClick(event, 999)}
                >
                  <ListItemIcon></ListItemIcon>
                  <TagIcon />
                  <ListItemText sx={{ ml: 1, mr: 1 }} primary="General" />
                </ListItemButton>
              </ListItem>
              <RoomDialog open={addPop} refId={reference_id} />
            </Box>
          </Servers>
          {/* <Copy>
          Copy Room Id
          <Tooltip title={copyTitle}>
            <ContentCopyIcon
              className="copyBtn"
              color="inherit"
              onClick={handleCopy}
              onBlur={() => setcopyTitle("copy")}
            />
          </Tooltip>
        </Copy> */}
          {/* <AllPeople>
          <Head>
            <Tabs>Members</Tabs>
          </Head>
          <Stack spacing={2}>Amit</Stack>
        </AllPeople> */}
        </Container>
      </Card>
    </Sidebar>
  )
}

export default SideBar

const Sidebar = styled.div`
  position: fixed;
  top: 10vh;
  height: calc(100vh - 10vh);
  width: 25vw;
  display: flex;
  /* border: 2px solid; */
`
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`
const AllPeople = styled.div``

const Head = styled.div`
  font-size: 1.4rem;
  text-align: left;
  margin: 20px;
  border: 2px solid;
`
const Copy = styled.div``

const Servers = styled.div`
  width: calc(100% - 60px);
  height: 400px;
`
const AllServer = styled.div`
  box-sizing: border-box;
  width: 60px;
  height: 100%;
  padding-top: 10px;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  cursor: pointer;
  background-color: #354259;
  align-items: center;
`

const Server = styled.div`
  width: 50px;
  height: 50px;
  border: 2px solid;
  border-radius: 50%;
  margin: 10px 5px 10px 5px;
`

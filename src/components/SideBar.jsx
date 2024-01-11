import { ListItem, Typography } from '@mui/material'
import React from 'react'

const SideBar = (setCategory) => {
  return (
    <>

    <Typography
      sx={{ color: "white",padding:1,
    }}
    ></Typography>
    <List　component={"nav"}>
      <ListItemButton onClick={() => setCategory('all')}>
        <ListItemText primary="全て"></ListItemText>
      </ListItemButton>

      <ListItemButton onClick={() => setCategory('movie')}>
        <ListItemText primary="映画"></ListItemText>
      </ListItemButton>

      <ListItemButton onClick={() => setCategory('tv')}>
        <ListItemText primary="TV"></ListItemText>
      </ListItemButton>

    </List>
    </>
  )
}

export default SideBar
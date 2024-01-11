import { TextField } from '@mui/material'
import React, { useState } from 'react'
import Button from './Button'
import SearchIcon from '@mui/icons-material/Search'
import { useRouter } from 'next/router'

const SearchBar = () => {

  const [query, setQuery] = useState("");
  const router = useRouter();


  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  const searchQuery = (e) => {
    e.preventDefault();
    if(!query.trim()) {
      return
    }

    router.push(`search?query=${encodeURICOmponent(query)}`)
  }



  return (
    <Box component={"form"} onSUbmit={searchQuery}
      sx={{
        width: "80$",
        margin:"3% auto",
        display: "flex",
        alignItems:"center",
        justifyContent:"center",
      }}>
      <TextField onChnage={handleChange}fullWidth variant="filled" placeholder='検索する'　sx={{mr: 2}}/>
      <Button >
        <SearchIcon/>
      </Button>
    </Box>
  )
}

export default SearchBar
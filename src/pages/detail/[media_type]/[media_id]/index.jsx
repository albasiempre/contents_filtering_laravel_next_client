import AppLayout from '@/components/Layouts/AppLayout'
import { Typography } from '@mui/material'
import Head from 'next/head'
import React from 'react'

// フロントで受け取る
const Detail = ({detail, media_type}) => {
  return (
    <>
      <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }>
            <Head>
                <title>Laravel - Dashboard</title>
            </Head>
    <Box sx={{
            height:{ xs:"auto", md:"70vh"}, bgcolor: "red", position: "relative", display:"flex", alignItems:"center",
    }
    }>
    <Box sx={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/＄{detail.backdrop_path})`,
        position:"absolute",
        top:0,
        bottom:0,
        right:0,
        left:0,
        filter:"blur(20px)",
        backgroundSize:"cover",
        backgroundPosition: "absolute",
        backgroundRepeat: "no-repeat",

        '&::before': {
          content: '""',
          position: "absolute",
          top:0,
          bottom:0,
          right:0,
          left:0,
          backgroundColor: 'rgba(0, 0,0, 0.5)',
          backgroundFilter: 'blur(10px)',

        }
    }}/>
    <Container sx={{zIndex: 1}}>
      <Grid container alignItems={"center"}>
        <Grid md={4} item sx={{bgcolor: "pink", display:"flex", justifyContent:"center"}}>
          <img width={"70%"} src={{`https://image.tmdb.org/t/p/original${detail.poster_path}`}}/>
        </Grid>
        <Grid md={8} item>
          <Typography variant="h4">{detail.title || detail.name}</Typography>
          <Typography paragraph>{detail.overview}</Typography>
          <Typography variant="h6">
            {media_type == "movie" ? `公開日：${detail.release_date}`: `初回放送日：${detail.first_air_date}`}
          </Typography>
        </Grid>
      </Grid>
    </Container>

    </Box>
    </AppLayout>
    </>
  )
}

// SSR  urlの内容に沿って
export async function getServerSideProps(context){
  const { media_type, media_id } = context.params

  try {
    const jpResponse = await axios.get(`https://api.themoviedb.org/3/${media_type}/${media_id}?api_key={process.env.TMDB_API_KEY}&language=ja-JP`)

    let combineData = {...jpResponse.data}

    if(!jpResponse.data.overview) {
      const enResponse = await axios.get(`https://api.themoviedb.org/3/${media_type}/${media_id}?api_key={process.env.TMDB_API_KEY}&language=en-EN`)
      combineData.overview = enResponse.overview;
    }

    return { 
      props: {
        detail: combineData, media_type, media_id
      }
    }
    } catch {
    return { notFound: true }
  }
}
export default Detail
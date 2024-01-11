import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { CardActionArea, CardMedia } from '@mui/material';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';


const Home = () => {

    const [movies, setMovies] = useState([]);


    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('api/getPopularMovies');
                console.log(response.data.results);
                setMovies(response.data.results);

            } catch(err) {
                console.log(err);
            }
        }
        fetchMovies();
    },[])
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }>
            <Head>
                <title>Laravel - Dashboard</title>
            </Head>

            <SearchBar/>
            <Swiper
                spaceBetween={50}
                slidesPerView={6}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                // breakpoints={}
                >
               {movies.map( (movie) => (
                 <SwiperSlide key={movie.id}>
                <Link href={`detail/movie/${movie.id}`}>
                <CardActionArea>
                    <CardMedia
                    component={"img"}
                    sx={{
                        aspectRatio:'2/3',
                    }}
                    image={`https://image.tmdb.org/t/p/original{movie.poster_path}`}
                    />
                </CardActionArea>
                </Link>

                <Typography>
                    公開日：{movie.release_date}
                </Typography>

            </SwiperSlide>
            ))}
            </Swiper>
        </AppLayout>
    )
}

export default Home

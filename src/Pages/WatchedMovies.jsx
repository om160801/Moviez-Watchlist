import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMoviesData } from '../Redux/action';
import { Box, Button, Grid, Heading, Text } from "@chakra-ui/react";
import MovieCard from "../Components/MovieCard";
import {Vortex} from 'react-loader-spinner';
import { BiArrowBack } from 'react-icons/bi';

const WatchedMovies = () => {

    const { status, error, movies } = useSelector((store) => store.movies);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [watched,setWatched] = useState([]);

  useEffect(() => {
    dispatch(getMoviesData()).then(()=>{
        setWatched(movies.filter((e)=> {
            if(e.watchStatus == true){
                return e;
            }
        }))
    });
  }, [dispatch]);

  return (
    <Box>
    <Heading mt={2}>Watched History</Heading>
    <Box 
       display={'flex'} 
       justifyContent={'flex-start'} 
       alignItems={'flex-start'} >
    <Button leftIcon={<BiArrowBack />}  
    bg={"black"} color={"white"} p={4} _hover={
      { bg: "white", 
       color: "black", 
       border:'1px solid black' 
       }
       } onClick={() => nav('/')}>
                    Back
                </Button>
            </Box>
    {/* Data Collected */}
    <Box>
    {
      watched ?
      <Box w={"90%"} margin={"auto"} mt={"1rem"}>
          <Grid templateColumns="repeat(3, minmax(300px, 1fr))" gap={2}>
          {Array.isArray(watched) &&
              watched.map((movie) => <MovieCard key={movie._id} movie={movie} watched={true}/>)}
          </Grid>
    </Box> : <>
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} w={'100%'} m={'auto'} h={'100vh'}>
      
      <Vortex
  visible={true}
  height="80"
  width="80"
  ariaLabel="vortex-loading"
  wrapperStyle={{}}
  wrapperClass="vortex-wrapper"
  colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
  />
      </Box>
      </>
    }
    </Box>
    
  </Box>
  )
}

export default WatchedMovies
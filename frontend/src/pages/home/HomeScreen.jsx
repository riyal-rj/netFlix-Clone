import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Info, Play } from 'lucide-react';

import fetchTrendingContent from '../../customHooks/FetchTrendingContent';

import Navbar from '../../components/Navbar';

import { MOVIE_CATEGORIES, ORIGINAL_IMAGE_BASE_URL, TVSHOWS_CATEGORIES } from '../../utils/constant';
import { contentStore } from '../../global/content';
import Slider from '../../components/Slider';



const HomeScreen = () => {

  const {trendingContent}=fetchTrendingContent();
  const {contentType}=contentStore();
  const [imageLoading,setImageLoading]=useState();
  if(!trendingContent)
    return (
      <div className='h-screen text-white relative'>
            <Navbar/>
            <div className='absolute top-0 left-0 w-full h-full bg-black felx itmes-center justify-center -z-10 shimmer'/>
      </div>
    );    
  console.log(trendingContent);
  return (
   <>
      <div className='relative h-screen text-white'>
          <Navbar/>
          {imageLoading && (
					<div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
				  )}
          <img src={ORIGINAL_IMAGE_BASE_URL+trendingContent?.backdrop_path} alt="Hero img" 
          className='absolute top-0 left-0 w-full h-full object-cover -z-50'
          onLoad={() => {
						setImageLoading(false);
					}}
          />
          <div className='absolute top-0 left-0 w-full h-full bg-black/50 -z-50' aria-hidden='true'/>

          <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32'>
              <div className='bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10'/>
                <div className='max-w-2xl'>
                    <h1 className='mt-4 text-6xl font-extrabold text-balance'>
                       {trendingContent?.title || trendingContent?.name}
                    </h1>
                    <p className='mt-2 text-lg '>
                    {trendingContent?.release_date?.split("-")[0] ||
								    trendingContent?.first_air_date.split("-")[0]}{" "} | {trendingContent?.adult ? "18+" : "PG-13"}
                    </p>
                    <p className='mt-4 text-lg'>
                    {trendingContent?.overview.length > 200? trendingContent?.overview.slice(0, 200) + "...": trendingContent?.overview}
                    </p>
                </div>

                <div className='flex mt-8'>
                  <Link to={`/watch/${trendingContent?.id}`} className='bg-white hover:bg-white/80 text-black  font-bold py-2 px-4 rounded mr-4 flex items-center'>
                    <Play className='size-6 inline-block mr-2 fill-black'/>
                    Play
                  </Link>

                  <Link to={`/watch/${trendingContent?.id}`} className='bg-gray-500/80 hover:bg-gray-400 text-white  font-bold py-2 px-4 rounded mr-4 flex items-center'>
                    <Info className='size-6 mr-2'/>
                    More Info
                  </Link>
                </div>
          </div>
      </div>

      <div className='flex flex-col gaap-10 bg-black py-10'>
          {contentType==='movie'?
          (MOVIE_CATEGORIES.map((category)=><Slider key={category} category={category}/>))
          :
          (TVSHOWS_CATEGORIES.map((category)=><Slider key={category} category={category}/>))
          }
             
      </div>
   </>
  )
}

export default HomeScreen
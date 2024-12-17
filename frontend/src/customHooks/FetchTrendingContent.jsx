import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { contentStore } from '../global/content';


const fetchTrendingContent = () => {
  const [trendingContent,setTrendingContent]=useState(null);
  const {contentType}=contentStore();

  useEffect(()=>{
    const getTrendingContent=async ()=>{
        const response=await axios.get(`api/v1/${contentType}/trending`);
        setTrendingContent(response.data.content);
    };
    getTrendingContent();},[contentType]);
    return {trendingContent}
};

export default fetchTrendingContent;
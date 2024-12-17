import {fetchFromTMDB} from './../services/tmdb.service.js'

export async function getTrendingTvShow(req,res)
{
    try {
        const data=await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        const randomTvShow=data.results[Math.floor(Math.random()*data.results?.length)];
        res.status(200).json({
            status:'success',
            content:randomTvShow
        });
    } catch (error) {
        res.status(500).json({
            status:'Failed to fetch the trending tv shpw due to some internal server error',
            message:error.message
        });
    }
};


export async function getTvShowsTrailers(req,res) {
    const {id}=req.params;
    try {
       const tvShowTrailer=await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
       res.status(200).json({
        status:'success',
        content:tvShowTrailer.results
    });
    } catch (error) {
        if(error.message.includes("404"))
        {
            return res.status(404).send(null);
        }
        res.status(500).json({
            status:'Failed to fetch the tv show trailers due to some internal server error',
            message:error.message
        });
    }
};


export async function getTvShowsDetails(req,res)
{
    const {id}=req.params;
    try {
        const tvShowDetails=await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.status(200).json({
            status:'Success',
            content:tvShowDetails
        });
    } catch (error) {
        if(error.message.includes("404"))
            {
                return res.status(404).send(null);
            }
        res.status(500).json({
            status:'Failed to fetch the tv show details due to some internal server error',
            message:error.message
        });
    }
};


export async function getSimilarTvShows(req,res) {
    const {id}=req.params;
    try {
        const similarTvShows=await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        res.status(200).json({
            status:'Success',
            content:similarTvShows.results,
        });
    } catch (error) {
        if(error.message.includes("404"))
            {
                return res.status(404).send(null);
            }
        res.status(500).json({
            status:'Failed to fetch the similar tv shows due to some internal server error',
            message:error.message
        });
    }
};

export async function getTvShowsByCategory(req,res){
    const {category}=req.params;
    try {
        const tvShowByCategory=await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        res.status(200).json({
            status:'Success',
            content:tvShowByCategory.results
        });
    } catch (error) {
        if(error.message.includes("404"))
            {
                return res.status(404).send(null);
            }
        res.status(500).json({
            status:'Failed to fetch the tv show based on category due to some internal server error',
            message:error.message
        });
    }
}
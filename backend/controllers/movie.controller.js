import {fetchFromTMDB} from './../services/tmdb.service.js'

export async function getTrendingMovie(req,res)
{
    try {
        const data=await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        const randomMovie=data.results[Math.floor(Math.random()*data.results?.length)];
        res.status(200).json({
            status:'success',
            content:randomMovie
        });
    } catch (error) {
        res.status(500).json({
            status:'Failed to fetch the trending movie due to some internal server error',
            message:error.message
        });
    }
};


export async function getMovieTrailers(req,res) {
    const {id}=req.params;
    try {
       const movieTrailer=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
       res.status(200).json({
        status:'success',
        content:movieTrailer.results
    });
    } catch (error) {
        if(error.message.includes("404"))
        {
            return res.status(404).send(null);
        }
        res.status(500).json({
            status:'Failed to fetch the movie trailers due to some internal server error',
            message:error.message
        });
    }
};


export async function getMovieDetails(req,res)
{
    const {id}=req.params;
    try {
        const movieDetails=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        res.status(200).json({
            status:'Success',
            content:movieDetails
        });
    } catch (error) {
        if(error.message.includes("404"))
            {
                return res.status(404).send(null);
            }
        res.status(500).json({
            status:'Failed to fetch the movie details due to some internal server error',
            message:error.message
        });
    }
};


export async function getSimilarMovies(req,res) {
    const {id}=req.params;
    try {
        const similarMovies=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        res.status(200).json({
            status:'Success',
            content:similarMovies.results,
        });
    } catch (error) {
        if(error.message.includes("404"))
            {
                return res.status(404).send(null);
            }
        res.status(500).json({
            status:'Failed to fetch the similar movies due to some internal server error',
            message:error.message
        });
    }
};

export async function getMoviesByCategory(req,res){
    const {category}=req.params;
    try {
        const movieByCategory=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        res.status(200).json({
            status:'Success',
            content:movieByCategory.results
        });
    } catch (error) {
        if(error.message.includes("404"))
            {
                return res.status(404).send(null);
            }
        res.status(500).json({
            status:'Failed to fetch the movies based on category due to some internal server error',
            message:error.message
        });
    }
}
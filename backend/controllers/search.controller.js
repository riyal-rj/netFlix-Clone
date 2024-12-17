import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function searchPerson(req,res)
{
    const {query}=req.params;
    try {
        const response=await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
        if(response.results.length===0)
            return res.status(404).send(null);

        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].profile_path,
                    name:response.results[0].name,
                    searchType:"person",
                    createdAt:Date.now()
                }
            }
        })

        res.status(200).json({
            status:'success',
            searchDetails:response.results
        });

    } catch (error) {
        console.log('Error in search Person controller',error.message);
        res.status(500).json({
            status:'Failed',
            message:'Failed to fetch person details due to some internal server error'
        });
    }
};

export async function searchMovie(req,res) {
    const {query}=req.params;
    try {
        const response =await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
        );
        if(response.results.length===0)
            return res.status(404).send(null);

        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    movie:response.results[0].original_title+" ["+response.results[0].title+"]",
                    language:response.results[0].original_language,
                    searchType:"movie",
                    createdAt:Date.now()
                }
            }
        });

        res.status(200).json({
            status:'success',
            searchDetails:response.results
        });
    } catch (error) {
        console.log('Error in search Movie controller',error.message);
        res.status(500).json({
            status:'Failed',
            message:'Failed to fetch movie details due to some internal server error'
        });
    }
}

export async function searchTvShow(req,res) {
    const {query}=req.params;
    try {
        const response =await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
        );
        if(response.results.length===0)
            return res.status(404).send(null);

        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    tvShow:response.results[0].original_name+" ["+response.results[0].name+"]",
                    language:response.results[0].original_language,
                    searchType:"tvShow",
                    createdAt:Date.now()
                }
            }
        });

        res.status(200).json({
            status:'success',
            searchDetails:response.results
        });
    } catch (error) {
        console.log('Error in search tvshow controller',error.message);
        res.status(500).json({
            status:'Failed',
            message:'Failed to fetch tv show details due to some internal server error'
        });
    }
}


export async function getSearchHistory(req,res) {
    try {
        res.status(200).json({
            status:'Success',
            searchHistory:req.user.searchHistory
        });
    } catch (error) {
        res.status(500).json({
            status:'Failed',
            message:'Failed to get the search history due to some internal server error'
        });
    }    
};


export async function trimSearchLog(req,res) {
    let {id}=req.params;
    id=parseInt(id);
    try {

        const user = await User.findById(req.user._id);
        const itemExists = user.searchHistory.some(item => item.id === id);
        
        if (!itemExists) {
            return res.status(404).json({
                status: 'Failure',
                message: 'Item not found in search history'
            });
        }

        await User.findByIdAndUpdate(req.user._id,{
            $pull:{
                searchHistory:{id:id}
            },
        });

        res.status(200).json({
            status:'Success',
            message:'Item removed from search log successfully'
        });
    } catch (error) {
        console.log(`Error happened in deleting the items from search histor`,error.message);
        res.status(500).json({
            status:'Success',
            message:'Failed to delete the items due to some internal server error'
        });
    }
}
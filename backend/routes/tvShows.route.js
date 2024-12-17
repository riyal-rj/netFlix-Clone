import express from 'express';

import {
    getTrendingTvShow,
    getTvShowsTrailers,
    getTvShowsDetails,
    getSimilarTvShows,
    getTvShowsByCategory
} from '../controllers/tvShows.controller.js';


const router=express.Router();

router.get('/trending',getTrendingTvShow);
router.get('/:id/trailers',getTvShowsTrailers);
router.get('/:id/details',getTvShowsDetails);
router.get('/:id/similar',getSimilarTvShows);
router.get('/:category',getTvShowsByCategory);

export default router;
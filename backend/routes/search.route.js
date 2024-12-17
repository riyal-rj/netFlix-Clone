import express from 'express';

import {
    searchPerson,
    searchMovie,
    searchTvShow,

    getSearchHistory,

    trimSearchLog
    } from './../controllers/search.controller.js'


const router=express.Router();

router.get('/person/:query',searchPerson);
router.get('/movie/:query',searchMovie);
router.get('/tvShow/:query',searchTvShow);

router.get('/history',getSearchHistory);

router.delete('/history/:id',trimSearchLog)

export default router;
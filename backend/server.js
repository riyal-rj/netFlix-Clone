import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

import authRoutes from "./routes/auth.route.js";// all authenitcation routes are there
import movieRoutes from "./routes/movie.route.js";// all movie based routes are there
import tvShowRoutes from "./routes/tvShows.route.js";// all tvshows based routes are there 
import { protectedRoute } from './middleware/protected.route.js';// protected ropute act as the authorization access for some content
import searchRoute from './routes/search.route.js';//all search based routes are here


import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';

const app=express();

app.use(express.json());//middleware to access or parse the req.body

app.use(cookieParser());// to use the ccokies build by jwt and access in during authorization

app.use(cors());

//all the routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/movie",protectedRoute,movieRoutes);
app.use("/api/v1/tvShow",protectedRoute,tvShowRoutes);
app.use('/api/v1/search',protectedRoute,searchRoute)


const port=ENV_VARS.PORT;
app.listen(port,()=>{
    console.log(`Server started at port ${port}`);
    connectDB();
})
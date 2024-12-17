import { useState, useEffect, useContext } from 'react';
import MovieCard from '../components/MovieCard';
import Dashboard from '../components/Dashboard';
import UserContext from '../UserContext';

export default function Movies() {

    const { user } = useContext(UserContext);

    return(
        (user.isAdmin === true)
        ?
            <Dashboard />
        :
            <MovieCard />
    )
}
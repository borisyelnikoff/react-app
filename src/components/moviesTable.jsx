import React from 'react';
import { Link } from 'react-router-dom';
import auth from '../services/authService';
import Like from './common/like';
import Table from './common/table';

const MoviesTable = ({ movies, sortColumn, onDelete, onLike, onSort }) => {
    
    const columns = [
        { label: "Title", path: "title", content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
        { label: "Genre", path: "genre.name"},
        { label: "Number in stock", path: "numberInStock" },
        { label: "Rate", path: "dailyRentalRate" },
        { key: "like", content: movie => (
            <Like id={movie._id} liked={movie.liked} onClick={() => onLike(movie)}/>)},
    ]
    
    const deleteColumn = { 
        key: "delete", 
        content: movie => (
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(movie)}>
                DELETE
            </button>) };

    const user = auth.getCurrentUser();
    if (user && user.isAdmin) columns.push(deleteColumn);

    return (
        <Table data={movies} columns={columns} sortColumn={sortColumn} onSort={onSort}/>
      );
}
 
export default MoviesTable;
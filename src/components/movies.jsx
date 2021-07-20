import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import paginate from '../utils/paginate';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import SearchBox from './common/searchBox';
import { toast } from 'react-toastify';

class Movies extends Component {
    state = { 
        movies: [],
        pageSize: 4,
        currentPage: 1,
        genres: [],
        selectedGenre: null,
        searchQuery: "",
        sortColumn: { path: "", order: "asc"}
    }

    async componentDidMount() {
      const { data: movies } = await getMovies();
      const { data: genres } = await getGenres();

      this.setState({ movies,
                      genres: [{ _id: "", name: "All Genres" }, ...genres],
                    });
    }

    handleDelete = async movie => {
      const originalMovies = [...this.state.movies];
      
      try {
        this.setState({ movies : originalMovies.filter(m => m._id !== movie._id)});
        await deleteMovie(movie._id);
      } catch (ex) {
        if (ex.response && ex.response.status === 404) toast.error("Movie not found");
        if (ex.response && (ex.response.status === 401 || ex.response.status === 403)) toast.error(ex.response.data);
        this.setState({ movies: originalMovies });
      }
    };

    handleLike = movie => {
      const movies = [...this.state.movies];
      const index = movies.indexOf(movie);
      movies[index] = {...movie};
      movies[index].liked = !movie.liked;
      this.setState({ movies });
    };

    handlePageChange = pageNumber => {
      this.setState({ currentPage: pageNumber });
    };

    handleGenreSelect = filter => {
      this.setState({ selectedGenre: filter, searchQuery: "", currentPage: 1 });
    };

    handleSort = sortColumn => {
      this.setState({ sortColumn });
    };

    handleSearch = searchQuery => {
      this.setState({ searchQuery, selectedGenre: null, currentPage: 1 });
    }

    getPagedData = () => {
      const { movies: allMovies, pageSize, currentPage, selectedGenre, searchQuery, sortColumn } = this.state;

      let data = (!selectedGenre || selectedGenre.name === "All Genres") ? allMovies : allMovies.filter(movie => movie.genre._id === selectedGenre._id);

      if (searchQuery) data = data.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));

      data = _(data).orderBy([sortColumn.path], [sortColumn.order]).value();

      const { length: totalCount } = data;
      data = paginate(data, currentPage, pageSize);
      
      return {totalCount, data};
    };

    render() { 
      const { pageSize, currentPage, genres, selectedGenre, searchQuery, sortColumn } = this.state;
      const { totalCount, data: movies } = this.getPagedData();
      const { user } = this.props;
      
      return (
        <div className="container">
            <div className="row">
              <div className="col- m-4">
                <ListGroup items={genres} selectedItem={selectedGenre} onItemSelect={this.handleGenreSelect} />
              </div>
              <div className="col-">
                <div className="ml-3">
                  {user && <Link to="/movies/new" className="btn btn-primary mb-2">New Movie</Link>}
                  <p className="align-content-center">{totalCount > 0 ? `Showing ${movies.length} movies` : `There are no movies to show`}</p>
                  <SearchBox value={searchQuery} onChange={this.handleSearch}/>
                  {totalCount > 0 && <MoviesTable movies={movies} sortColumn={sortColumn} onDelete={this.handleDelete} onLike={this.handleLike} onSort={this.handleSort}/>}
                  {totalCount > 0 && <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />}
                </div>
              </div>
            </div>
        </div>
      );
    }
}
 
export default Movies;
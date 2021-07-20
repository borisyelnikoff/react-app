import React from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import { getMovie, saveMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import Form from './common/form';

class MovieForm extends Form {
    state = {
        data: { _id:"", title: "", genreId: "", numberInStock: "", dailyRentalRate: ""},
        genres: [],
        errors: {}
    };

    schema = {
        _id: Joi.any(),
        title: Joi.string().required().min(5).label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().required().min(0).max(100).label("Number In Stock"),
        dailyRentalRate: Joi.number().required().min(0.0).max(10.0).label("Daily Rental Rate")
    };

    async populateGenres() {
        const { data: genres } = await getGenres();
        this.setState({ genres });
    }

    async populateMovie() {
        const movieId = this.props.match.params.id;
        if (movieId === "new") return;
    
        const { data: movie } = await getMovie(movieId);
        if (!movie) return this.props.history.replace("/not-found");
    
        this.setState({ data: this.mapToViewModel(movie) });
    }

    async componentDidMount() {
        await this.populateGenres();
        await this.populateMovie();
    }

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    }

    doSubmit = async () => {
        try {
            await saveMovie(this.state.data);
            this.props.history.push("/movies");
        } catch (ex) {
            if (ex.response && ex.response.status === 400) toast.error("Bad request");            
        }
    }

    render() {
        return (
            <div className="login-form">
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title")}
                    {this.renderSelect("genreId", "Genre", this.state.genres)}
                    {this.renderInput("numberInStock", "Number In Stock")}
                    {this.renderInput("dailyRentalRate", "Rate", )}
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }
}
 
export default MovieForm;
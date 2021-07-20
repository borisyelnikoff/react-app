import http from '../services/httpService';
import config from '../config.json';

const apiEndpoint = `${config.apiUrl}/movies`;

function movieUrl(id) {
    return `${apiEndpoint}/${id}`;
}

export function getMovies() {
    return http.get(apiEndpoint);
}

export function getMovie(id) {
    return http.get(movieUrl(id));
}

export function saveMovie(movie) {
    const movieInDb = {...movie};
    delete movieInDb._id;

    if (movie._id) return http.put(movieUrl(movie._id), movieInDb);
    else return http.post(apiEndpoint, movieInDb);
}

export function deleteMovie(id) {
    return http.delete(movieUrl(id));
}
class MainApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(`Response is not ok with status ${res.status}`);
        }
    }

    register(name, email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name, email, password
            })
        })
            .then(this._checkResponse);
    }

    login(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                email, password
            })
        })
            .then(this._checkResponse);
    }

    getUserInfo(jwt) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                ...this._headers,
                'Authorization': `Bearer ${jwt}`
            },
        })
            .then(this._checkResponse);
    }

    updateUserInfo(name, email) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name, email
            })
        })
            .then(this._checkResponse);
    }

    getSavedMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    saveMovie(movie) {
        const {
            country,
            director,
            duration,
            year,
            description,
            image,
            trailer,
            nameRU,
            nameEN,
            thumbnail,
            movieId } = movie;

        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                country,
                director,
                duration,
                year,
                description,
                image,
                trailer,
                nameRU,
                nameEN,
                thumbnail,
                movieId
            })
        })
            .then(this._checkResponse);
    }

    deleteMovieFromSaved(movieId) {
        return fetch(`${this._baseUrl}/movies/${movieId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkResponse);
    }


}

export default new MainApi({
    baseUrl: 'https://api.saveme.nomoredomains.xyz',
    headers: {
        'Content-Type': 'application/json',
    }
});
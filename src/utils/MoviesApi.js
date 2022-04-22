class MoviesApi {
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

    getAllMovies() {
        return fetch(this._baseUrl, {
            headers: this._headers
        })
    }
}

export default new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Content-Type': 'application/json',
    }
});
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


}

export default new MainApi({
    baseUrl: 'https://api.saveme.nomoredomains.xyz',
    headers: {
        'Content-Type': 'application/json',
    }
});
export const API_URL = "https://api.themoviedb.org/3";

export const API_KEY_3 = "179a771bb78bce02ccbcaa34a591f48f";

export const API_KEY_4 = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzlhNzcxYmI3OGJjZTAyY2NiY2FhMzRhNTkxZjQ4ZiIsInN1YiI6IjYwZTVkZGJiMjgxMWExMDA3ZTgxM2MzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hae-88UjBKfXYeB2trxacufGqRlqPlEcYRA4UnN1FCc";

export const fetchAPI = (url, options = {}) => {
    return new Promise((resolve, reject) => {
        fetch(url, options)
        .then(res => {
            if(res.status < 400) {
                return res.json()
            } else {
                throw res
            }
        })
        .then(data => {
            resolve(data)
        })
        .catch(res => {
            res.json().then(error => {
                reject(error)
            })
        })
    })
}


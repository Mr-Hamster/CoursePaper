import axios from 'axios';

const serverPrefix = 'https://cors-anywhere.herokuapp.com/';
const SERVER_URL = 'http://localhost:3000/api/v1';
    
const getHeaders = () => ({
    'Content-Type': 'application/json',
    accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Accept-Encoding': 'deflate, gzip',
});

const statsHeaders = () => ({
    // 'Content-Type': 'application/json',
    // accept: 'application/json',
    // // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers': '*',
    Authorization: 'Apikey 12f2515c52c81256920ad5d8883c15ed4133c4ed26082b49318edd78917cc09f'
});

const recentEvents = () => ({
    Accept: 'application/json',
    'Accept-Encoding': 'deflate, gzip',
    'x-api-key': 'oeRt826L5N8CPIjPmmgtW53ZVFj03KMv22NZIVdD'
});
//oeRt826L5N8CPIjPmmgtW53ZVFj03KMv22NZIVdD

const sendRequest = (url, options) =>
    axios({
        ...options,
        url: serverPrefix + url,
        headers: getHeaders(),
    });

const sendRequestForStats = (url, options) => 
    axios({
        ...options,
        url: url,
        headers: statsHeaders(),
    });

const recentEventsRequest = (url, options) => 
    axios({
        ...options,
        url: serverPrefix + url,
        headers: recentEvents(),
    });

export const crudBuilder = url => ({
    get: () => sendRequest(url,{method: 'GET'}),
});

export const statsRequest = url => ({
    get: () => sendRequestForStats(url,{method: 'GET'}),
});

export const eventsRequest = url => ({
    get: () => recentEventsRequest(url,{method: 'GET'}),
});

export const getAxios = (url) => {
    return axios ({
        method: "get",
        url,
    });
}

export const signUp = (data) => {
    return axios({
        method: "post",
        data,
        url: `${SERVER_URL}/auth/sign-up`
    })
};

export const verification = (data, id) => {
    return axios({
        method: "post",
        data,
        url: `${SERVER_URL}/auth/verification/${id}`
    })
};

export const signIn = (data) => {
    return axios({
        method: "post",
        data,
        url: `${SERVER_URL}/auth/sign-in`
    })
}


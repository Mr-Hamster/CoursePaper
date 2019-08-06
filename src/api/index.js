import axios from 'axios';

const serverPrefix = 'https://cors-anywhere.herokuapp.com/';

const historicalValues = 'https://api.alternative.me/fng/';
    
const getHeaders = () => ({
    'Content-Type': 'application/json',
    accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
});

const sendRequest = (url, options) =>
    axios({
        ...options,
        url: serverPrefix + url,
        headers: getHeaders(),
    });

export const crudBuilder = url => ({
    get: () => sendRequest(url,{method: 'GET'}),
});
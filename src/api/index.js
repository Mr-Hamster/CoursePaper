import axios from 'axios';

const serverPrefix = 'https://cors-anywhere.herokuapp.com/';
    
const getHeaders = () => ({
    'Content-Type': 'application/json',
    accept: 'application/json',
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
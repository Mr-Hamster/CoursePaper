import axios from 'axios';

const serverPrefix = 'https://cors-anywhere.herokuapp.com/';
    
const getHeaders = () => ({
    'Content-Type': 'application/json',
    accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
});

const statsHeaders = () => ({
    'Content-Type': 'application/json',
    accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Apikey 12f2515c52c81256920ad5d8883c15ed4133c4ed26082b49318edd78917cc09f'
});

const sendRequest = (url, options) =>
    axios({
        ...options,
        url: serverPrefix + url,
        headers: getHeaders(),
    });

const sendRequestForStats = (url, options) => 
    axios({
        ...options,
        url: serverPrefix + url,
        headers: statsHeaders(),
    });

export const crudBuilder = url => ({
    get: () => sendRequest(url,{method: 'GET'}),
});

export const statsRequest = url => ({
    get: () => sendRequestForStats(url,{method: 'GET'}),
});
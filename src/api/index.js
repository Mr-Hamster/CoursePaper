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

const recentEvents = () => ({
  Accept: 'application/json',
  'Accept-Encoding': 'deflate, gzip',
  'x-api-key': 'MhszfL2wG3MYGo2ZYWPGW1Gi2EV1OFlx4JkUZ4EV5dlM3fdeDj3WDnGdXqaicxXX'
});
//oeRt826L5N8CPIjPmmgtW53ZVFj03KMv22NZIVdD

const api = {
  getDataForTable () {
    return axios({
      method: 'GET',
      url: 'https://api.coingecko.com/api/v3/coins',
      headers: getHeaders()
    })
  },
}

export default api;
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.coindesk.com/v1/bpi/currentprice.json',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
//  andres.sepulveda211@gmail.com
// AVGczezu2a3BRAC
export default instance
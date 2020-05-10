import React, { Component } from "react";
import { ThemeProvider } from '@material-ui/styles';
import Table from 'react-bootstrap/Table'
import './App.scss';
import api from "./api";
import Loader from "./components/loader";

class App extends Component {
  state = {
    data: [],
    isLoading: true
  };

  componentDidMount () {
    this.getDataForTAble();
  };

  getDataForTAble = () => {
    api
      .getDataForTable()
      .then(({ data }) => {
        console.log(data)
        this.setState({
          data,
          isLoading: false
        })
      })
  };

  render() {
    const { isLoading, data } = this.state;
    return (
        <ThemeProvider>
          <div className="appWrapper">
            <h1>
              Crypto Cap
            </h1>
            { 
              !isLoading ? (
                <Table responsive="sm">
                  <thead>
                      <tr>
                          <th>#</th>
                          <th>Coin</th>
                          <th></th>
                          <th>Price</th>
                          <th>1h</th>
                          <th>24h</th>
                          <th>7d</th>
                          <th>14d</th>
                          <th>30d</th>
                          <th>60d</th>
                          <th>200d</th>
                          <th>1year</th>
                      </tr>
                  </thead>
                  <tbody>
                    {
                      data.map((item, index) => (
                          <tr key={item.id} >
                            <td>
                              {index + 1}
                            </td>
                            <td>
                              <div>
                                <img src={item.image.small} />
                                {item.name}
                              </div>
                            </td>
                            <td>
                              {item.symbol.toUpperCase()}</td>
                            <td>
                              {item.market_data.current_price.usd}$</td>
                            <td style={{color: item.market_data.price_change_percentage_1h_in_currency.usd > 0 ? 'green' : 'red' }}>
                              {item.market_data.price_change_percentage_1h_in_currency.usd.toFixed(3)}%
                            </td>
                            <td style={{color: item.market_data.price_change_percentage_24h > 0 ? 'green' : 'red' }}>
                              {item.market_data.price_change_percentage_24h.toFixed(3)}%
                            </td>      
                            <td style={{color: item.market_data.price_change_percentage_7d > 0 ? 'green' : 'red' }}>
                              {item.market_data.price_change_percentage_7d.toFixed(3)}%
                            </td>                               
                            <td style={{color: item.market_data.price_change_percentage_14d > 0 ? 'green' : 'red' }}>
                              {item.market_data.price_change_percentage_14d.toFixed(3)}%
                            </td>  
                            <td style={{color: item.market_data.price_change_percentage_30d > 0 ? 'green' : 'red' }}>
                              {item.market_data.price_change_percentage_30d.toFixed(3)}%
                            </td>  
                            <td style={{color: item.market_data.price_change_percentage_60d > 0 ? 'green' : 'red' }}>
                              {item.market_data.price_change_percentage_60d.toFixed(3)}%
                            </td>  
                            <td style={{color: item.market_data.price_change_percentage_200d > 0 ? 'green' : 'red' }}>
                              {item.market_data.price_change_percentage_200d.toFixed(3)}%
                            </td>  
                            <td style={{color: item.market_data.price_change_percentage_1y > 0 ? 'green' : 'red' }}>
                              {item.market_data.price_change_percentage_1y.toFixed(3)}%
                            </td>  
                          </tr>
                      ))
                    }
                  </tbody>
                </Table>
              ) : <Loader />
            }
          </div>
        </ThemeProvider>
    );
  }
}

export default App;
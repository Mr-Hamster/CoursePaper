import React, { Component } from "react";
import { ThemeProvider } from '@material-ui/styles';
import * as api from '../api/index';
import '../styles/App.scss';
import MainPage from "../screens/MainPage";
import { Switch, Route,  } from 'react-router-dom'
import Axios from "axios";

class App extends Component {
    
    state = {
      coinGecko: [],
      dependencyObj: {},
      recentEvents: [],
    }

    componentDidMount(){
      this.LoadRecentEvents();
      this.getCoinGecko();
    }

    LoadRecentEvents = () => {
      api.eventsRequest(`https://developers.coinmarketcal.com/v1/events?max=150`).get().then(
        resp => {
              console.log(resp)
                let data = resp.data.body;
                this.setState({
                  recentEvents: data
                })
            }).catch(err => {
                alert(`${err}`)
            });
    }

    getCoinGecko = () => {
      Axios.get(`https://api.coingecko.com/api/v3/coins`).then(
        resp => {         
            let data = resp.data;
            this.createDependencyObj(data);
            this.setState({
              coinGecko: data,
            })
        }).catch(err => console.log('Error:', err));
    }

//result of func - '[{btc: bitcoin}...]'
    createDependencyObj = (arr) => {
      let obj = {};
      arr.forEach(item => {
          obj[item.symbol] = item.id;
      })
      this.setState({
          dependencyObj: obj
      })
  }

    render() {
      const { dependencyObj, coinGecko, recentEvents } = this.state;
        return (
            <ThemeProvider> {/* For material ui  */}
                <div className="AppWrapper">
                  <Switch>
                      <Route 
                        path='/' 
                        component={() => 
                          <MainPage 
                            dependencyObj={dependencyObj} 
                            recentEvents={recentEvents} 
                            coinGecko={coinGecko}
                          />
                        }
                      />
                  </Switch>
                </div>
            </ThemeProvider>
        );
    }
}

export default App;
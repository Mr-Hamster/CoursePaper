import React, { Component } from "react";
import { ThemeProvider } from '@material-ui/styles';
import * as api from '../api/index';
import '../styles/App.scss';
import MainPage from "../screens/MainPage";
import { Switch, Route, Redirect,  } from 'react-router-dom'
import Axios from "axios";
import Header from "./Header/Header";
import LogIn from "./LogIn";
import RegistrForm from "./RegistrationForm";
import Verification from "./Verification/Verification";
import FavoriteCoins from "../screens/FavoriteCoins/FavoriteCoins";

class App extends Component {
    state = {
      coinGecko: [],
      dependencyObj: {},
      recentEvents: [],
      routes: [],
    }

    componentDidMount() {
      this.LoadRecentEvents();
      this.getCoinGecko();
    }

    LoadRecentEvents = () => {
      const request = url => {
        return Axios ({
          method: "get",
          url,
          headers: {
              'Accept': 'application/json',
              'Accept-Encoding': 'gzip, deflate, br',
              'x-api-key': 'oeRt826L5N8CPIjPmmgtW53ZVFj03KMv22NZIVdD',
          }
      });
      }
      request(`https://cors-anywhere.herokuapp.com/https://developers.coinmarketcal.com/v1/events?max=150`)
        .then(resp => {
            let data = resp.data.body;
            this.setState({
              recentEvents: data
            })
        })
        .catch(err => {
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
                  <Header />
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
                      exact
                    />
                    <Route 
                      path='/sign-in' 
                      component={() => <LogIn />}
                      exact
                    />
                    <Route 
                      path='/sign-up' 
                      component={() => <RegistrForm />}
                      exact
                    />
                    <Route 
                      path='/verification' 
                      component={() => <Verification />}
                      exact
                    />
                    <Route 
                      path='/favorites' 
                      component={() => (
                        <FavoriteCoins
                          coinGecko={coinGecko}
                        />
                      )}
                      exact
                    />
                    <Route render={() => <Redirect to='/' />} />
                  </Switch>
                </div>
            </ThemeProvider>
        );
    }
}

export default App;
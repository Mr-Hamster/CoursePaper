import React, { Component } from "react";
import { ThemeProvider } from '@material-ui/styles';
import * as api from '../api/index';
import '../styles/App.scss';
import MainPage from "../screens/MainPage";
import LogIn from "./LogIn";
import { Switch, Route,  } from 'react-router-dom'
import Settings from "../screens/Settings";
import { slide as Menu } from 'react-burger-menu'
import { Link  } from 'react-router-dom'
import Testing from "../screens/Testing";
import RegistrForm from "./RegistrationForm";

const styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      left: '36px',
      top: '36px'
    },
    bmBurgerBars: {
      background: '#373a47',
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenuWrap: {
      height: '100%',
      position: 'fixed',
      left: '0',
      top: '0'
    },
    bmMenu: {
      background: '#373a47',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47',
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmItem: {
      display: 'flex',
      flexDirection: 'column',
      outline: 'none',
    },
    bmOverlay: {
      width: '100%',
      position: 'fixed',
      left: '0',
      top: '0',
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }

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
                let data = resp.data.body;
                this.setState({
                  recentEvents: data
                })
            }).catch(err => {
                alert(`${err}`)
            });
    }

    getCoinGecko = () => {
      api.crudBuilder(`https://api.coingecko.com/api/v3/coins`).get().then(
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
                  {/* menu for all pages */}
                  <Menu styles={styles} > 
                      <Link to='/' style={{ outline:'none' }} >
                          Log In
                      </Link>
                      <Link to='/mainpage'>
                          App
                      </Link>
                      <Link to='/settings' >
                          Settings
                      </Link>
                      <Link to='/test' >
                          Test
                      </Link>
                      <Link to='/registration' >
                          Registration
                      </Link>
                  </Menu>
                  {/* Router */}
                  <Switch>
                      <Route exact path='/' component={LogIn} />
                      <Route path='/mainpage' component={() => <MainPage dependencyObj={dependencyObj} recentEvents={recentEvents} coinGecko={coinGecko} />} />
                      <Route path='/settings' component={() => <Settings coinGecko={coinGecko} />} />
                      <Route path='/test' component={Testing} />
                      <Route path='/registration' component={RegistrForm} />
                  </Switch>
                </div>
            </ThemeProvider>
        );
    }
}

export default App;
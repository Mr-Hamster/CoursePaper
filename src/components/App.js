import React, { Component } from "react";
import { ThemeProvider } from '@material-ui/styles';
import * as api from '../api/index';
import '../styles/App.scss';
import InputData from "../screens/InputData";
import LogIn from "../screens/LogIn";
import { Switch, Route,  } from 'react-router-dom'
import Settings from "../screens/Settings";
import { slide as Menu } from 'react-burger-menu'
import { Link  } from 'react-router-dom'

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
    }

    // componentDidMount(){
        
    // }

    render() {
      const { exchange } = this.state;
        return (
            <ThemeProvider>
                <div className="AppWrapper">
                <Menu styles={styles} >
                    <Link to='/' style={{ outline:'none' }} >
                        Log In
                    </Link>
                    <Link to='/inputData'>
                        App
                    </Link>
                    <Link to='/settings' >
                        Settings
                    </Link>
                </Menu>
                    <Switch>
                        <Route exact path='/' component={LogIn} />
                        <Route path='/inputData' component={() => <InputData />} />
                        <Route path='/settings' component={() => <Settings />} />
                    </Switch>
                </div>
            </ThemeProvider>
        );
    }
}

export default App;
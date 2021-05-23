import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { deleteToken, isSignedIn } from '../../services/auth';
import './Header.scss';

class Header extends PureComponent {
  state = {
    isSignedIn: false,
  };
  componentDidMount () {
    this.setState({
      isSignedIn: isSignedIn(),
    })
  }

  signOut = () => {
    this.setState({
      isSignedIn: false,
    });

    deleteToken();
  }
  render () {
    const { history } = this.props;
    const { isSignedIn } = this.state;
    return (
      <header>
        <div className='title' onClick={() => history.push('/')}>
          Crypto Cap
        </div>
        <div>
          {
            isSignedIn && (
              <nav>
                <Link to='/profile'>
                  My profile
                </Link>
                <Link to='/favorites'>
                  Favorite Coins
                </Link>
              </nav>
            )
          }
          <div className='auth'>
            {
              !this.state.isSignedIn ? (
                <Link to='/sign-in'>
                  Sign-In
                </Link>
              ) : (
                <span onClick={() => this.signOut()}>
                  Sign Out
                </span>
              )
            }
          </div>
        </div>
      </header>
    )
  }
};

export default withRouter(Header);

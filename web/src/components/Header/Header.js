import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import './Header.scss';

class Header extends PureComponent {
  render () {
    const { history } = this.props;
    return (
      <header>
        <div className='title' onClick={() => history.push('/')}>
          Crypto Cap
        </div>
        <div>
          <nav>
            <Link to='/profile'>
              My profile
            </Link>
            <Link to='/favorites'>
              Favorite Coins
            </Link>
          </nav>
          <div className='auth'>
            {
              false ? (
                <Link to='/sign-in'>
                  Sign-In
                </Link>
              ) : (
                <span>
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

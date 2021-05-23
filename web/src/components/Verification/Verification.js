import React from 'react';
import '../../styles/LogIn.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';
import { verification } from '../../api';
import Loader from '../loader';
import { saveToken } from '../../services/auth';

class Verification extends React.Component{
    state = {
      code: '',
      isLoad: false,
    };

    resendCode = () => {

    };

    verification = () => {
      const { match: { params: { id } }, history } = this.props;
      const { code } = this.state;
      
      this.setState({
        isLoad: true,
      })
      verification({ code }, id)
        .then(({ data }) => {
          this.setState({
            isLoad: false,
          });
          saveToken(data.token);
          history.push('/');
          window.location.reload();
        })
        .catch(err => {
          this.setState({
            isLoad: false,
          });
          alert(err.response.data.error)
        })
    };

    render() {
        const { code, isLoad } = this.state;
        return (
          <div className="wrapperLogIn">
            {
              isLoad ? (
                <Loader />
              ) : (
                <div className="logInBlock">
                  <h3>Thanks For Signing Up!</h3>
                  <p>
                    Please verify your account by entering the code that <br /> has been sent to khomiaknazarii@gmail.com
                  </p>
                  <TextField
                    id="outlined-uncontrolled"
                    label="Code"
                    defaultValue=""
                    margin="normal"
                    variant="outlined"
                    type="number"
                    onChange = { (event) => {
                        this.setState({
                          code: event.target.value
                        })
                    } }
                    value={code}
                    style={{ width: '60%',  }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ width:'30%', height:'50px', marginTop: "30px"}}
                    onClick={ this.verification }
                  >
                    Submit
                  </Button>
                  <div className='resendButton' onClick={() => this.resendCode()}>
                    Resend Code
                  </div>
                </div>
              )
            }
          </div>
        );
    }
}

export default withRouter(Verification);

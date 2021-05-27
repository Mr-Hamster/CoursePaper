import React from 'react';
import '../styles/LogIn.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, withRouter } from 'react-router-dom'
import OpenEye from '@material-ui/icons/Visibility';
import ClosedEye from '@material-ui/icons/VisibilityOff';
import Loader from './loader';
import { saveToken } from '../services/auth';
import { signIn } from '../api';

class LogIn extends React.Component{
    state = {
        email:'',
        password:'',
        eye: false,
        isLoad: false,
    }

    SignIn = () => {
        const { email, password } = this.state;
        const { history } = this.props;
        this.setState({
            isLoad: true,
        });
        signIn({ email, password })
            .then(({ data }) => {
                this.setState({
                    isLoad: false,
                });
                saveToken(data);
                history.push('/');
                window.location.reload();
            })
            .catch(err => {
                this.setState({
                    isLoad: false,
                });
                alert(err.response.data.message);
            })
    }

    render(){
        const { eye, password, email, isLoad } = this.state;
        return(
            <div className="wrapperLogIn">
                {
                    isLoad ? (
                        <Loader />
                    ) : (
                    <div className="logInBlock">
                        <h3>Sign In</h3>
                        <TextField
                            id="outlined-uncontrolled"
                            label="Email"
                            defaultValue=""
                            margin="normal"
                            variant="outlined"
                            type="email"
                            onChange = { (event) => {
                                this.setState({
                                    email: event.target.value
                                })
                            } }
                            value={email}
                            style={{ width: '100%',  }}
                        />
                        <div style={{ display:'flex', width: '100%', alignItems:'center', position: 'relative', }} >
                            <TextField
                                id="outlined-uncontrolled"
                                label="Password"
                                defaultValue=""
                                margin="normal"
                                variant="outlined"
                                type={!eye ? "password" : 'text' }
                                onChange = { (event) => {
                                    this.setState({
                                        password: event.target.value
                                    })
                                } }
                                value={password}
                                style={{ width: '100%', marginTop:'10px' }}
                            />
                            <div style={{display:'flex', position:'absolute', height:'100%', alignItems:'center', right:'10px'}}>
                                {
                                    eye ? (
                                        <OpenEye onClick={() => this.setState({
                                            eye: !eye
                                        })}/>
                                    ) : (
                                        <ClosedEye onClick={() => this.setState({
                                            eye: !eye
                                        })}/>
                                    )
                                }
                            </div>
                        </div>
                        <Button variant="contained" color="primary" style={{ width:'30%', height:'50px', marginTop: "30px"}} onClick={ this.SignIn }>
                            Sign In
                        </Button>
                        <div className='signUp'>
                            Don’t have an account? <Link to='sign-up'>Sign Up</Link>
                        </div>
                    </div>
                    )
                }
            </div>
        );
    }
}

export default withRouter(LogIn);
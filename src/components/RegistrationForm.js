import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../styles/RegistrationForm.scss';

const validEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i


export default class RegistrForm extends React.Component{

    state = {
        fname: '',
        lname: '',
        email: '',
        psw: '',
        confirmPsw: '',
        check: false,
        errFname: true,
        errLname: true,
        errEmail: true,
        errPsw: true,
        errConfirmPsw: true,
    }

    Register = () => {
        this.setState({
            check: true
        },()=>{
            this.validation();
        })
        this.sendData();
    }

    validation = () => {
        const { fname, lname, email, psw, confirmPsw, } = this.state;

        fname.length ? this.setState({
            errFname: false
        }): this.setState({
            errFname: true
        })

        lname.length ? this.setState({
            errLname: false
        }): this.setState({
            errLname: true
        })

        validEmail.test(email) ? this.setState({
            errEmail: false
        }): this.setState({
            errEmail: true
        })

        psw.length < 8 ? this.setState({
            errPsw: true
        }): this.setState({
            errPsw: false
        })

        psw.length >=8 && psw == confirmPsw ? this.setState({
            errConfirmPsw: false
        }): this.setState({
            errConfirmPsw: true
        })
    }

    sendData = () => {
        const { errLname, errFname, errConfirmPsw, 
            errEmail, errPsw, fname, lname, 
            email, psw, } = this.state;
        if(!errConfirmPsw && !errEmail && !errFname && !errLname && !errPsw){
            let newUser = {
                firstname: fname,
                lastname: lname,
                email: email,
                password: psw
            }
            console.log(newUser)
        } else {
            console.log('error')
        }
    }

    render(){
        const { fname, lname, email, psw, 
            confirmPsw, check, errLname, 
            errFname, errConfirmPsw, errEmail, 
            errPsw } = this.state;
        return(
            <div className='regWrapper'>
                <div className='regForm'>
                    <h3>
                        Registration Form
                    </h3>
                    <TextField
                        id="outlined-uncontrolled"
                        label="First Name"
                        margin="normal"
                        variant="outlined"
                        type="text"
                        name="lastname"
                        onChange = { (event) => {
                            this.setState({
                                fname: event.target.value
                            },()=>{
                                this.validation()
                            })
                        } }
                        value={fname}
                        style={{ width: '70%',  }}
                    />
                    {
                        check && errFname ? <span style={{color:'red'}}>This field can not be empty!</span> : null
                    }
                    <TextField
                        id="outlined-uncontrolled"
                        label="Last Name"
                        margin="normal"
                        variant="outlined"
                        name="firstname"
                        type="text"
                        onChange = { (event) => {
                            this.setState({
                                lname: event.target.value
                            },()=>{
                                this.validation()
                            })
                        } }
                        value={lname}
                        style={{ width: '70%',  }}
                    />
                    {
                        check && errLname ? <span style={{color:'red'}}>This field can not be empty!</span> : null
                    }
                    <TextField
                        id="outlined-uncontrolled"
                        label="Email"
                        defaultValue=""
                        margin="normal"
                        variant="outlined"
                        name="email"
                        type="text"
                        onChange = { (event) => {
                            this.setState({
                                email: event.target.value
                            },()=>{
                                this.validation()
                            })
                        } }
                        value={email}
                        style={{ width: '70%',  }}
                    />
                    {
                        check && errEmail ? <span style={{color:'red'}}>Email not valid!</span> : null
                    }
                    <TextField
                        id="outlined-uncontrolled"
                        label="Password"
                        margin="normal"
                        variant="outlined"
                        name="password"
                        type="password"
                        onChange = { (event) => {
                            this.setState({
                                psw: event.target.value
                            },()=>{
                                this.validation()
                            })
                        } }
                        value={psw}
                        style={{ width: '70%',  }}
                    />
                    {
                        check && errPsw ? <span style={{color:'red'}}>Password must be minimal 8 chars!</span> : null
                    }
                    <TextField
                        id="outlined-uncontrolled"
                        label="Confirm Password"
                        margin="normal"
                        variant="outlined"
                        type="password"
                        name="password"
                        onChange = { (event) => {
                            this.setState({
                                confirmPsw: event.target.value
                            },()=>{
                                this.validation()
                            })
                        } }
                        value={confirmPsw}
                        style={{ width: '70%',  }}
                    />
                    {
                        check && errConfirmPsw ? <span style={{color:'red'}}>Passwords must matched!</span> : null
                    }
                    <Button variant="contained" color="primary" style={{ width:'30%', height:'50px', marginTop:'10px'}} onClick={ this.Register }>
                        Register
                    </Button>
                </div>
            </div>
        );
    }
}
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import OpenEye from '@material-ui/icons/Visibility';
import ClosedEye from '@material-ui/icons/VisibilityOff';
import '../styles/RegistrationForm.scss';

const validEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

export default class RegistrForm extends React.Component{

    state = {
        fname: '',
        lname: '',
        email: '',
        psw: '',
        confirmPsw: '',
        pswEye: false,
        confirmPswEye: false,
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
            errPsw,
            pswEye,
            confirmPswEye,
        } = this.state;
        return(
            <div className='regWrapper'>
                <div className='regForm'>
                    <h3>
                        Sign Up
                    </h3>
                    <TextField
                        id="outlined-uncontrolled"
                        label="Username"
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
                    <div style={{ display:'flex', width: '70%', alignItems:'center', position: 'relative', }} >
                        <TextField
                            id="outlined-uncontrolled"
                            label="Password"
                            defaultValue=""
                            margin="normal"
                            variant="outlined"
                            type={!pswEye ? "password" : 'text' }
                            onChange = { (event) => {
                                this.setState({
                                    psw: event.target.value
                                })
                            } }
                            value={psw}
                            style={{ width: '100%', marginTop:'10px' }}
                        />
                        <div style={{display:'flex', position:'absolute', height:'100%', alignItems:'center', right:'10px'}}>
                            {
                                pswEye ? (
                                    <OpenEye onClick={() => this.setState({
                                        pswEye: !pswEye
                                    })}/>
                                ) : (
                                    <ClosedEye onClick={() => this.setState({
                                        pswEye: !pswEye
                                    })}/>
                                )
                            }
                        </div>
                    </div>
                    {
                        check && errPsw ? <span style={{color:'red'}}>Password must be minimal 8 chars!</span> : null
                    }
                    <div style={{ display:'flex', width: '70%', alignItems:'center', position: 'relative', }} >
                        <TextField
                            id="outlined-uncontrolled"
                            label="Password"
                            defaultValue=""
                            margin="normal"
                            variant="outlined"
                            type={!confirmPswEye ? "password" : 'text' }
                            onChange = { (event) => {
                                this.setState({
                                    confirmPsw: event.target.value
                                })
                            } }
                            value={confirmPsw}
                            style={{ width: '100%', marginTop:'10px' }}
                        />
                        <div style={{display:'flex', position:'absolute', height:'70%', alignItems:'center', right:'10px'}}>
                            {
                                confirmPswEye ? (
                                    <OpenEye onClick={() => this.setState({
                                        confirmPswEye: !confirmPswEye
                                    })}/>
                                ) : (
                                    <ClosedEye onClick={() => this.setState({
                                        confirmPswEye: !confirmPswEye
                                    })}/>
                                )
                            }
                        </div>
                    </div>
                    {
                        check && errConfirmPsw ? <span style={{color:'red'}}>Passwords must matched!</span> : null
                    }
                    <Button variant="contained" color="primary" style={{ width:'30%', height:'50px', marginTop:'10px'}} onClick={ this.Register }>
                        Sign Up
                    </Button>
                </div>
            </div>
        );
    }
}
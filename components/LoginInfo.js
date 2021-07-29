import React, {Component,Fragment} from 'react';
import CogoToast from "cogo-toast";
import {Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import Router from 'next/router';
import SessionHelper from "../SessionHelper/SessionHelper";

class LoginInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName:'',
            email:'',
            password:'',
            Login:'Login'
        }
    }


    ChangeUserName=(event)=>{
        let userName = event.target.value;
        this.setState({userName:userName})
    }

    ChangeEmail=(event)=>{
        let email = event.target.value;
        this.setState({email:email})
    }

    ChangePassword=(event)=>{
        let password = event.target.value;
        this.setState({password:password})
    }

    onLoginHandler=()=>{
        let username = this.state.userName;
        let email = this.state.email;
        let password = this.state.password;

        if(username.length === 0)
        {
            CogoToast.error('Name is empty',{position:'bottom-center'})
        }
        else if(email.length === 0)
        {
            CogoToast.error('Mail is empty',{position:'bottom-center'})
        }
        else if(password.length === 0)
        {
            CogoToast.error('Password is empty',{position:'bottom-center'})
        }else {
            this.setState({Login:'Processing......'})
            let MyFormData = new FormData();
            MyFormData.append('name',username);
            MyFormData.append('email',email);
            MyFormData.append('password',password);

            axios.post(this.props.url+"/AddAdmin",MyFormData).then(response=>{
                if(response.data === 1)
                {
                    SessionHelper.setUserName(username);
                    CogoToast.success('Login is Success',{position:'bottom-center'});
                    this.setState({Login:'Login'})
                    Router.push('/');
                }else {
                    CogoToast.success('Login is Fail',{position:'bottom-center'});
                    this.setState({Login:'Login'})
                    Router.push('/');
                }
            }).catch(error=>{
                CogoToast.success('Login is Fail',{position:'bottom-center'});
                this.setState({Login:'Login'})
                Router.push('/');
            });
        }
    }

    render() {
        return (
            <Fragment>
                <Container className="TopSection animated zoomIn">
                    <Row className="p-2">
                        <Col className="shadow-sm bg-white mt-2" md={12} lg={12} sm={12} xs={12}>
                            <Row className="text-center">
                                <Col className="d-flex justify-content-center" md={6} lg={6} sm={12} xs={12}>
                                    <div className="onboardForm">
                                        <h4 className="section-title">USER SING IN</h4>
                                        <h6 className="section-sub-title">Please Enter Your email, And Password Go Login</h6>
                                        <input onChange={this.ChangeUserName} className="form-control m-2" type="text" placeholder="Enter User Name"/>
                                        <input onChange={this.ChangeEmail} className="form-control m-2" type="text" placeholder="Enter User Email"/>
                                        <input onChange={this.ChangePassword} className="form-control m-2" type="text" placeholder="Enter User Password"/>
                                        <button onClick={this.onLoginHandler} className="btn btn-block m-2 site-btn">{this.state.Login}</button>
                                    </div>
                                </Col>
                                <Col className="p-0 Desktop m-0" md={6} lg={6} sm={6} xs={6}>
                                    <img className="onboardBanner" src="/otppagebanner.png"/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default LoginInfo;
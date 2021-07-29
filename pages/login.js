import React, {Component,Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import LoginInfo from "../components/LoginInfo";

export async function getStaticProps()
{
    return{
        props:{
            url:process.env.APIBASEURL
        }
    }
}

class Login extends Component {
    render() {
        return (
            <Fragment>
                <LoginInfo
                  url={this.props.url}
                />
            </Fragment>
        );
    }
}

export default Login;
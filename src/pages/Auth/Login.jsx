import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {loginUser} from '../../redux/actions/user';
import {connect} from 'react-redux';

class Login extends React.Component {
    state = {
        userName: "",
        password: ""
    }
    
    inputHandler = (event) => {
        const value = event.target.value
        const name = event.target.name

        this.setState({[name]: value})
    }

    

    render() {
        if(this.props.userGlobalState.id){
            return <Redirect to="/"/>
        }
        return (
            <div className="continer">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1>Log in Now!</h1>
                        <p className="lead">Log in now and start shopping in the most affordable ecommerce platform</p>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-4 offset-4">
                        {
                            this.props.userGlobalState.errMsg ?
                            <div className="alert alert-danger">{this.props.userGlobalState.errMsg}</div>
                            : null
                        }
                        <div className="card">
                            <div className="card-body">
                                <h5 className="font-weight-bold mb-3">Login</h5>
                                <input name="userName" onChange={this.inputHandler} placeholder="username" type="text" className="form-control my-2"/>
                                <input name="password" onChange={this.inputHandler} placeholder="password" type="password" className="form-control my-2"/>
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <button onClick={() => this.props.loginUser(this.state)} className="btn btn-primary mt-2">
                                        Login
                                    </button>
                                    <Link to="/register">Or Register</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userGlobalState : state.user
    }
}

const mapDispatchToProps = {
    loginUser
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
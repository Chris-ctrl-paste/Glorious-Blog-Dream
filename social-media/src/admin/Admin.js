import React, { Component } from "react";
import Posts from "../post/Posts";
import Users from "../user/Users";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";

class Admin extends Component {
    state = {
        redirectToHome: false
    };
//If user not admin redirect to home which is literally posts
    componentDidMount() {
        if (isAuthenticated().user.role !== "admin") {
            this.setState({ redirectToHome: true });
        }
    }
//redirects to home which is literally posts
    render() {
        if (this.state.redirectToHome) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <div className="jumbotron" style={{backgroundColor:'rgb(21, 32, 43)'}}>
                    <h2 style={{color:'white'}}>Admin Dashboard</h2>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            
                           
                            <Posts />
                        </div>
                        <div className="col-md-6">
                            
                           
                            <Users />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin;

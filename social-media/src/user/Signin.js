import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";
import SocialLogin from "./SocialLogin";

class Signin extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectTo: false,
            loading: false
        }
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    }

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const { email, password } = this.state;
        const user = {
            email,
            password
        }

        signin(user).then(data => {
            if (data.error) {
                this.setState({ error: data.error, loading: false });

            } else {
                authenticate(data, () => {
                    this.setState({ redirectTo: true });
                })
            }
        })
    }


    signinForm = (email, password) => (
        <form>
            <div className="form-group">
                <label className="text-white">Email</label>
                <input
                    style={{ color: 'white' }}
                    onChange={this.handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>
            <div className="form-group">
                <label className="text-white">Password</label>
                <input
                    style={{ color: 'white' }}
                    onChange={this.handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>



            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-success"
            >
                Submit
            </button>
        </form>
    );

    render() {
        const {
            email,
            password,
            error,
            redirectTo,
            loading,
        } = this.state;

        if (redirectTo) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5 text-white">Sign in</h2>
                <hr />
                <SocialLogin />

                <hr />
                <br />

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                        ""
                    )}

                {this.signinForm(email, password)}

                <p>
                    <Link
                        to="/forgot-password"
                        className="btn btn-raised btn-danger"
                    >
                        {" "}
                        Forgot Password
                    </Link>
                </p>
            </div>
        );
    }
}

export default Signin;

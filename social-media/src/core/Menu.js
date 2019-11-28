import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';

const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: '#ffffff' };
    else return { color: '#26f0f0' };
};

const Menu = ({ history }) => (
    <div >
        <ul  className="nav nav-tabs   " style={{backgroundColor: 'rgb(21, 32, 43)'}}>
            {isAuthenticated() && (
                <>
                    <li className="nav-item">
                        <Link
                            to={`/user/${isAuthenticated().user._id}`}
                            style={isActive(history, `/user/${isAuthenticated().user._id}`)}
                            className="nav-link"
                        >
                            {`${isAuthenticated().user.name}`}
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to={`/findpeople`} style={isActive(history, `/findpeople`)} className="nav-link">
                            People
                        </Link>
                    </li>




                </>

            )}




            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/')} to="/">
                    Posts
                </Link>
            </li>

            {!isAuthenticated() && (
                < >
                    <li className="nav-item "  >
                        <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">
                            Sign In
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">
                            Sign Up
                        </Link>
                    </li>

                </>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                <li className="nav-item ">
                    <Link to={`/admin`} style={isActive(history, `/admin`)} className="nav-link">
                        Admin
                    </Link>
                </li>

            )}
            {isAuthenticated() && (
                <>
                    <li className="nav-item ml-auto">
                        <span
                            className="nav-link"
                            style={{ cursor: 'pointer', color: '#fff' }}
                            onClick={() => signout(() => history.push('/'))}
                        >
                            Sign Out
                </span>
                    </li>
                </>
            )}



        </ul>
    </div>
);

export default withRouter(Menu);

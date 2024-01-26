import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {

    const navigate = useNavigate(); // Get the navigate function from react-router
    const isLoggedIn = localStorage.getItem('loginObj');

    const userInfo = JSON.parse(isLoggedIn)
    useEffect(() => {
        const userInfo = localStorage.getItem('loginObj');
        if (userInfo !== null) {
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('loginObj');
        alert("Logged out successfully");
        navigate(''); // Redirect to /login on logout
    };
    return (
        <div>
            {isLoggedIn ? (
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-12">
                            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                                <div className="container-fluid">

                                    {userInfo && (userInfo.role === "Employee" || userInfo.role === "Admin Department Employee" || userInfo.role === "Department Head") && (
                                        <ul className="navbar-nav">

                                            <>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/ticket">Ticket</Link>
                                                </li>
                                            </>
                                        </ul>
                                    )}


                                    {userInfo && (userInfo.role === "Super Admin") && (
                                        <ul className="navbar-nav">

                                            <>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/department">Department</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/employee">Employee</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/leave">Leave</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/ticket">Ticket</Link>
                                                </li>
                                            </>
                                        </ul>
                                    )}

                                    {/* Add a logout button */}
                                    <button className="btn btn-danger" onClick={logout}>Logout</button>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};
export default Header;

import React from "react";
import { Navigate } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function PrivateRoute({ children, loggedIn }) {

    const currentUser = React.useContext(CurrentUserContext);

    return (loggedIn ? children : <Navigate to='/signin' />);
};
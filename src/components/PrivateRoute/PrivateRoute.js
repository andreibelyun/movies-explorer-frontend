import React from "react";
import { Navigate } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function PrivateRoute({ children }) {

    const currentUser = React.useContext(CurrentUserContext);

    return (currentUser.loggedIn ? children : <Navigate to='/signin' />);
};
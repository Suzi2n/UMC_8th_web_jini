import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

const ProtextedLayout = () => {
    const {accessToken} = useAuth();

    if (!accessToken) {
        return <Navigate to = {"/login"} />;
    }

    return <Outlet/>;

};

export default ProtextedLayout;
import { ReactElement, ReactNode, useContext } from "react";
import './index.scss'
import MenuMine from "./components/menu";
import { VoiceAdmin } from "../../App";
import { Navigate, Outlet } from "react-router-dom";

const IndexView = (): ReactElement<ReactNode> => {
    const { state } = useContext(VoiceAdmin);
    return (
        <div className="index-view">
            <MenuMine />
            <div className="route-view">
                {
                    state.token
                        ? <Outlet />
                        : <Navigate to="/login" />
                }
            </div>
        </div>
    )
};

export default IndexView;
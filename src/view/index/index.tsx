import { ReactElement, ReactNode } from "react";
import './index.scss'
import { Outlet } from "react-router-dom";

const IndexView = (): ReactElement<ReactNode> => {
    return (
        <div className="index-view">
            <div className="route-view">
                <Outlet />
            </div>
        </div>
    )
};

export default IndexView;
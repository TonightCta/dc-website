import { ReactElement, ReactNode } from "react";
import './index.scss'
import LoadingMine from "../../components/loading";

const CreativeView = (): ReactElement<ReactNode> => {
    return (
        <div className="creative-view">
            创作大赛管理
            <LoadingMine/>
        </div>
    )
};

export default CreativeView;
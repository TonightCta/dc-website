import { ReactElement,ReactNode } from "react";
import './index.scss'

const DefaultView = () : ReactElement<ReactNode> => {
    return (
        <div className="default-view">
            默认数据管理
        </div>
    )
};

export default DefaultView;
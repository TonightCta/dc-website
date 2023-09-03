import { ReactElement, ReactNode } from "react";
import './index.scss'
import TableMine from "./components/table.mine";

const CreatorView = (): ReactElement<ReactNode> => {
    return (
        <div className="creator-view">
            <p className="view-title">一屏</p>
            <TableMine type={1} />
            <p className="view-title">二屏</p>
            <TableMine type={2} />
        </div>
    )
};

export default CreatorView;
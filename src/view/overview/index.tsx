import { ReactElement, ReactNode, useContext, useEffect, useState } from "react";
import './index.scss'
import UsersBox from "./components/users";
import UserSourceBox from "./components/user.source";
import MintBox from "./components/mint";
import MintFreeBox from "./components/mint.free";
import SaleBox from "./components/sale";
import TradeCountBox from "./components/trade.count";
import TradeAmountBox from "./components/trade.amount";
import TradeFreeBox from "./components/trade.free";
import ContestBox from "./components/contest";
import { OverViewInfo } from "../../request/api";
import { VoiceAdmin } from "../../App";

const OverviewIndex = (): ReactElement<ReactNode> => {
    const [info, setInfo] = useState<any>();
    const { state } = useContext(VoiceAdmin);
    const getInfo = async () => {
        const result = await OverViewInfo({
            sender: state.address?.toUpperCase()
        });
        const { data } = result;
        setInfo(data)
    };
    useEffect(() => {
        getInfo();
    }, [])
    return (
        <div className="overview-index">
            <h1>总览</h1>
            <div className="flex-index">
                <UsersBox users={info?.user_infos} />
                <UserSourceBox info={info?.user_from_infos} />
                <MintBox mint={info?.mint_infos} />
                <MintFreeBox info={info?.mint_fee_infos} />
                <SaleBox info={info?.list_infos} />
                <TradeCountBox info={info?.trade_count_infos} />
                <TradeAmountBox info={info?.trade_amount_infos} />
                <TradeFreeBox info={info?.trade_fee_infos} />
                <ContestBox info={info?.competition_infos} />
            </div>
        </div>
    )
};

export default OverviewIndex;
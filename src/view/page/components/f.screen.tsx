import { ReactElement } from "react";
import IconFont from "../../../utils/icon";

interface Side {
    icon: string,
    url: string
}

const FirstScreenWapper = (): ReactElement => {
    const Sides: Side[] = [
        {
            icon: 'icon-tuite',
            url: 'https://twitter.com/MetaCollabWin'
        },
        {
            icon: 'icon-discord1',
            url: 'https://discord.com/invite/5sCg6kVt'
        },
        {
            icon: 'icon-telegram1',
            url: 'https://t.me/MetaCollabWin'
        },
    ]
    return (
        <div className="first-screen-wapper">
            <img className="logo-tag" src={require('../../../assets/images/logo.png')} alt="" />
            <div className="f-title">
                <p>{"The world's first blockchain game".toLocaleUpperCase()}</p>
                <p>{"combining Meta and RWA!".toUpperCase()}</p>
            </div>
            <div className="sides-list">
                <ul>
                    {
                        Sides.map((item: Side, index: number) => {
                            return (
                                <li key={index} onClick={() => {
                                    window.open(item.url)
                                }}>
                                    <IconFont type={item.icon} />
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
};
export default FirstScreenWapper;
// export default LaunchPadWapper;
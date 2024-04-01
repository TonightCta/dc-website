import { ReactElement } from "react";

const RightWapper = (): ReactElement => {
    return (
        <div className="right-wapper">
            <p className="right-remark">
                MetaCollabWin is an adventure simulation game themed around constructing the Bitcoin City in El Salvador.
                Players engage in activities such as participating in the city's construction, eliminating pirates, and earning
                generous in-game rewards. In addition to game items, players also have the chance to acquire MCW tokens,
                Salvadoran government bonds DNB, XDNB, digital identities, and various other mysterious rewards. By
                joining the ranks of the Bitcoin City, players can not only profit from the game but also unlock
                opportunities for wealth appreciation and exciting glory and benefits in the future. Come join the game
                and embark on an exhilarating and fun adventure journey!
            </p>
            <div className="join-us">
                <div className="left-title">
                    <p>Join The</p>
                    <p>MetaCollabWin</p>
                </div>
                <div className="submit-box">
                    <div className="inp-box">
                        <input type="text" placeholder="Enter email address"/>
                        <button>Submit</button>
                    </div>
                    <p className="submit-remark">Subscribe to our newletter to get the news and updates on metacollawin !</p>
                </div>
            </div>
            <p className="right-remrak-b">© 2024 metacollawin. ALL RIGHTS RESERVED.</p>
        </div>
    )
};

export default RightWapper;
import { ReactElement, ReactNode, useState } from "react";
import './index.scss'
import { Button, Spin } from "antd";
import { useMetamask } from "../../utils/metamask";

const LoginView = (): ReactElement<ReactNode> => {
    const { connectMetamask } = useMetamask();
    const [loading, setLoading] = useState<boolean>(false);
    const connectWallet = async () => {
        setLoading(true);
        await connectMetamask();
        setLoading(false);
    }
    return (
        <div className="login-view">
            <div className="connect-box">
                <p>Welcome to Pizzap</p>
                <Button disabled={loading} type="default" onClick={connectWallet}>
                    {
                        !loading ? <div>
                            <img src={require('../../assets/images/metamask_icon.png')} alt="" />
                            <span>Connect Metamask</span>
                        </div>
                            : <div className="loading-btn">
                                <Spin />
                            </div>
                    }
                </Button>
            </div>
        </div>
    )
};


export default LoginView; 
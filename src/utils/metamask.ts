import { message } from "antd";
import { Type, ethereum } from "./types";
import { useContext, useEffect } from "react";
import { VoiceAdmin } from "../App";
import { CheckAccount } from "../request/api";
import { useNavigate } from "react-router-dom";
export const useMetamask = () => {
    const { dispatch } = useContext(VoiceAdmin);
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            if (!ethereum) {
                return 'error'
            }
            ethereum.on('accountsChanged', async (accounts: string[]) => {
                if(!ethereum.selectedAddress){
                    return
                }
                if (accounts.length > 0) {
                    const account = await CheckAccount({
                        user_address: accounts[0]
                    });
                    const { data } = account;
                    if (!data) {
                        message.error('You do not have permission');
                        navigate('/')
                        return 'error'
                    } else {
                        dispatch({
                            type: Type.SET_TOKEN,
                            payload: {
                                token: 'is'
                            }
                        });
                        navigate('/')
                    }
                }
                if (accounts.length === 0) {
                    window.location.reload();
                }
            });
            ethereum.on('chainChanged', (res: any) => {
                // console.log(res)
            });
        }, 200)
    }, []);
    //连接钱包
    const connectMetamask = async () => {
        if (!ethereum) {
            message.error('reject');
            return 'error'
        };
        try {
            const result = await ethereum.request({ method: 'eth_requestAccounts' });
            const account = await CheckAccount({
                user_address: result[0]
            });
            const { data } = account;
            if (!data) {
                message.error('You do not have permission');
                return 'error'
            } else {
                dispatch({
                    type: Type.SET_TOKEN,
                    payload: {
                        token: 'is'
                    }
                });
                navigate('/')
            }
        } catch (err: any) {
            message.error(err.message);
            return 'error'
        }
    }
    return {
        connectMetamask
    }
};

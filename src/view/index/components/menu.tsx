import React, { ReactElement, useContext, useState } from "react";
import {
    AntDesignOutlined,
    AreaChartOutlined,
    BranchesOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    PoweroffOutlined,
    RadarChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { VoiceAdmin } from "../../../App";
import { Type } from "../../../utils/types";
type MenuItem = Required<MenuProps>['items'][number];


const getItem = (
    label: React.ReactNode,
    key: React.Key,
    url: string,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem => {
    return {
        key,
        url,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}
const items: MenuItem[] = [
    getItem('NFTs管理', '1', '/', <PieChartOutlined />),
    getItem('类别管理', '2', '/category', <BranchesOutlined />),
    getItem('集合管理', '3', '/collection', <AntDesignOutlined />),
    getItem('首屏展示', '4', '/creator', <DesktopOutlined />),
    getItem('画廊管理', '5', '/gallery', <ContainerOutlined />),
    getItem('创作大赛管理', '6', '/creative', <AreaChartOutlined />),
    getItem('默认数据管理', '7', '/default', <RadarChartOutlined />),
];
const MenuMine = (): ReactElement => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const { dispatch } = useContext(VoiceAdmin);
    const [defaultMenu, setDefaultMenu] = useState<string>('1');
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const location = useLocation();
    const switchNav = (_key: string) => {
        switch (_key) {
            case '1':
                navigate('/');
                break;
            case '2':
                navigate('/category');
                break;
            case '3':
                navigate('/collection');
                break;
            case '4':
                navigate('/creator');
                break;
            case '5':
                navigate('/gallery');
                break;
            case '6':
                navigate('/creative');
                break;
            case '7':
                navigate('/default');
                break;
            default:
                navigate('/')
        }
    };
    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setDefaultMenu('1');
                break;
            case '/category':
                setDefaultMenu('2');
                break;
            case '/collection':
                setDefaultMenu('3');
                break;
            case '/creator':
                setDefaultMenu('4');
                break;
            case '/gallery':
                setDefaultMenu('5');
                break;
            case '/creative':
                setDefaultMenu('6');
                break;
            case '/default':
                setDefaultMenu('7');
                break;
            default:
                setDefaultMenu('1')
        }
    }, [])
    return (
        <div className={`menu-mine ${collapsed ? 'close-menu' : ''}`}>
            <div>
                <img className="logo-pic" src={require('../../../assets/images/logo.png')} alt="" />
                <img className="logo-small" src={require('../../../assets/images/logo_small.png')} alt="" />
                <Menu
                    defaultSelectedKeys={[defaultMenu]}
                    selectedKeys={[defaultMenu]}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    items={items}
                    onSelect={(item) => {
                        switchNav(item.key);
                        setDefaultMenu(item.key)
                    }}
                />
            </div>
            <div className="oper-menu" onClick={toggleCollapsed}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            <div className="disconnect-box">
                <Button type="default" onClick={() => {
                    sessionStorage.removeItem('token');
                    dispatch({
                        type: Type.SET_TOKEN,
                        payload: {
                            token: ''
                        }
                    });
                    navigate('/')
                }}>
                    <PoweroffOutlined />
                    <span className="text-tag">Disconnect</span>
                </Button>
            </div>
        </div>
    )
};

export default MenuMine;
import React, { ReactElement, useState } from "react";
import {
    AreaChartOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    RadarChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
    getItem('NFTs', '1', '/', <PieChartOutlined />),
    getItem('创作者管理', '2', '/creator', <DesktopOutlined />),
    getItem('画廊管理', '3', '/gallery', <ContainerOutlined />),
    getItem('创作大赛管理', '4', '/creative', <AreaChartOutlined />),
    getItem('默认数据管理', '5', '/default', <RadarChartOutlined />),
];

const MenuMine = (): ReactElement => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
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
                navigate('/creator');
                break;
            case '3':
                navigate('gallery');
                break;
            case '4':
                navigate('creative');
                break;
            case '5':
                navigate('/default');
                break;
            default:
                navigate('/')
        }
    };
    useEffect(() => {
        console.log(location.pathname)
        switch (location.pathname) {
            case '/':
                setDefaultMenu('1');
                break;
            case '/creator':
                setDefaultMenu('2');
                break;
            case '/gallery':
                setDefaultMenu('3');
                break;
            case '/creative':
                setDefaultMenu('4');
                break;
            case '/default':
                setDefaultMenu('5');
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
        </div>
    )
};

export default MenuMine;
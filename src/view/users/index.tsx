import { ReactElement, ReactNode, useContext, useEffect, useState } from "react";
import './index.scss'
import { Button, Table, Image, message } from "antd";
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, FormOutlined, PlusOutlined } from "@ant-design/icons";
import EditModal from "./components/edit.modal";
import { UsersList, GroupList, GropuShowList } from "../../request/api";
import { VoiceAdmin } from "../../App";
import { calsAddress } from "../../utils";
import EditGropuModal from "./components/edit.group";

interface DataType {
    key: React.Key;
    user_name: string;
    user_address: string;
    user_avatar_url: string;
    avatar_url: string;
    email: string;
    link: string,
    auth_twitter: string,
    bio: string;
    auth_discord: string
}

const columns: ColumnsType<DataType> = [
    {
        title: 'User Name',
        dataIndex: 'user_name',
    },
    {
        title: 'Address',
        dataIndex: 'user_address',
        render: (_, { user_address }) => <p>
            {calsAddress(user_address)}
        </p>
    },
    {
        title: 'Avatar',
        dataIndex: 'avatar_url',
        render: (_, { avatar_url, user_avatar_url }) => <>
            <Image
                width={100}
                src={avatar_url ? avatar_url : user_avatar_url}
            />
        </>
    },
    {
        title: 'Twitter',
        dataIndex: 'auth_twitter',
    },
    {
        title: 'link',
        dataIndex: 'link',
    },
    {
        title: 'Bio',
        dataIndex: 'bio',
    },
    {
        title: 'Discord',
        dataIndex: 'auth_discord',
    }
];

export interface Group {
    group_id: number,
    group_name: string,
    group_description: string,
    is_on: boolean
}

const UsersView = (): ReactElement<ReactNode> => {
    const [visible, setVisible] = useState<boolean>(false);
    const [groupVisible, setGroupVisible] = useState<boolean>(false);
    const { state } = useContext(VoiceAdmin);
    const [data, setData] = useState<DataType[]>([]);
    const [wait, setWait] = useState<boolean>(false);
    const [operAddress, setOperAddress] = useState<string[]>([]);
    const [groupList, setGroupList] = useState<Group[]>([]);
    const [activeList, setActiveList] = useState<number>(99);
    const [page, setPage] = useState<{ total: number, page: number,size:number }>({
        total: 10,
        page: 1,
        size:10
    })
    const [groupInfo, setGroupInfo] = useState<Group>({
        group_id: 0,
        group_name: '',
        group_description: '',
        is_on: false
    });
    const getDataList = async () => {
        setWait(true);
        const result = await UsersList({
            sender: state.address,
            page_size: page.size,
            page_num: page.page,
        });
        const { data } = result;
        data.data.item = data.data.item.map((item: DataType, index: number) => {
            return {
                ...item,
                key: String(index)
            }
        });
        setWait(false);
        setPage({
            ...page,
            total: data.data.total
        });
        setData(data.data.item);
    };
    const getGroupList = async () => {
        const result = await GroupList({
            page_size: 100
        });
        const { data } = result;
        data.data.item = data.data.item.filter((item: Group) => {
            if (item.is_on) {
                return {
                    ...item
                }
            }
        });
        setGroupList(data.data.item);
    };
    const getGroupDetail = async () => {
        setWait(true);
        const result = await GropuShowList({
            group_id: groupInfo.group_id,
            page_size: 100
        });
        const { data } = result;
        data.data.item = data.data.item.map((item: DataType, index: number) => {
            return {
                ...item,
                key: String(index)
            }
        });
        setWait(false);
        setData(data.data.item);
    }
    useEffect(() => {
        getGroupList();
    }, []);
    useEffect(() => {
        activeList == 99 ? getDataList() : getGroupDetail();
    }, [activeList]);
    useEffect(() => {
        getDataList()
    }, [page.page,page.size])
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            const arr: string[] = [];
            selectedRows.forEach((e: DataType) => {
                arr.push(e.user_address)
            });
            setOperAddress(arr);
        },
    };
    return (
        <div className="users-view">
            <div className="group-box">
                <p className="view-title">用户组总览</p>
                <div className="group-list">
                    <ul>
                        {
                            groupList.map((item: Group, index: number) => {
                                return (
                                    <li key={index} onClick={() => {
                                        setGroupInfo(item);
                                        setGroupVisible(true)
                                    }}>
                                        <p>{item.group_name}</p>
                                        <EditOutlined />
                                    </li>
                                )
                            })
                        }
                        <li>
                            <Button type="primary" onClick={() => {
                                setGroupInfo({
                                    group_id: 0,
                                    group_name: '',
                                    group_description: '',
                                    is_on: true
                                })
                                setGroupVisible(true)
                            }}>
                                <PlusOutlined />
                                Add
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="n-top">
                <div className="title-oper">
                    <p className="view-title">用户管理</p>
                    <ul>
                        <li className={`${activeList === 99 ? 'active-list-tab' : ''}`} onClick={() => {
                            setActiveList(99)
                        }}>All</li>
                        {
                            groupList.map((item: Group, index: number) => {
                                return (
                                    <li key={index} className={`${activeList === index ? 'active-list-tab' : ''}`} onClick={() => {
                                        setActiveList(index);
                                        setGroupInfo(item);
                                    }}>{item.group_name}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <Button disabled={operAddress.length < 1} type="primary" onClick={() => {
                    if (operAddress.length < 5) {
                        message.error(`用户组最少需要5位用户,当前用户数${operAddress.length}`);
                        return
                    }
                    setVisible(true)
                }}>
                    <FormOutlined />
                    Edit
                </Button>
            </div>
            <div className="data-box">
                <Table
                    loading={wait}
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    pagination={{
                        total: page.total,
                        onChange: (e,size) => {
                            setPage({
                                ...page,
                                page: e,
                                size:size
                            })
                        }
                    }}
                    columns={columns}
                    dataSource={data}
                />
            </div>
            <EditModal operAddress={operAddress} visible={visible} closeModal={(val: boolean) => {
                setVisible(val)
            }} />
            <EditGropuModal upDate={getGroupList} info={groupInfo} visible={groupVisible} closeModal={(val: boolean) => {
                setGroupVisible(val);
            }} />
        </div>
    )
};

export default UsersView;
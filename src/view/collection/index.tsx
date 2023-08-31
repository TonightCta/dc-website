import { EditOutlined, FileTextOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Table, Image, Tooltip } from "antd";
import { ReactElement, ReactNode, useEffect, useMemo, useState } from "react";
import type { ColumnsType } from 'antd/es/table';
import './index.scss'
import { CollectionList } from "../../request/api";
import { calsAddress } from "../../utils";
import EditCollectionModal from "./components/edit.collection";
import InfoModal from "./components/info.modal";


export interface DataType {
    key: string;
    collection_id: number,
    collection_name: string;
    contract_address: string;
    creator: string;
    discord_link: string;
    medium_link: string,
    tg_link: string,
    twitter_link: string,
    website_link: string,
    bg_image_minio_url: string,
    logo_minio_url: string,
    collection_description: string
}

const CollectionView = (): ReactElement<ReactNode> => {
    const [list, setList] = useState<DataType[]>([]);
    const [infoModal, setInfoModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [collectionMsg, setCollectionMsg] = useState<DataType>()
    const getList = async () => {
        const result = await CollectionList({
            page_size: 500
        });
        const { data } = result;
        data.data.item = data.data.item.map((item: DataType, index: number) => {
            return {
                ...item,
                key: index
            }
        })
        setList(data.data.item);
    };
    const [arrow, setArrow] = useState('Show');
    const mergedArrow = useMemo(() => {
        if (arrow === 'Hide') {
            return false;
        }

        if (arrow === 'Show') {
            return true;
        }

        return {
            pointAtCenter: true,
        };
    }, [arrow]);
    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'collection_name',
            key: 'collection_name',
        },
        {
            title: 'Description',
            dataIndex: 'collection_description',
            key: 'collection_description',
            render: (_, { collection_description }) => (
                <Tooltip placement="top" title={collection_description} arrow={mergedArrow}>
                    <p className="text-overflow">{collection_description}</p>
                </Tooltip>
            )
        },
        {
            title: 'Background Image',
            dataIndex: 'bg_image_minio_url',
            key: 'bg_image_minio_url',
            render: (_, { bg_image_minio_url }) => <div>
                <Image
                    width={100}
                    src={bg_image_minio_url}
                />
            </div>
        },
        {
            title: 'Logo Image',
            dataIndex: 'logo_minio_url',
            key: 'logo_minio_url',
            render: (_, { logo_minio_url }) => <div>
                <Image
                    width={60}
                    src={logo_minio_url}
                />
            </div>
        },
        {
            title: 'Creator',
            dataIndex: 'creator',
            key: 'creator',
            render: (_, { creator }) => (
                <Tooltip placement="top" title={creator} arrow={mergedArrow}>
                    <p className="text-overflow">{calsAddress(creator)}</p>
                </Tooltip>
            )
        },
        {
            title: 'Discord',
            key: 'discord_link',
            dataIndex: 'discord_link',
            render: (_, { discord_link }) => (
                <Tooltip placement="top" title={discord_link} arrow={mergedArrow}>
                    <p className="text-overflow">{calsAddress(discord_link)}</p>
                </Tooltip>
            )
        },
        {
            title: 'Medium',
            key: 'medium_link',
            dataIndex: 'medium_link',
            render: (_, { medium_link }) => (
                <Tooltip placement="top" title={medium_link} arrow={mergedArrow}>
                    <p className="text-overflow">{calsAddress(medium_link)}</p>
                </Tooltip>
            )
        },
        {
            title: 'Telegram',
            key: 'tg_link',
            dataIndex: 'tg_link',
            render: (_, { tg_link }) => (
                <Tooltip placement="top" title={tg_link} arrow={mergedArrow}>
                    <p className="text-overflow">{calsAddress(tg_link)}</p>
                </Tooltip>
            )
        },
        {
            title: 'Twitter',
            key: 'twitter_link',
            dataIndex: 'twitter_link',
            render: (_, { twitter_link }) => (
                <Tooltip placement="top" title={twitter_link} arrow={mergedArrow}>
                    <p className="text-overflow">{calsAddress(twitter_link)}</p>
                </Tooltip>
            )
        },
        {
            title: 'Website',
            key: 'website_link',
            dataIndex: 'website_link',
            render: (_, { website_link }) => (
                <Tooltip placement="top" title={website_link} arrow={mergedArrow}>
                    <p className="text-overflow">{calsAddress(website_link)}</p>
                </Tooltip>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div className="oper-btn">
                    <EditOutlined onClick={() => {
                        setCollectionMsg(record)
                        setEditModal(true)
                    }} />
                    <FileTextOutlined onClick={() => {
                        setCollectionMsg(record)
                        setInfoModal(true)
                    }} />
                </div>
            ),
        },
    ];
    useEffect(() => {
        getList()
    }, []);
    return (
        <div className="collection-view">
            <p className="view-title">
                集合列表
                <Button type="primary" onClick={() => {
                    setEditModal(true);
                    setCollectionMsg(undefined);
                }}>
                    <PlusOutlined />
                    Add
                </Button>
            </p>
            <div className="data-list">
                <Table columns={columns} dataSource={list} />
            </div>
            <InfoModal collectionID={collectionMsg?.collection_id as number} visible={infoModal} closeModal={(val: boolean) => {
                setInfoModal(val)
            }} />
            <EditCollectionModal info={collectionMsg} visible={editModal} closeModal={(val: boolean) => {
                setEditModal(val)
            }} />
        </div>
    )
};


export default CollectionView;
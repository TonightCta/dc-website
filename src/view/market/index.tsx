import { ReactElement, ReactNode, useContext, useEffect, useState } from "react";
import './index.scss'
import type { ColumnsType } from 'antd/es/table';
import { Table, Image, Tooltip, Popconfirm, message } from "antd";
import { OrderList, TakeOffNFT } from "../../request/api";
import Web3 from "web3";
import currentProvider from 'web3'
import { calsAddress } from "../../utils";
import { DisconnectOutlined } from "@ant-design/icons";
import { VoiceAdmin } from "../../App";
const win: any = window;
const { ethereum } = win;
const web3 = new Web3(ethereum || currentProvider);

interface DataType {
    key: string;
    file_image_minio_url: string;
    file_name: string;
    price: string;
    seller: string;
    tx_hash: string;
    paymod: string;
    order_id: string
}


const MarketView = (): ReactElement<ReactNode> => {
    const [data, setData] = useState<DataType[]>([]);
    const { state } = useContext(VoiceAdmin);
    const [wait, setWait] = useState<boolean>(false);
    const [page, setPage] = useState<{ page: number, total: number, size: number }>({
        page: 1,
        total: 10,
        size: 10
    })
    const getDataList = async () => {
        setWait(true);
        const result = await OrderList({ page_size: page.size,page_num:page.page });
        const { data } = result;
        setPage({
            ...page,
            total: data.data.total
        })
        data.data.item = data.data.item.map((item: DataType, index: number) => {
            return item = {
                ...item,
                key: String(index),
            }
        });
        setWait(false);
        setData(data.data.item);
    };
    const [orderID, setOrderID] = useState<string>('');
    useEffect(() => {
        getDataList();
    }, [page.size,page.page]);
    const columns: ColumnsType<DataType> = [
        {
            title: 'NFT',
            dataIndex: 'file_image_minio_url',
            key: 'file_image_minio_url',
            render: (_, { file_image_minio_url }) => (
                <Image
                    width={100}
                    src={file_image_minio_url}
                />
            )
        },
        {
            title: 'NFT Name',
            dataIndex: 'file_name',
            key: 'file_name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (_, { price, paymod }) => (
                <p>{web3.utils.fromWei(price)}&nbsp;{paymod}</p>
            )
        },
        {
            title: 'Seller',
            key: 'seller',
            dataIndex: 'seller',
        },
        {
            title: 'Tx Hash',
            key: 'tx_hash',
            dataIndex: 'tx_hash',
            render: (_, { tx_hash }) => (
                <Tooltip title={tx_hash}>
                    <p style={{ cursor: 'pointer' }} onClick={() => {
                        window.open(`https://v2-piscan.plian.org/tx/${tx_hash}`)
                    }}>{calsAddress(tx_hash)}</p>
                </Tooltip>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, { order_id }) => (
                <Popconfirm
                    title="Take off the shelves"
                    description="This operation will remove the current NFT. Do you want to continue?"
                    onConfirm={confirmTakeoff}
                    okText="Yes"
                    cancelText="No"
                >
                    <DisconnectOutlined onClick={() => {
                        setOrderID(order_id)
                    }} />
                </Popconfirm>
            )
        },
    ];
    const confirmTakeoff = async () => {
        const result: any = await TakeOffNFT({
            sender: state.address,
            order_ids: [+orderID]
        });
        const { status } = result;
        if (status !== 200) {
            message.error(result.msg);
            return
        };
        message.success('Removed successfully');
        getDataList();
    }
    return (
        <div className="market-view">
            <p className="view-title">市场NFT列表(已上架)</p>
            <Table columns={columns} loading={wait} dataSource={data} pagination={{
                total: page.total,
                onChange: (current, size) => {
                    setPage({
                        ...page,
                        page:current,
                        size:size
                    })
                }
            }} />
        </div>
    )
};

export default MarketView;
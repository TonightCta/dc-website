import { Table, Image } from "antd";
import { ReactElement, useContext, useEffect, useState } from "react";
import type { ColumnsType } from 'antd/es/table';
import { AllNfts, CollectionList } from "../../../request/api";
import { VoiceAdmin } from "../../../App";
import { EditOutlined } from "@ant-design/icons";
import EditNftModal from "./edit.nft";

interface Props {
    collection: number,
    category: number,
    label: number[],
    sort: number,
    sortBy: number
}

interface DataType {
    key: string;
    token_id: number;
    minter: string;
    image_ipfs: string;
    name: string;
    collection_id: number,
    fid: number,
    collection_name: string
}

const TableList = (props: Props): ReactElement => {
    const [data, setData] = useState<DataType[]>([]);
    const [wait, setWait] = useState<boolean>(false);
    const { state } = useContext(VoiceAdmin);
    const [visible, setVisible] = useState<boolean>(false);
    const [fid, setFid] = useState<number>(0);
    const columns: ColumnsType<DataType> = [
        {
            title: 'Token ID',
            dataIndex: 'token_id',
            key: 'token_id',
            align: 'left'
        },
        {
            title: 'NFT',
            dataIndex: 'nft',
            key: 'nft',
            render: (_, { image_ipfs }) => (
                <div className="nft-box">
                    <Image
                        width={100}
                        height={100}
                        src={image_ipfs}
                    />
                </div>
            )
        },
        {
            title: 'Minter',
            dataIndex: 'minter',
            key: 'minter',
        },
        {
            title: 'NFT Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Collection',
            dataIndex: 'collection_name',
            key: 'collection_name',
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (_, { fid }) => (
                <div style={{cursor:'pointer'}} onClick={() => {
                    setFid(fid);
                    setVisible(true);
                }}>
                    <EditOutlined />
                </div>
            )
        }
    ];
    const getData = async () => {
        const collection = await CollectionList({});
        setWait(true);
        const result = await AllNfts({
            chain_id: '8007736',
            contract_address: '0xa2822ac2662fe0cbf470d5721e24f8508ec43d33',
            collection_id: props.collection,
            category_id: props.category,
            label_ids: props.label,
            sender: state.address,
            page_size: 500,
            page_num: 1,
            sort: props.sort,
            sort_by: props.sortBy
        });
        setWait(false);
        const { data } = result;
        if (!data.data.item) {
            setData([])
            return
        }
        data.data.item = data.data.item.map((item: DataType, index: number) => {
            return item = {
                ...item,
                key: String(index),
                collection_name: ''
            }
        });
        data.data.item.forEach((item: DataType) => {
            collection.data.data.item.forEach((coll: DataType) => {
                if (item.collection_id === coll.collection_id) {
                    item.collection_name = coll.collection_name;
                }
            });
        })
        setData(data.data.item);
    };
    useEffect(() => {
        getData();
    }, [props.collection, props.category, props.label, props.sort, props.sortBy])
    return (
        <>
            <Table dataSource={data} loading={wait} scroll={{ y: 560 }} columns={columns} />
            <EditNftModal fid={fid} visible={visible} closeModal={(val: boolean) => {
                setVisible(val);
            }} />
        </>
    )
};


export default TableList;
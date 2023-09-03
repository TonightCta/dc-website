import { Table, Image, Button } from "antd";
import { ReactElement, useContext, useEffect, useState } from "react";
import type { ColumnsType } from 'antd/es/table';
import { AllNfts, CollectionList } from "../../../request/api";
import { VoiceAdmin } from "../../../App";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
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
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [fids, setFids] = useState<number[]>([]);
    const [tokenID,setTokenID] = useState<number>(0);
    const f: number[] = [];
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
        data.forEach((item: DataType) => {
            newSelectedRowKeys.forEach((n: React.Key) => {
                if (item.key === n) {
                    f.push(item.fid)
                }
            })
        });
        console.log(f);
        setFids(f);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const columns: ColumnsType<DataType> = [
        {
            title: 'Fid',
            dataIndex: 'fid',
            key: 'fid',
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
            title: 'Above the fold',
            dataIndex: 'collection_name',
            key: 'collection_name',
            render:(_,{ collection_name }) => <p>-</p>,
            align:'center'
        },
        {
            title: 'Competition',
            dataIndex: 'collection_name',
            key: 'collection_name',
            render:(_,{ collection_name }) => <p>-</p>,
            align:'center'
        },
        {
            title: 'Gallery',
            dataIndex: 'collection_name',
            key: 'collection_name',
            render:(_,{ collection_name }) => <p>-</p>,
            align:'center'
        },
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
        });
        setData(data.data.item);
    };
    useEffect(() => {
        getData();
    }, [props.collection, props.category, props.label, props.sort, props.sortBy])
    return (
        <>
            <div className="filter-oper">
                <div className="search-box">
                    <input type="text" placeholder="Please enter" />
                    <div className="search-btn">
                        <SearchOutlined />
                    </div>
                </div>
                <div>
                    <Button type="primary" disabled={fids.length === 0} onClick={() => {
                        setVisible(true)
                    }}>
                        <EditOutlined />
                        Edit
                    </Button>
                </div>
            </div>
            <Table rowSelection={rowSelection} dataSource={data} loading={wait} scroll={{ y: 560 }} columns={columns} />
            <EditNftModal fid={fids} visible={visible} closeModal={(val: boolean) => {
                setVisible(val);
            }} />
        </>
    )
};


export default TableList;
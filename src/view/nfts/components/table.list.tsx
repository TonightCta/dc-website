import { Table, Image, Button, Switch, message } from "antd";
import { ReactElement, useContext, useEffect, useState } from "react";
import type { ColumnsType } from 'antd/es/table';
import { AllNfts, CollectionList, PosterSet } from "../../../request/api";
import { VoiceAdmin } from "../../../App";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import EditNftModal from "./edit.nft";
import { useLocation } from "react-router-dom";

interface Props {
    collection: number,
    category: number,
    label: number[],
    sort: number,
    sortBy: number,
    poster1: boolean,
    poster2: boolean
}

interface DataType {
    key: string;
    token_id: number;
    minter: string;
    image_ipfs: string;
    name: string;
    collection_id: number,
    fid: number,
    collection_name: string,
    is_homepage_poster1: boolean,
    is_homepage_poster2: boolean
}

const TableList = (props: Props): ReactElement => {
    const [data, setData] = useState<DataType[]>([]);
    const [wait, setWait] = useState<boolean>(false);
    const { state } = useContext(VoiceAdmin);
    const [visible, setVisible] = useState<boolean>(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [fids, setFids] = useState<number[]>([]);
    // const [tokenID, setTokenID] = useState<number>(0);
    const location = useLocation();
    const f: number[] = [];
    const onSelectChange = (newSelectedRowKeys: React.Key[], firstData?: DataType[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
        if (firstData) {
            firstData.forEach((item: DataType) => {
                newSelectedRowKeys.forEach((n: React.Key) => {
                    if (item.key === n) {
                        f.push(item.fid)
                    }
                })
            });
        } else {
            data.forEach((item: DataType) => {
                newSelectedRowKeys.forEach((n: React.Key) => {
                    if (item.key === n) {
                        f.push(item.fid)
                    }
                })
            });
        }
        setFids(f);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const [paginationProps, setPaginationProps] = useState({
        current: 1,
        pageSize: 10,
        total: 100,
    });
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
            title: 'Screen one',
            dataIndex: 'collection_name',
            key: 'collection_name',
            render: (_, { is_homepage_poster1,fid }) => <Switch checked={is_homepage_poster1} onChange={async (val: boolean) => {
                const result:any = await PosterSet({
                    fids:[fid],
                    screen_no:1,
                    is_on:!is_homepage_poster1,
                    sender:state.address
                });
                const { status,data } = result;
                if(status !== 200){
                    message.error(result.error);
                    return 
                };
                message.success(data);
                getData();
            }} />,
            align: 'center'
        },
        {
            title: 'Screen two',
            dataIndex: 'collection_name',
            key: 'collection_name',
            render: (_, { is_homepage_poster2,fid }) => <Switch checked={is_homepage_poster2} onChange={async (val: boolean) => {
                const result:any = await PosterSet({
                    fids:[fid],
                    screen_no:2,
                    is_on:!is_homepage_poster2,
                    sender:state.address
                });
                const { status,data } = result;
                if(status !== 200){
                    message.error(result.error);
                    return 
                };
                message.success(data);
                getData();
            }} />,
            align: 'center'
        },
        // {
        //     title: 'Gallery',
        //     dataIndex: 'collection_name',
        //     key: 'collection_name',
        //     render:(_,{ collection_name }) => <p>-</p>,
        //     align:'center'
        // },
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
            page_size: paginationProps.pageSize,
            page_num: paginationProps.current,
            sort: props.sort,
            sort_by: props.sortBy,
            is_homepage_poster1: props.poster1 ? true : false,
            is_homepage_poster2: props.poster2 ? true : false,
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
        const arr: React.Key[] = [];
        const arr2: React.Key[] = [];
        data.data.item.forEach((item: DataType, index: number) => {
            collection.data.data.item.forEach((coll: DataType) => {
                if (item.collection_id === coll.collection_id) {
                    item.collection_name = coll.collection_name;
                }
            });
            if (item.is_homepage_poster1 && location.pathname === '/nfts-screen') {
                arr.push(String(index));
            }
            if (item.is_homepage_poster2 && location.pathname === '/nfts-screen-2') {
                arr2.push(String(index));
            }
        });
        setPaginationProps({
            ...paginationProps,
            total: data.data.total
        })
        setData(data.data.item);
        location.pathname === '/nfts-screen' && onSelectChange(arr, data.data.item);
        location.pathname === '/nfts-screen-2' && onSelectChange(arr2, data.data.item);
    };
    useEffect(() => {
        getData();
        onSelectChange([]);
    }, [props.collection, props.category, props.label, props.sort, props.sortBy, location.pathname, paginationProps.current, props.poster1,props.poster2, paginationProps.pageSize]);
    return (
        <div className="table-list-mine">
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
            {/* pagination={paginationProps} */}
            {/* onChange={(e) => {
                setPaginationProps({
                    ...paginationProps,
                    current: +(e.current as any)
                })
            }} */}
            <Table rowSelection={rowSelection} dataSource={data} loading={wait} scroll={{ y: 560 }} columns={columns} pagination={{
                total: paginationProps.total,
                onChange: (e, size) => {
                    setPaginationProps({
                        ...paginationProps,
                        current: e,
                        pageSize: size
                    })
                }
            }} />
            <EditNftModal fid={fids} visible={visible} closeModal={(val: boolean) => {
                setVisible(val);
            }} />
        </div>
    )
};


export default TableList;
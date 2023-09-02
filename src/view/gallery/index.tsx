import { ReactElement, ReactNode, useEffect, useState } from "react";
import './index.scss'
import { Select, Table, Image } from "antd";
import PeriodList, { Period } from "./components/period.list";
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined } from "@ant-design/icons";
import { GalleryList } from "../../request/api";

interface DataType {
    key: string;
    file_name: string;
    file_ipfs_url: string;
    minter: string;
    chain_id: string;
    minter_name: string
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'file_name',
        key: 'file_name',
    },
    {
        title: 'NFT',
        dataIndex: 'file_ipfs_url',
        key: 'file_ipfs_url',
        render: (_, { file_ipfs_url }) => <div>
            <Image
                width={100}
                src={file_ipfs_url}
            />
        </div>
    },
    {
        title: 'Minter',
        dataIndex: 'minter',
        key: 'minter',
    },
    {
        title: 'minter_name',
        key: 'minter_name',
        dataIndex: 'minter_name',
    },
    {
        title: 'Chain',
        key: 'chain_id',
        dataIndex: 'chain_id',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <div>
                <EditOutlined />
            </div>
        ),
    },
];

const GalleryView = (): ReactElement<ReactNode> => {
    const handlePeriodChange = async (value: string) => {
        setSelectPer(value)
    };
    const [wait,setWait] = useState<boolean>(false);
    const [periodList, setPeriodList] = useState<{ value: string, label: string }[]>([]);
    const [selectPer, setSelectPer] = useState<string>('1');
    const [galleryList, setGallery] = useState<DataType[]>([]);
    const getGalleryList = async () => {
        setWait(true);
        const result = await GalleryList({
            series_id: +selectPer,
            page_size: 500
        });
        setWait(false);
        const { data } = result;
        if (!data.data.item) {
            setGallery([]);
            return
        }
        data.data.item = data.data.item.map((item: DataType, index: number) => {
            return {
                ...item,
                key: index
            }
        });
        setGallery(data.data.item);
    };
    useEffect(() => {
        getGalleryList();
    }, [selectPer])
    return (
        <div className="gallery-view">
            <PeriodList outsidePeriod={(list: Period[]) => {
                setSelectPer(String(list[0].series_id))
                const list_inner: { value: string, label: string }[] = list.map((item: Period) => {
                    return {
                        value: String(item.series_id),
                        label: item.series_name
                    }
                });
                setPeriodList(list_inner)
            }} />
            <div className="data-title">
                <p>当前展示:</p>
                <Select
                    value={selectPer}
                    style={{ width: 120 }}
                    onChange={handlePeriodChange}
                    options={periodList}
                />
            </div>
            <div className="data-list">
                <Table loading={wait} columns={columns} dataSource={galleryList} />
            </div>
        </div>
    )
};

export default GalleryView;
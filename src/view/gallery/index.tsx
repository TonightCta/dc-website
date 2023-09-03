import { ReactElement, ReactNode, useEffect, useState } from "react";
import './index.scss'
import { Select, Table, Image } from "antd";
import type { ColumnsType } from 'antd/es/table';
import { GalleryList, GalleryPeriod, GrallertCalssList } from "../../request/api";
import ClassList from "./components/class.list";

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
];

const GalleryView = (): ReactElement<ReactNode> => {
    const handleClassChange = (value: string) => {
        setSelectClass(value);
        getPeriodInfo(+value);
    }
    const [classList, setClassList] = useState<{ value: string, label: string }[]>([])
    const [wait, setWait] = useState<boolean>(false);
    const [periodList, setPeriodList] = useState<{ value: string, label: string }[]>([]);
    const [selectPer, setSelectPer] = useState<string>('1');
    const [selectClass, setSelectClass] = useState<string>('1');
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
    }, [selectPer]);
    const getClassInfo = async () => {
        const tt = await GrallertCalssList({});
        const { data } = tt;
        data.data.item = data.data.item.map((item: { class_id: number, class_name: string }, index: number) => {
            return {
                value: String(item.class_id),
                label: item.class_name
            }
        });
        setClassList(data.data.item);
    }
    const getPeriodInfo = async (_id?: number) => {
        const result = await GalleryPeriod({
            class_id: _id ? _id : 1
        });
        const { data } = result;
        data.data.item = data.data.item.map((item: { series_id: number, series_name: string }, index: number) => {
            return {
                value: String(item.series_id),
                label: item.series_name
            }
        });
        _id &&  setSelectPer(data.data.item[0].value);
        setPeriodList(data.data.item);
    };
    useEffect(() => {
        getClassInfo();
        getPeriodInfo();
    }, [])
    return (
        <div className="gallery-view">
            <ClassList/>
            <div className="data-title">
                <p>当前展示:</p>
                <Select
                    value={selectClass}
                    style={{ width: 120 }}
                    onChange={handleClassChange}
                    options={classList}
                />
                <ul>
                    {
                        periodList.map((item: { value: string, label: string }, index: number) => {
                            return (
                                <li key={index} className={`${selectPer === item.value ? 'active-per' : ''}`} onClick={() => {
                                    setSelectPer(item.value);
                                }}>
                                    {item.label}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="data-list">
                <Table loading={wait} columns={columns} dataSource={galleryList} />
            </div>
        </div>
    )
};

export default GalleryView;

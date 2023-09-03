import { ReactElement, useEffect, useState } from "react";
import { ScreenList1, ScreenList2 } from '../../../request/api'
import type { ColumnsType } from 'antd/es/table';
import { Table, Image } from "antd";

interface DataType {
    key: string;
    hposter_id: number;
    file_ipfs_url: string;
    file_name: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Poster ID',
        dataIndex: 'hposter_id',
        key: 'hposter_id',
    },
    {
        title: 'NFT',
        dataIndex: 'file_ipfs_url',
        key: 'file_ipfs_url',
        render: (_, { file_ipfs_url }) => (
            <Image
                width={100}
                src={file_ipfs_url}
            />
        )
    },
    {
        title: 'NFT Name',
        dataIndex: 'file_name',
        key: 'file_name',
    },
];

interface Props {
    type: number
}

const TableMine = (props: Props): ReactElement => {
    const [data, setData] = useState<DataType[]>([]);
    const getDataList = async () => {
        const result = props.type === 1 ? await ScreenList1({}) : await ScreenList2({});
        const { data } = result;
        data.data.item = data.data.item.map((item: DataType, index: number) => {
            return item = {
                ...item,
                key: String(index),
            }
        });
        setData(data.data.item);
    };
    useEffect(() => {
        getDataList();
    }, [])
    return (
        <div className="table-mine">
            <Table columns={columns} dataSource={data} />
        </div>
    )
};

export default TableMine;
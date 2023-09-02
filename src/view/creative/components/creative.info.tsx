import { Modal, Table, Image } from "antd";
import { ReactElement, useEffect, useState } from "react";
import type { ColumnsType } from 'antd/es/table';
import { CompetitionNFTList } from "../../../request/api";

interface Props {
    visible: boolean,
    closeModal: (val: boolean) => void,
    competitionID: number
}

interface DataType {
    key: string;
    token_id: number;
    minter: string;
    item_ipfs_url: string;
    file_name: string;
    collection_id: number,
    fid: number,
    name: string,
    submitter:string
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Token ID',
        dataIndex: 'token_id',
        key: 'token_id',
        align: 'left'
    },
    {
        title: 'NFT',
        dataIndex: 'item_ipfs_url',
        key: 'item_ipfs_url',
        render: (_, { item_ipfs_url }) => (
            <div className="nft-box">
                <Image
                    width={100}
                    height={100}
                    src={item_ipfs_url}
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
        title:'Submitter',
        dataIndex:'submitter',
        key:'submitter'
    },
    {
        title: 'NFT Name',
        dataIndex: 'name',
        key: 'name',
    },
];

const ComInfoModal = (props: Props): ReactElement => {
    const [visible, setVisible] = useState<boolean>(false);
    const [wait, setWait] = useState<boolean>(false);
    const [data, setData] = useState<DataType[]>([]);
    const getData = async () => {
        setWait(true);
        const result = await CompetitionNFTList({
            competition_id: props.competitionID,
            page_size: 500
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
            }
        });
        setData(data.data.item);
    }
    const handleCancel = () => {
        setVisible(false);
        props.closeModal(false);
    };
    useEffect(() => {
        props.visible && getData();
        setVisible(props.visible);
    }, [props.visible])
    return (
        <Modal title="Competition Info" width={1000} footer={null} open={visible} onCancel={handleCancel}>
            <Table dataSource={data} loading={wait} scroll={{ y: 560 }} columns={columns} />
        </Modal>
    )
};

export default ComInfoModal;
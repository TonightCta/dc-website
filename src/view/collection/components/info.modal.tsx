import { Modal, Table, Image } from "antd";
import { ReactElement, useEffect, useState } from "react";
import type { ColumnsType } from 'antd/es/table';
import { CollectionNFTList } from "../../../request/api";

interface Props {
    visible: boolean,
    closeModal: (val: boolean) => void,
    collectionID: number
}

interface DataType {
    key: string;
    token_id: number;
    minter: string;
    image_ipfs: string;
    file_name: string;
    collection_id: number,
    fid: number,
    collection_name: string
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
        dataIndex: 'file_name',
        key: 'file_name',
    },
];

const InfoModal = (props: Props): ReactElement => {
    const [visible, setVisible] = useState<boolean>(false);
    const [wait, setWait] = useState<boolean>(false);
    const [data, setData] = useState<DataType[]>([]);
    const getData = async () => {
        setWait(true);
        const result = await CollectionNFTList({
            collection_id: props.collectionID,
            category_id: 0,
            label_ids: [],
            sort: 0,
            sort_by: 1,
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
        <Modal title="Collection Info" width={1000} footer={null} open={visible} onCancel={handleCancel}>
            <Table dataSource={data} loading={wait} scroll={{ y: 560 }} columns={columns} />
        </Modal>
    )
};

export default InfoModal;
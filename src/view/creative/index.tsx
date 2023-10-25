import { ReactElement, ReactNode, useEffect, useState } from "react";
import './index.scss'
import { Button, Table, Image } from "antd";
import { EditOutlined, FileTextOutlined, PlusOutlined } from "@ant-design/icons";
import { CompetitionList } from "../../request/api";
import type { ColumnsType } from 'antd/es/table';
import { DateConvert } from "../../utils";
import ComInfoModal from "./components/creative.info";
import EditCompetitionModal from "./components/creative.edit";

export interface DataType {
    key: string;
    name: string;
    description: string;
    logo_minio: string;
    bg_image_minio: string;
    poster_minio: string;
    start_time: number;
    end_time: number;
    competition_id: number;
    is_online: boolean;
}

const CreativeView = (): ReactElement<ReactNode> => {
    const [data, setData] = useState<DataType[]>([]);
    const [infoMsg, setInfoMsg] = useState<DataType>();
    const [infoModal, setInfoModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const getCtrativeList = async () => {
        const result = await CompetitionList({
            page_size: 500
        });
        const { data } = result;
        if (!data.data.item) {
            setData([]);
            return
        }
        data.data.item = data.data.item.map((item: DataType, index: number) => {
            return {
                ...item,
                key: index
            }
        });
        setData(data.data.item)
    };
    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Logo',
            dataIndex: 'logo_minio',
            key: 'logo_minio',
            render: (_, { logo_minio }) => <div>
                <Image
                    width={100}
                    src={logo_minio}
                />
            </div>
        },
        {
            title: 'Background Image',
            key: 'bg_image_minio',
            dataIndex: 'bg_image_minio',
            render: (_, { bg_image_minio }) => <div>
                <Image
                    width={100}
                    src={bg_image_minio}
                />
            </div>
        },
        {
            title: 'Poster',
            key: 'poster_minio',
            dataIndex: 'poster_minio',
            render: (_, { poster_minio }) => <div>
                <Image
                    width={100}
                    src={poster_minio}
                />
            </div>
        },
        {
            title: 'Start',
            key: 'start_time',
            dataIndex: 'start_time',
            render: (_, { start_time }) => <div>
                <p>{DateConvert(start_time)}</p>
            </div>
        },
        {
            title: 'End',
            key: 'end_time',
            dataIndex: 'end_time',
            render: (_, { end_time }) => <div>
                <p>{DateConvert(end_time)}</p>
            </div>
        },
        {
            title: 'Online',
            key: 'is_online',
            dataIndex: 'is_online',
            render: (_, { is_online }) => <div>
                <p style={{ color: `${is_online ? 'green' : 'red'}` }}>{is_online ? 'In progress' : 'Over'}</p>
            </div>
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => <div className="oper-btn">
                <EditOutlined onClick={() => {
                    setEditModal(true);
                    setInfoMsg(record)
                }} />
                <FileTextOutlined onClick={() => {
                    setInfoModal(true);
                    setInfoMsg(record)
                }} />
            </div>
        },
    ];
    useEffect(() => {
        getCtrativeList()
    }, [])
    return (
        <div className="creative-view">
            <p className="view-title">
                大赛列表
                <Button type="primary" onClick={() => {
                    setEditModal(true);
                    setInfoMsg(undefined)
                }}>
                    <PlusOutlined />
                    Add
                </Button>
            </p>
            <div className="creative-table">
                <Table columns={columns} dataSource={data} />
            </div>
            <ComInfoModal visible={infoModal} closeModal={(val: boolean) => {
                setInfoModal(val)
            }} competitionID={infoMsg?.competition_id as number} />
            <EditCompetitionModal upDate={() => {
                getCtrativeList()
            }} visible={editModal} closeModal={(val: boolean) => {
                setEditModal(val)
            }} info={infoMsg} />
        </div>
    )
};

export default CreativeView;
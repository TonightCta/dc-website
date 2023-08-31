import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import './index.scss'
import { CloudUploadOutlined, EditOutlined, PlayCircleOutlined, PlusOutlined, PoweroffOutlined } from "@ant-design/icons";
import { Button, Spin, Table } from "antd";
import { useMediaRecorder } from "../../hooks/record";
import type { ColumnsType } from 'antd/es/table';
import { CategoryList } from "../../request/api";
import AddCategory from "./components/add.category";

interface DataType {
    key: string;
    category_name: string;
    category_description: string;
    category_id: number;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'category_name',
        key: 'category_name',
    },
    {
        title: 'Description',
        dataIndex: 'category_description',
        key: 'category_description',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <div style={{ cursor: 'pointer' }}>
                <EditOutlined />
            </div>
        ),
    },
];
const DefaultView = (): ReactElement<ReactNode> => {
    const [upAvatar, setUpAvatar] = useState<boolean>(false);
    const [upBg, setUpBg] = useState<boolean>(false);
    const { audioFile, mediaUrl, startRecord, stopRecord } = useMediaRecorder();
    const [audio, setAudio] = useState<string>('');
    const [record, setRecord] = useState<boolean>(false);
    const audioRef: any = useRef(null);
    const [categoryList, setCategoryList] = useState<DataType[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [editMsg, setEditMsg] = useState<{ id: number, name: string, desc: string }>({
        id: 0,
        name: '',
        desc: ''
    })
    const getCategoryList = async () => {
        const result: any = await CategoryList({});
        const { data } = result;
        data.data.item = data.data.item.map((item: any, index: number) => {
            return {
                ...item,
                key: String(index)
            }
        });
        setCategoryList(data.data.item);
    }
    useEffect(() => {
        getCategoryList();
    }, [])
    useEffect(() => {
        setAudio(mediaUrl);
        setTimeout(() => {
            mediaUrl && audioRef.current.play()
        }, 100)
    }, [mediaUrl]);
    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'category_name',
            key: 'category_name',
        },
        {
            title: 'Description',
            dataIndex: 'category_description',
            key: 'category_description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ cursor: 'pointer' }} onClick={() => {
                    setEditMsg({
                        id: record.category_id,
                        name: record.category_name,
                        desc: record.category_description
                    })
                    setVisible(true);
                }}>
                    <EditOutlined />
                </div>
            ),
        },
    ];
    return (
        <div className="default-view">
            <p className="public-title">头像</p>
            <div className="avatar-box">
                <input type="file" accept="image/*" />
                <div className="up-btn">
                    <CloudUploadOutlined />
                </div>
                {upAvatar && <div className="up-mask">
                    <Spin />
                </div>}
            </div>
            <p className="public-title">默认声音</p>
            <div className="voice-box">
                <div className="record-btn pub-btn" onClick={() => {
                    setRecord(!record)
                    !record ? startRecord() : stopRecord()
                }}>
                    {!record
                        ? <PlayCircleOutlined />
                        : <PoweroffOutlined />
                    }
                </div>
                <audio ref={audioRef} src={audio} controls></audio>
                <div className="upload-btn pub-btn">
                    <CloudUploadOutlined />
                </div>
            </div>
            <p className="public-title">背景图片</p>
            <div className="bg-box">
                <input type="file" accept="image/*" />
                <div className="up-btn">
                    <CloudUploadOutlined />
                </div>
                {upBg && <div className="up-mask">
                    <Spin />
                </div>}
            </div>
            <p className="public-title">集合</p>
            <div className="collection-box">
                TODO
            </div>
            <p className="public-title with-btn">
                <span>类别</span>
                <Button type="primary" size="small" onClick={() => {
                    setVisible(true);
                    setEditMsg({
                        id: 0,
                        name: '',
                        desc: ''
                    })
                }}>
                    <PlusOutlined />
                    Add
                </Button>
            </p>
            <div className="category-box">
                <Table columns={columns} dataSource={categoryList} />
            </div>
            <AddCategory uploadData={() => {
                getCategoryList();
            }} visible={visible} closeVisible={(val: boolean) => {
                setVisible(val);
            }} id={editMsg.id} name={editMsg.name} desc={editMsg.desc} />
        </div>
    )
};

export default DefaultView;
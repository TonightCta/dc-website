import { ReactElement, ReactNode, useEffect, useState } from "react";
import './index.scss'
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import AddCategory from "./components/add.category";
import type { ColumnsType } from 'antd/es/table';
import { CategoryList } from "../../request/api";

interface DataType {
    key: string;
    category_name: string;
    category_description: string;
    category_id: number;
}

const CategoryView = (): ReactElement<ReactNode> => {
    const [categoryList, setCategoryList] = useState<DataType[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [wait,setWait] = useState<boolean>(false);
    const [editMsg, setEditMsg] = useState<{ id: number, name: string, desc: string }>({
        id: 0,
        name: '',
        desc: ''
    });
    const getCategoryList = async () => {
        setWait(true);
        const result: any = await CategoryList({});
        const { data } = result;
        data.data.item = data.data.item.map((item: any, index: number) => {
            return {
                ...item,
                key: String(index)
            }
        });
        setWait(false);
        setCategoryList(data.data.item);
    };
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
    useEffect(() => {
        getCategoryList();
    }, [])
    return (
        <div className="category-view">
            <p className="public-title with-btn">
                <span>类别列表</span>
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
                <Table loading={wait} columns={columns} dataSource={categoryList} />
            </div>
            <AddCategory uploadData={() => {
                getCategoryList();
            }} visible={visible} closeVisible={(val: boolean) => {
                setVisible(val);
            }} id={editMsg.id} name={editMsg.name} desc={editMsg.desc} />
        </div>
    )
};

export default CategoryView;
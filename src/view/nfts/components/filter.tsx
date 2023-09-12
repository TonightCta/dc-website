import { ReactElement, useEffect, useState } from "react";
import { CategoryList, CollectionList, LabelList } from "../../../request/api";
import { Button, Checkbox, Radio, RadioChangeEvent, Select } from "antd";
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { PlusOutlined } from "@ant-design/icons";
import AddLabel from "./edit.label";

interface Props {
    upCollection: (val: number) => void;
    upCategory: (val: number) => void;
    upLabel: (val: number[]) => void;
    upSort: (val: number) => void;
    upSortBy: (val: number) => void;
}

const FilterBox = (props: Props): ReactElement => {
    const [collectionList, setCollectionList] = useState<any[]>([]);
    const [selectCollection, setSelectCollection] = useState<string>('0');
    const [categoryList, setCategoryList] = useState<any[]>([]);
    const [selectCategory, setSelectCategory] = useState<string>('0');
    const [labelList, setLabelList] = useState<any[]>([]);
    const [sort, setSort] = useState<number>(1);
    const [editLabel,setEditLabel] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<number>(1);
    const getCollectionList = async () => {
        const result = await CollectionList({});
        const { data } = result;
        data.data.item = data.data.item.map((item: any) => {
            return {
                value: String(item.collection_id),
                label: item.collection_name,
                id: item.collection_id,
            }
        });
        data.data.item.unshift({
            label: 'All',
            value: '0'
        })
        setCollectionList(data.data.item);
    };
    const getCategoryList = async () => {
        const result: any = await CategoryList({});
        const { data } = result;
        data.data.item = data.data.item.map((item: any) => {
            return {
                value: String(item.category_id),
                label: item.category_name,
                id: item.category_id,
            }
        });
        data.data.item.unshift({
            label: 'All',
            value: '0'
        })
        setCategoryList(data.data.item);
    }
    const getLabelList = async () => {
        const result = await LabelList({});
        const { data } = result;
        data.data.item = data.data.item.map((item: any) => {
            return {
                value: item.label_id,
                label: item.label_name
            }
        });
        setLabelList(data.data.item);
    }
    useEffect(() => {
        getCollectionList();
        getCategoryList();
        getLabelList();
    }, []);
    const handleCollecctionChange = (item: string) => {
        setSelectCollection(item);
        props.upCollection(+item);
    };
    const handleCategoryChange = (item: string) => {
        setSelectCategory(item);
        props.upCategory(+item);
    }
    const onSortChange = (item: RadioChangeEvent) => {
        setSort(item.target.value);
        props.upSort(+item.target.value)
    }
    const onSortByChange = (item: RadioChangeEvent) => {
        setSortBy(item.target.value);
        props.upSortBy(+item.target.value)
    }
    const onTagChange = (item: CheckboxValueType[]) => {
        props.upLabel(item as number[]);
    }
    return (
        <div className="filter-box">
            <ul>
                <li>
                    <p>Collection:</p>
                    <Select
                        value={selectCollection}
                        style={{ width: 240 }}
                        onChange={handleCollecctionChange}
                        options={collectionList}
                    />
                </li>
                <li>
                    <p>Category:</p>
                    <Select
                        value={selectCategory}
                        style={{ width: 240 }}
                        onChange={handleCategoryChange}
                        options={categoryList}
                    />
                </li>
                <li>
                    <p>Label:</p>
                    <Checkbox.Group options={labelList} onChange={onTagChange} />
                </li>
                <li>
                    <p>Sort:</p>
                    <Radio.Group onChange={onSortChange} value={sort}>
                        <Radio value={1}>Time</Radio>
                        <Radio value={2}>Price</Radio>
                    </Radio.Group>
                </li>
                <li>
                    <p>Sort:</p>
                    <Radio.Group onChange={onSortByChange} value={sortBy}>
                        <Radio value={1}>Positive sequence</Radio>
                        <Radio value={2}>Reverse order</Radio>
                    </Radio.Group>
                </li>

            </ul>
            <p className="cut-line">----------------{`>`}Edit Labels</p>
            <div className="labels-edit">
                <p>Labels:</p>
                <p>
                    {
                        labelList.map((item: { value: number, label: string }, index: number) => {
                            return (
                                <span className="labels" key={index}>{item.label}</span>

                            )
                        })
                    }
                    <Button type="primary" onClick={() => {
                        setEditLabel(true)
                    }}>
                        <PlusOutlined />
                        Add
                    </Button>
                </p>
            </div>
            <AddLabel visible={editLabel} closeVisible={(val:boolean) => {
                setEditLabel(val)
            }} uploadData={getLabelList}/>
        </div>
    )
};

export default FilterBox;
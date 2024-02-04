import { ReactElement, useEffect, useState } from "react";
import { CategoryList, CollectionList, LabelList } from "../../../request/api";
import { Button, Checkbox, Radio, RadioChangeEvent, Select, Switch } from "antd";
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import AddLabel from "./edit.label";
import { useLocation } from "react-router-dom";

interface Props {
    upCollection: (val: number) => void;
    upCategory: (val: number) => void;
    upLabel: (val: number[]) => void;
    upSort: (val: number) => void;
    upSortBy: (val: number) => void;
    upPoster1: (val: boolean) => void;
    upPoster2: (val: boolean) => void
}

const FilterBox = (props: Props): ReactElement => {
    const [collectionList, setCollectionList] = useState<any[]>([]);
    const [selectCollection, setSelectCollection] = useState<string>('0');
    const [categoryList, setCategoryList] = useState<any[]>([]);
    const [selectCategory, setSelectCategory] = useState<string>('0');
    const [labelList, setLabelList] = useState<any[]>([]);
    const [sort, setSort] = useState<number>(1);
    const [editLabel, setEditLabel] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<number>(1);
    const [onlyPoster1, setOnlyPoster1] = useState<boolean>(false);
    const [onlyPoster2, setOnlyPoster2] = useState<boolean>(false);
    const location = useLocation();
    const [label, setLabel] = useState<{ id: number, name: string, desc: string, bg: string }>({
        id: 0,
        bg: '',
        name: '',
        desc: ''
    })
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
        const result = await LabelList({ page_size: 100 });
        const { data } = result;
        data.data.item = data.data.item.map((item: any) => {
            return {
                value: item.label_id,
                label: item.label_name,
                label_icon: item.label_icon
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
    const onPoster1 = (checked: boolean) => {
        setOnlyPoster1(checked);
        props.upPoster1(checked)
    }
    const onPoster2 = (checked: boolean) => {
        setOnlyPoster2(checked);
        props.upPoster2(checked)
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
                <li>
                    <p className="w-auto">Show only posters 1:</p>
                    <Switch checked={onlyPoster1} onChange={onPoster1} />
                </li>
                <li>
                    <p className="w-auto">Show only posters 2:</p>
                    <Switch checked={onlyPoster2} onChange={onPoster2} />
                </li>
            </ul>
            <p className="cut-line">----------------{`>`}Edit Labels</p>
            <div className="labels-edit">
                <p>Labels:</p>
                <div>
                    {
                        labelList.map((item: { value: number, label: string, label_icon: string }, index: number) => {
                            return (
                                <p className="labels" key={index} onClick={() => {
                                    setLabel({
                                        name: item.label,
                                        id: item.value,
                                        bg: item.label_icon,
                                        desc: ''
                                    });
                                    setEditLabel(true)
                                }}>
                                    {item.label}
                                    <EditOutlined />
                                </p>

                            )
                        })
                    }
                    <Button type="primary" onClick={() => {
                        setLabel({
                            name: '',
                            bg: '',
                            id: 0,
                            desc: ''
                        });
                        setEditLabel(true)
                    }}>
                        <PlusOutlined />
                        Add
                    </Button>
                </div>
            </div>
            <AddLabel name={label.name} bg={label.bg} desc={label?.desc} id={label.id} visible={editLabel} closeVisible={(val: boolean) => {
                setEditLabel(val)
            }} uploadData={getLabelList} />
        </div>
    )
};

export default FilterBox;
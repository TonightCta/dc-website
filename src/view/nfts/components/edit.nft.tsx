import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Modal, Popover, Row, Select, message } from "antd";
import { ReactElement, useContext, useEffect, useState } from "react";
import * as API from '../../../request/api';
import { VoiceAdmin } from "../../../App";
import { useLocation } from "react-router-dom";
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

interface Props {
    visible: boolean,
    closeModal: (val: boolean) => void,
    fid: number[]
}

const EditNftModal = (props: Props): ReactElement => {
    const [visible, setVisible] = useState<boolean>(false);
    const [periodList, setPeriodList] = useState<[]>([]);
    const [categoryList, setCategoryList] = useState<{ value: number, label: string }[]>([]);
    const [labelsList, setLabelsList] = useState<{ value: number, label: string }[]>([]);
    const [competitionList, setCompetitionList] = useState<[]>([]);
    const [classList, setClassList] = useState<{ value: number, label: string }[]>([]);
    const [labelsID, setLabelsID] = useState<number[]>([]);
    const { state } = useContext(VoiceAdmin);
    const getClassList = async () => {
        const result = await API.GrallertCalssList({});
        const { data } = result;
        data.data.item = data.data.item.map((item: { class_id: number, class_name: string }, index: number) => {
            return {
                value: String(item.class_id),
                label: item.class_name
            }
        });
        setClassList(data.data.item);
    }
    const getCategoryList = async () => {
        const result = await API.CategoryList({
            page_size: 100
        });
        const { data } = result;
        data.data.item = data.data.item.map((item: { category_id: number, category_name: string }) => {
            return {
                value: item.category_id,
                label: item.category_name
            }
        });
        setCategoryList(data.data.item);
    };
    const getLabelList = async () => {
        const result = await API.LabelList({
            page_size: 100
        });
        const { data } = result;
        data.data.item = data.data.item.map((item: { label_id: number, label_name: string }) => {
            return {
                value: item.label_id,
                label: item.label_name
            }
        });
        setLabelsList(data.data.item);
    }
    const getPeriodList = async (_id?: number) => {
        const result = await API.GalleryPeriod({
            class_id: _id ? _id : +classList[0]?.value
        });
        const { data } = result;
        if (!data.data.item) {
            setPeriodList([]);
            return
        };
        data.data.item = data.data.item.map((item: any, index: number) => {
            return {
                value: item.series_id,
                label: item.series_name
            }
        })
        setPeriodList(data.data.item)
    };

    const getCompetitionList = async () => {
        const result = await API.CompetitionList({
            page_size: 500
        });
        const { data } = result;
        if (!data.data.item) {
            setPeriodList([]);
            return
        };
        data.data.item = data.data.item.map((item: any) => {
            return {
                value: item.competition_id,
                label: item.name
            }
        })
        setCompetitionList(data.data.item)
    }
    useEffect(() => {
        // getPeriodList();
        props.visible && getCompetitionList();
        props.visible && getClassList();
        props.visible && getCategoryList();
        props.visible && getLabelList();
        setVisible(props.visible)
    }, [props.visible]);

    const handleGalleryChange = async (value: string) => {
        getPeriodList(+value);
    };
    const selectPeriod = async (_id: number) => {
        // if (props.fid.length !== 5) {
        //     message.error('画廊格式5张/期');
        //     return
        // }
        const result: any = await API.SetGallery({
            class_id: _id,
            fids: props.fid,
            sender: state.address
        });
        const { status } = result;
        if (status !== 200) {
            message.error(result.msg);
            return
        };
        message.success('Set Successfuly');
    }
    const handleCreativeChange = async (value: number) => {
        const params = {
            competition_id: value,
            chain_id: '8007736',
            contract_address: '0xa2822ac2662fe0cbf470d5721e24f8508ec43d33',
            token_id: '',
            fid: props.fid,
            sender: state.address
        };
        const result: any = await API.JoinCompetition(params);
        const { status } = result;
        if (status !== 200) {
            message.error(result.msg);
            return
        };
        message.success('Set Successfuly');
    }
    const addScreen = () => {
        return (
            <div className="public-add-edit-btn">
                {location.pathname === '/nfts-screen' && <Button onClick={() => {
                    pushToScreenTop()
                }} type="primary">一屏</Button>}
                {location.pathname === '/nfts-screen-2' && <Button onClick={() => {
                    pushToScreenBottom()
                }} type="primary">二屏</Button>}
            </div>
        )
    }
    const addGallery = () => {
        return (
            <div className="public-add-edit edit-btn">
                {/* <div className="select-box">
                    <p>期数:</p>
                    <Select
                        defaultValue={'1'}
                        style={{ width: 120 }}
                        onChange={handleGalleryChange}
                        placeholder="Select"
                        options={classList}
                    />
                </div> */}
                <ul>
                    {
                        classList.map((item: { value: number, label: string }, index: number) => {
                            return (
                                <li key={index} onClick={() => {
                                    selectPeriod(+item.value)
                                }}>{item.label}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
    const addCreative = () => {
        return (
            <div className="public-add-edit">
                <p>活动:</p>
                <Select
                    placeholder="Select"
                    style={{ width: 120 }}
                    onChange={handleCreativeChange}
                    options={competitionList}
                />
            </div>
        )
    };
    const pushToScreenTop = async () => {
        if (props.fid.length < 30) {
            message.error('一屏至少30张');
            return
        }
        const result: any = await API.PushScreen({
            fids: props.fid,
            sender: state.address
        });
        const { status } = result;
        if (status !== 200) {
            message.error(result.msg);
            return
        };
        message.success('Set Successfuly');
    }
    const pushToScreenBottom = async () => {
        if (props.fid.length < 24) {
            message.error('二屏至少24张');
            return
        }
        const result: any = await API.PushScreen2({
            fids: props.fid,
            sender: state.address
        });
        const { status } = result;
        if (status !== 200) {
            message.error(result.msg);
            return
        };
        message.success('Set Successfuly');
    };
    const location = useLocation();
    const selectCategory = async (value: number) => {
        const result:any = await API.SetCategory({
            category_id:value,
            fid:props.fid,
            sender:state.address
        });
        const { status } = result;
        if(status !== 200){
            message.error(result.msg);
            return
        };
        message.success('Set successfuly');
    };
    const selectLabel = async (checkedValues: CheckboxValueType[]) => {
        setLabelsID(checkedValues.map(Number));
    };
    const setLabels = async () => {
        if(labelsID.length < 1){
            message.error('Please select at least one label');
            return
        };
        const result:any = await API.SetLabels({
            label_ids:labelsID,
            fid:props.fid,
            sender:state.address
        });
        const { status } = result;
        if(status !== 200){
            message.error(result.msg);
            return
        };
        message.success('Set successfuly');
    }
    return (
        <Modal title="Edit NFT" destroyOnClose footer={null} open={visible} onCancel={() => {
            setVisible(false);
            props.closeModal(false);
        }}>
            <div className="edit-nft">
                {location.pathname !== '/' && <div className="show-screen show-public">
                    <p className="public-title">首屏展示</p>
                    <p>
                        <Popover content={addScreen} title="添加至首页展示" trigger="click">
                            <Button type="primary" size="small">
                                <PlusOutlined />
                                添加至首屏展示
                            </Button>
                        </Popover>
                    </p>
                </div>}
                {location.pathname === '/' && <div className="show-gallery show-public">
                    <p className="public-title">画廊展示</p>
                    <p>
                        <Popover content={addGallery} title="添加编辑至画廊展示" trigger="click">
                            <Button type="primary" size="small">
                                <PlusOutlined />
                                添加编辑至画廊展示
                            </Button>
                        </Popover>
                    </p>
                </div>}
                {location.pathname === '/' && <div className="show-screen show-public set-public">
                    <p className="public-title">添加类别</p>
                    <Select
                        style={{ width: 240 }}
                        onChange={selectCategory}
                        options={categoryList}
                    />
                </div>}
                {location.pathname === '/' && <div className="show-screen show-public">
                    <p className="public-title">添加标签</p>
                    <div className="checkbox-i">
                        <Checkbox.Group style={{ width: '100%' }} onChange={selectLabel}>
                            <Row>
                                {
                                    labelsList.map((item: { value: number, label: string }, index: number) => {
                                        return (
                                            <Col key={index} span={8}>
                                                <Checkbox value={item.value}>{item.label}</Checkbox>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </Checkbox.Group>
                        <p className="oper-b">
                            <Button type="primary" size="small" onClick={setLabels}>Set</Button>
                        </p>
                    </div>
                </div>}
                {/* <div className="show-creative show-public">
                    <p className="public-title">是否参加创作大赛</p>
                    <p>
                        <Popover content={addCreative} title="添加编辑至创作大赛" trigger="click">
                            <Button type="primary" size="small">
                                <PlusOutlined />
                                添加编辑至创作大赛
                            </Button>
                        </Popover>
                    </p>
                </div> */}
            </div>
        </Modal>
    )
};

export default EditNftModal;
import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Popover, Select, message } from "antd";
import { ReactElement, useContext, useEffect, useState } from "react";
import { GalleryPeriod, PushScreen, SetGallery } from '../../../request/api';
import { VoiceAdmin } from "../../../App";

interface Props {
    visible: boolean,
    closeModal: (val: boolean) => void,
    fid: number
}

const EditNftModal = (props: Props): ReactElement => {
    const [visible, setVisible] = useState<boolean>(false);
    const [periodList, setPeriodList] = useState<[]>([]);
    const { state } = useContext(VoiceAdmin);
    const getPeriodList = async () => {
        const result = await GalleryPeriod({});
        const { data } = result;
        if (!data.data.item) {
            setPeriodList([]);
            return
        };
        data.data.item = data.data.item.map((item: any) => {
            return {
                value: item.series_id,
                label: item.series_name
            }
        })
        setPeriodList(data.data.item)
    };
    useEffect(() => {
        getPeriodList();
        setVisible(props.visible)
    }, [props.visible]);

    const handleGalleryChange = async (value: string) => {
        const result: any = await SetGallery({
            series_id: value,
            fids: [props.fid],
            sender: state.address
        });
        const { status } = result;
        if (status !== 200) {
            message.error(result.msg);
            return
        };
        message.success('Set Successfuly');
    }
    const handleCreativeChange = (value: string) => {
        console.log(value)
    }
    const addGallery = () => {
        return (
            <div className="public-add-edit">
                <p>期数:</p>
                <Select
                    style={{ width: 120 }}
                    onChange={handleGalleryChange}
                    placeholder="Select"
                    options={periodList}
                />
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
                    options={[
                        { value: '1', label: '一期' },
                        { value: '2', label: '二期' },
                    ]}
                />
            </div>
        )
    };
    const pushToScreen = async () => {
        const result: any = await PushScreen({
            fids: [props.fid],
            sender: state.address
        });
        const { status } = result;
        if (status !== 200) {
            message.error(result.msg);
            return
        };
        message.success('Set Successfuly');
    }
    return (
        <Modal title="Edit NFT" destroyOnClose footer={null} open={visible} onCancel={() => {
            setVisible(false);
            props.closeModal(false);
        }}>
            <div className="edit-nft">
                <div className="show-screen show-public">
                    <p className="public-title">首屏展示:<span>否</span></p>
                    <p>
                        <Button type="primary" size="small" onClick={() => {
                            pushToScreen()
                        }}>
                            <PlusOutlined />
                            添加至首屏展示
                        </Button>
                    </p>
                </div>
                <div className="show-gallery show-public">
                    <p className="public-title">画廊展示:<span>否</span></p>
                    <p>
                        <Popover content={addGallery} title="添加编辑至画廊展示" trigger="click">
                            <Button type="primary" size="small">
                                <PlusOutlined />
                                添加编辑至画廊展示
                            </Button>
                        </Popover>

                    </p>
                </div>
                <div className="show-creative show-public">
                    <p className="public-title">是否参加创作大赛:<span>否</span></p>
                    <p>
                        <Popover content={addCreative} title="添加编辑至创作大赛" trigger="click">
                            <Button type="primary" size="small">
                                <PlusOutlined />
                                添加编辑至创作大赛
                            </Button>
                        </Popover>
                    </p>
                </div>
            </div>
        </Modal>
    )
};

export default EditNftModal;
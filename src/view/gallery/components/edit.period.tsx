import { Button, Modal, Switch, message } from "antd";
import { ReactElement, useContext, useEffect, useState } from "react";
import { GalleryAdd, GalleryEdit, SetDefaultPeriod } from '../../../request/api'
import { VoiceAdmin } from "../../../App";

interface Props {
    visible: boolean,
    closeModal: (val: boolean) => void,
    uploadData: () => void,
    class_id: number,
    is_default: boolean,
    id?: number,
    name?: string,
    desc?: string
}

const EditPeriod = (props: Props): ReactElement => {
    const [visible, setVisible] = useState<boolean>(false);
    const { state } = useContext(VoiceAdmin);
    const [edit, setEdit] = useState<{ id: number, name: string, desc: string }>({
        id: props.id || 0,
        name: props.name || '',
        desc: props.desc || ''
    });
    const [show, setShow] = useState<boolean>(false);
    const [wait, setWait] = useState<boolean>(false);
    useEffect(() => {
        setVisible(props.visible);
        setEdit({
            id: props.id || 0,
            name: props.name || '',
            desc: props.desc || ''
        });
        setShow(props.is_default)
    }, [props.visible]);
    const submitEdit = async () => {
        if (!edit.name) {
            message.error('Please enter the name');
            return
        };
        if (!edit.desc) {
            message.error('Please enter the description');
            return
        };
        setWait(true);
        const result: any = props.id ? await GalleryEdit({
            sender: state.address,
            name: edit.name,
            description: edit.desc,
            series_id: props.id
        }) : await GalleryAdd({
            sender: state.address,
            class_id: props.class_id,
            name: edit.name,
            description: edit.desc,
        });
        const { status, data } = result;
        if (status !== 200) {
            message.error(result.msg);
            setWait(false);
            return
        }
        if (show) {
            await SetDefaultPeriod({
                sender: state.address,
                series_id: props.id ? props.id : data.series_id
            });
        }
        setWait(false);
        message.success(`${props.id ? 'Edited' : 'Added'} successfully`);
        setVisible(false);
        props.closeModal(false);
        props.uploadData();
    };
    const onShow = (checked: boolean) => {
        setShow(checked)
    }
    return (
        <Modal destroyOnClose title="Edit Period" width={500} footer={null} open={visible} onCancel={() => {
            setVisible(false);
            props.closeModal(false);
        }}>
            <div className="edit-msg">
                <ul>
                    <li>
                        <p><sup>*</sup>Name:</p>
                        <input type="text" placeholder="Please enter the name" value={edit.name} onChange={(e) => {
                            setEdit({
                                ...edit,
                                name: e.target.value
                            })
                        }} />
                    </li>
                    <li>
                        <p><sup>*</sup>Description:</p>
                        <input type="text" placeholder="Please enter the description" value={edit.desc} onChange={(e) => {
                            setEdit({
                                ...edit,
                                desc: e.target.value
                            })
                        }} />
                    </li>
                    <li>
                        <p><sup>*</sup>Show:</p>
                        <Switch checked={show} onChange={onShow} />
                    </li>
                </ul>
                <p className="submit-btn">
                    <Button type="default" onClick={() => {
                        setVisible(false);
                        props.closeModal(false)
                    }}>Close</Button>
                    <Button type="primary" disabled={wait} loading={wait} onClick={submitEdit}>Confirm</Button>
                </p>
            </div>
        </Modal>
    )
};

export default EditPeriod;
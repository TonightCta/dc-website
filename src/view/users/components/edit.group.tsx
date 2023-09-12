import { Button, Modal, Switch, message } from "antd";
import { ReactElement, useContext, useEffect, useState } from "react";
import { Group } from "..";
import { UsersEdit, UsersAdd, HideGroup } from "../../../request/api";
import { VoiceAdmin } from "../../../App";

interface Props {
    visible: boolean,
    closeModal: (val: boolean) => void,
    info: Group,
    upDate: () => void
}

const EditGropuModal = (props: Props): ReactElement => {
    const [visible, setVisible] = useState<boolean>(false);
    const { state } = useContext(VoiceAdmin);
    const [wait, setWait] = useState<boolean>(false);
    const [info, setInfo] = useState<Group>({
        group_id: 0,
        group_name: '',
        group_description: '',
        is_on: false
    });
    const onChange = (checked: boolean) => {
        setInfo({
            ...info,
            is_on: checked
        })
    };
    const close = () => {
        setVisible(false);
        props.closeModal(false)
    };
    useEffect(() => {
        setInfo(props.info)
        setVisible(props.visible)
    }, [props.visible]);
    const submitEdit = async () => {
        if (!info.group_name) {
            message.error('Please enter the name');
            return
        }
        if (!info.group_description) {
            message.error('Please enter the description');
            return
        };
        setWait(true);
        const result: any = info.group_id !== 0 ? await UsersEdit({
            group_id: info.group_id,
            name: info.group_name,
            description: info.group_description,
            sender: state.address
        }) : await UsersAdd({
            name: info.group_name,
            description: info.group_description,
            sender: state.address
        });
        const { status } = result;
        if (status !== 200) {
            message.error(result.msg);
            return
        };
        if (!info.is_on) {
            await HideGroup({
                group_id: info.group_id,
                sender: state.address
            });
        }
        props.upDate();
        setWait(false);
        message.success(`${props.info.group_id !== 0 ? 'Edit' : 'Added'} Successfuly`);
        close();
    }
    return (
        <Modal title="Edit Group" footer={null} open={visible} onCancel={close}>
            <div className="inner-edit-group">
                <ul>
                    <li>
                        <p>Group Name:</p>
                        <div>
                            <input type="text" onChange={(e) => {
                                setInfo({
                                    ...info,
                                    group_name: e.target.value
                                })
                            }} value={info.group_name} placeholder="Please enter the group name" />
                        </div>
                    </li>
                    <li>
                        <p>Description:</p>
                        <div>
                            <input type="text" onChange={(e) => {
                                setInfo({
                                    ...info,
                                    group_description: e.target.value
                                })
                            }} value={info.group_description} placeholder="Please enter the group description" />
                        </div>
                    </li>
                    <li>
                        <p>Activation:</p>
                        <div>
                            <Switch disabled={props.info.group_id === 0} checked={info.is_on} onChange={onChange} />
                        </div>
                    </li>
                    <li>
                        <Button type="default" onClick={close}>Cancel</Button>
                        <Button disabled={wait} loading={wait} type="primary" onClick={submitEdit}>Confirm</Button>
                    </li>
                </ul>
            </div>
        </Modal>
    )
};

export default EditGropuModal;
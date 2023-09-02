import { Button, Modal, message } from "antd";
import { ReactElement, useContext, useEffect, useState } from "react";
import { CategoryAdd, CategoryEdit } from '../../../request/api'
import { VoiceAdmin } from "../../../App";

interface Props {
    visible: boolean,
    closeVisible: (val: boolean) => void,
    uploadData: () => void,
    id?: number,
    name?: string,
    desc?: string
}

const AddCategory = (props: Props): ReactElement => {
    const [visible, setVisible] = useState<boolean>(false);
    const { state } = useContext(VoiceAdmin);
    const [edit, setEdit] = useState<{ id: number, name: string, desc: string }>({
        id: props.id || 0,
        name: props.name || '',
        desc: props.desc || ''
    });
    const [wait, setWait] = useState<boolean>(false);
    useEffect(() => {
        setVisible(props.visible);
        setEdit({
            id: props.id || 0,
            name: props.name || '',
            desc: props.desc || ''
        })
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
        const result: any = props.id ? await CategoryEdit({
            sender: state.address,
            name: edit.name,
            description: edit.desc,
            category_id: props.id
        }) : await CategoryAdd({
            sender: state.address,
            name: edit.name,
            description: edit.desc,
        });
        setWait(false);
        const { status } = result;
        if (status !== 200) {
            message.error(result.msg);
            return
        }
        message.success(`${props.id ? 'Edited' : 'Added'} successfully`);
        setVisible(false);
        props.closeVisible(false);
        props.uploadData();
    }
    return (
        <Modal destroyOnClose title="Edit Category" width={500} footer={null} open={visible} onCancel={() => {
            setVisible(false);
            props.closeVisible(false);
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
                </ul>
                <p className="submit-btn">
                    <Button type="default" onClick={() => {
                        setVisible(false);
                        props.closeVisible(false)
                    }}>Close</Button>
                    <Button type="primary" disabled={wait} loading={wait} onClick={submitEdit}>Confirm</Button>
                </p>
            </div>
        </Modal>
    )
};

export default AddCategory;
import { Button, Modal, message } from "antd";
import { ReactElement, useEffect, useState } from "react";
import { LabelAdd } from '../../../request/api'

interface Props {
    visible: boolean,
    closeVisible: (val: boolean) => void,
    uploadData: () => void,
}

const AddLabel = (props: Props): ReactElement => {
    const [visible, setVisible] = useState<boolean>(false);
    const [edit, setEdit] = useState<{ name: string, desc: string }>({
        name: '',
        desc: ''
    });
    const [wait, setWait] = useState<boolean>(false);
    useEffect(() => {
        setVisible(props.visible);
        !props.visible && setEdit({
            name: '',
            desc: ''
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
        const result: any = await LabelAdd({
            name: edit.name,
            description: edit.desc,
        });
        setWait(false);
        const { status } = result;
        if (status !== 200) {
            message.error(result.msg);
            return
        }
        message.success(`Added successfully`);
        setVisible(false);
        props.closeVisible(false);
        props.uploadData();
    }
    return (
        <Modal destroyOnClose title="Add Label" width={500} footer={null} open={visible} onCancel={() => {
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

export default AddLabel;
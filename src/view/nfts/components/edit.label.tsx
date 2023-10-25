import { Button, Modal, Switch, message } from "antd";
import { ReactElement, useEffect, useState } from "react";
import { LabelAdd, UpdateLabel, DeleteLabel, UpLabelsBg } from '../../../request/api'
import { EditOutlined } from "@ant-design/icons";

interface Props {
    visible: boolean,
    closeVisible: (val: boolean) => void,
    uploadData: () => void,
    id?: number,
    name?: string,
    desc?: string,
    bg?: string
}

const AddLabel = (props: Props): ReactElement => {
    const [visible, setVisible] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(true);
    const [labelBg, setLabelBg] = useState<File | string | Blob>();
    const [fileView, setFileView] = useState<string>('');
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
        });
        setShow(true);
        props.visible && props.name && setEdit({
            name: props.name,
            desc: props.desc || ''
        });
    }, [props.visible]);
    const selectBgFile = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setFileView(e.target?.result as string)
        };
        setLabelBg(file);
    }
    const submitEdit = async () => {
        if (!edit.name) {
            message.error('Please enter the name');
            return
        };
        if (!props.name && !labelBg) {
            message.error('Please upload background documents');
            return
        }
        setWait(true);
        const result: any = props.name
            ? await UpdateLabel({
                label_id: props.id,
                name: edit.name
            })
            : await LabelAdd({
                name: edit.name,
                description: edit.desc,
            });
        if (labelBg) {
            const formdata = new FormData();
            formdata.append('label_id', props.id ? props.id : result.data.label_id);
            formdata.append('icon', labelBg as any);
            const icon: any = await UpLabelsBg(formdata);
            const { status } = icon;
            if (status !== 200) {
                setWait(false);
                message.error(result.msg);
                return
            }
        }
        props.name && !show && await DeleteLabel({ label_id: props.id });
        setWait(false);
        const { status } = result;
        if (status !== 200) {
            message.error(result.msg);
            return
        }
        message.success(`${props.name ? 'Update' : 'Added'} successfully`);
        setVisible(false);
        props.closeVisible(false);
        props.uploadData();
    };
    const onChange = (checked: boolean) => {
        setShow(checked);
    }
    return (
        <Modal destroyOnClose title={`${!props.name ? 'Add' : 'Edit'} Label`} width={500} footer={null} open={visible} onCancel={() => {
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
                        <p><sup>*</sup>Show:</p>
                        <Switch defaultChecked checked={show} disabled={!props.name} onChange={onChange} />
                    </li>
                    <li>
                        <p><sup>*</sup>Background:</p>
                        <div className="up-view">
                            <img src={fileView ? fileView : props.bg} alt="" />
                            <input type="file" accept="image/*" onChange={selectBgFile} />
                            <div className="edit-box-icon">
                                <EditOutlined />
                            </div>
                        </div>
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
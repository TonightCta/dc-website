import { Modal, message } from "antd";
import { ReactElement, useContext, useEffect, useState } from "react";
import { UsersSet, GroupList } from '../../../request/api'
import { Group } from "..";
import { VoiceAdmin } from "../../../App";

interface Props {
    visible: boolean,
    closeModal: (val: boolean) => void,
    operAddress: string[]
}

const EditModal = (props: Props): ReactElement => {
    const [visible, setVisible] = useState<boolean>(false);
    const { state } = useContext(VoiceAdmin);
    const [list, setList] = useState<Group[]>([]);
    const getList = async () => {
        const result = await GroupList({
            page_size: 100
        });
        const { data } = result;
        data.data.item = data.data.item.filter((item: Group) => {
            if (item.is_on) {
                return {
                    ...item
                }
            }
        });
        setList(data.data.item);
    }
    const close = () => {
        setVisible(false);
        props.closeModal(false)
    };
    const submitSet = async (_id: number) => {
        const result :any = await UsersSet({
            group_id: _id,
            sender: state.address,
            user_addresses: props.operAddress
        });
        const { status } = result;
        if(status !== 200){
            message.error(result.msg);
            return
        };
        message.success('Set Successfuly');
        close();
    }
    useEffect(() => {
        props.visible && getList();
        setVisible(props.visible)
    }, [props.visible])
    return (
        <Modal title="Set User" footer={null} open={visible} onCancel={close}>
            <div className="set-user-box">
                <ul>
                    {
                        list.map((item: Group, index: number) => {
                            return (
                                <li key={index} onClick={() => {
                                    submitSet(item.group_id)
                                }}>
                                    <p>{item.group_name}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </Modal>
    )
};

export default EditModal;
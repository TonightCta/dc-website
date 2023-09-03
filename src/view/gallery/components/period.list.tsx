import { ReactElement, useEffect, useState } from "react";
import EditPeriod from "./edit.period";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { GalleryPeriod } from "../../../request/api";

interface Props {
    class_id: number
}

export interface Period {
    series_description: string,
    series_id: number,
    series_name: string
}

const PeriodList = (props: Props): ReactElement => {
    const [visible, setVisible] = useState<boolean>(false);
    const [periodList, setPeriodList] = useState<Period[]>([]);
    const [periodMsg, setPeriodMsg] = useState<{ id: number, name: string, desc: string, is_default: boolean }>({
        id: 0,
        name: '',
        desc: '',
        is_default: false,
    });
    const getPeriodList = async () => {
        const result = await GalleryPeriod({
            class_id: props.class_id
        });
        const { data } = result;
        if (!data.data.item) {
            setPeriodList([]);
            return
        };
        setPeriodList(data.data.item)
    };
    useEffect(() => {
        getPeriodList();
    }, []);
    return (
        <div className="">
            <ul>
                {
                    periodList.map((item: any, index: number) => {
                        return (
                            <li key={index} onClick={() => {
                                setVisible(true);
                                setPeriodMsg({
                                    id: item.series_id,
                                    name: item.series_name,
                                    desc: item.series_description,
                                    is_default: item.is_default
                                })
                            }}>
                                <p>{item.series_name}<span>{item.is_default ? '(当前展示)' : ''}</span></p>
                                <EditOutlined />
                            </li>
                        )
                    })
                }
                <li>
                    <Button size="small" type="primary" onClick={() => {
                        setVisible(true);
                        setPeriodMsg({
                            id: 0,
                            name: '',
                            desc: '',
                            is_default: false
                        })
                    }}>
                        <PlusOutlined />
                        Add
                    </Button>
                </li>
            </ul>
            <EditPeriod is_default={periodMsg.is_default} visible={visible} class_id={props.class_id} name={periodMsg.name} desc={periodMsg.desc} id={periodMsg.id} closeModal={(val: boolean) => {
                setVisible(val)
            }} uploadData={getPeriodList} />
        </div>
    )
};


export default PeriodList;
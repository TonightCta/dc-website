import { ReactElement, useEffect, useState } from "react";
import { GalleryPeriod } from "../../../request/api";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import EditPeriod from "./edit.period";
import { Button } from "antd";

export interface Period {
    series_description: string,
    series_id: number,
    series_name: string
}

interface Props {
    outsidePeriod:(list:Period[]) => void
}

const PeriodList = (props: Props): ReactElement => {
    const [visible, setVisible] = useState<boolean>(false);
    const [periodList, setPeriodList] = useState<[]>([]);
    const [periodMsg, setPeriodMsg] = useState<{ id: number, name: string, desc: string }>({
        id: 0,
        name: '',
        desc: ''
    });
    const getPeriodList = async () => {
        const result = await GalleryPeriod({});
        const { data } = result;
        if (!data.data.item) {
            setPeriodList([]);
            return
        };
        props.outsidePeriod(data.data.item);
        setPeriodList(data.data.item)
    };
    useEffect(() => {
        getPeriodList();
    }, []);
    return (
        <div className="period-box">
            <p>期数总览:</p>
            <ul>
                {
                    periodList.map((item: any, index: number) => {
                        return (
                            <li key={index} onClick={() => {
                                setVisible(true);
                                setPeriodMsg({
                                    id: item.series_id,
                                    name: item.series_name,
                                    desc: item.series_description
                                })
                            }}>
                                <p>{item.series_name}</p>
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
                            desc: ''
                        })
                    }}>
                        <PlusOutlined />
                        Add
                    </Button>
                </li>
            </ul>
            <EditPeriod visible={visible} name={periodMsg.name} desc={periodMsg.desc} id={periodMsg.id} closeModal={(val: boolean) => {
                setVisible(val)
            }} uploadData={getPeriodList} />
        </div>
    )
};


export default PeriodList;
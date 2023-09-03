import { ReactElement, useEffect, useState } from "react";
import { GrallertCalssList } from "../../../request/api";
import PeriodList from "./period.list";


interface Class {
    class_description: string,
    class_id: number,
    class_name: string,
    key: string
}

const ClassList = (): ReactElement => {
    const [classList, setClassList] = useState<[]>([])
    const getPeriodList = async () => {
        const tt = await GrallertCalssList({});
        const { data } = tt;
        data.data.item = data.data.item.map((item: Class, index: number) => {
            return item = {
                ...item,
                key: String(index),
            }
        });
        setClassList(data.data.item);
    };
    useEffect(() => {
        getPeriodList();
    }, []);
    return (
        <div className="period-box">
            <p>期数总览:</p>
            <div>
                {
                    classList.map((item: Class, index: number) => {
                        return (
                            <div className="class-box" key={index}>
                                <p>{item.class_name}</p>
                                <PeriodList class_id={item.class_id} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};


export default ClassList;
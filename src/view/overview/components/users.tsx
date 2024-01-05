import { ReactElement, useEffect } from "react";
import * as echarts from 'echarts'
import { DatePicker } from 'antd';

interface User {
    month: string[],
    user_auth_discord: number[],
    user_auth_twitter: number[],
    user_total: number[]
}

const { RangePicker } = DatePicker;

const UsersBox = (props: { users: User }): ReactElement => {
    const option = {
        height: window.innerWidth <= 1440 ? 220 : 240,
        xAxis: {
            type: 'category',
            data: [] as any
        },
        yAxis: {
            type: 'value'
        },
        tooltip: {
            trigger: 'axis',
            textStyle: {
                align: 'left'
            },
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        grid: {
            bottom: '5%'
        },
        series: [
            {
                name: '用户总数',
                data: [] as any,
                type: 'line',
            },
            {
                name: 'Twitter认证总数',
                data: [],
                type: 'line',
            },
            {
                name: 'Discord认证总数',
                data: [],
                type: 'line',
            }
        ]
    };
    useEffect(() => {
        option.xAxis.data = props.users?.month;
        option.series[0].data = props.users?.user_total;
        option.series[1].data = props.users?.user_auth_twitter;
        option.series[2].data = props.users?.user_auth_discord;
        let box = echarts.getInstanceByDom(document.getElementById('users-echarts-box') as HTMLElement);
        if (!box) {
            box = echarts.init(document.getElementById('users-echarts-box') as HTMLElement);
        };
        box.setOption(option);
    }, [props.users])
    return (
        <div className="users-box public-box">
            <div className="public-title">
                <p>用户总览</p>
                {/* <div className="filter-box">
                    <RangePicker />
                </div> */}
            </div>
            <div className="users-echarts-box echarts-box" id="users-echarts-box">

            </div>
        </div>
    )
};

export default UsersBox;

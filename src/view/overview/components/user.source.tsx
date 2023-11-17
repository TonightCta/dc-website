import { ReactElement, useEffect, useState } from "react";
import * as echarts from 'echarts'
import { DatePicker, Popover } from 'antd';
import { DownOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

interface Source {
    user_from_competition: number,
    user_from_discord: number,
    user_from_invite: number,
    user_from_mint: number,
    user_from_profile: number,
    user_from_signin: number,
    user_from_trade: number,
    user_from_twitter: number
};

interface Props {
    info: {
        month: string
        user_from: Source
    }[]
}

const UserSourceBox = (props: Props): ReactElement => {
    const [month, setMonth] = useState<string>('');
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                left: '20%',
                data: [
                    { value: 0, name: '个人资料页' },
                    { value: 0, name: 'Twitter' },
                    { value: 0, name: 'Discord' },
                    { value: 0, name: 'NFT Mint' },
                    { value: 0, name: 'NFT 交易' },
                    { value: 0, name: 'AIGC大赛' },
                    { value: 0, name: '签到活动' },
                    { value: 0, name: '邀请活动' },
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    useEffect(() => {
        props.info && setMonth(props.info[props.info.length - 1]?.month)
    }, [props.info])
    useEffect(() => {
        const data = props.info?.filter((item) => { return month === item.month })[0];
        option.series[0].data[0].value = data?.user_from.user_from_profile
        option.series[0].data[1].value = data?.user_from.user_from_twitter
        option.series[0].data[2].value = data?.user_from.user_from_discord
        option.series[0].data[3].value = data?.user_from.user_from_mint
        option.series[0].data[4].value = data?.user_from.user_from_trade
        option.series[0].data[5].value = data?.user_from.user_from_competition
        option.series[0].data[6].value = data?.user_from.user_from_signin
        option.series[0].data[7].value = data?.user_from.user_from_invite
        let box = echarts.getInstanceByDom(document.getElementById('users-source-echarts-box') as HTMLElement);
        if (!box) {
            box = echarts.init(document.getElementById('users-source-echarts-box') as HTMLElement);
        };
        box.setOption(option);
    }, [month]);
    const content = (
        <div className="select-date-box">
            <ul>
                {
                    (props.info ? props.info : []).map((item: { month: string, user_from: Source }, index: number) => {
                        return (
                            <li key={index} onClick={() => {
                                setMonth(item.month)
                            }}>{item.month}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
    return (
        <div className="user-source-box public-box">
            <div className="public-title">
                <p>用户来源总览</p>
                <Popover content={content} placement="bottom">
                    <div className="filter-box select-filter">
                        {/* <RangePicker /> */}
                        <p>{month}</p>
                        <DownOutlined />
                    </div>
                </Popover>

            </div>
            <div className="users-source-echarts-box echarts-box-o" id="users-source-echarts-box">

            </div>
        </div>
    )
};

export default UserSourceBox;

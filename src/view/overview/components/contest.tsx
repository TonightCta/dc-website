import { ReactElement, useEffect } from "react";
import * as echarts from 'echarts'

interface Contest {
    competition_id: number[],
    total_submit_items: number[],
    total_votes: number[]
}

const ContestBox = (props: { info: Contest }): ReactElement => {
    const option = {
        height: window.innerWidth <= 1440 ? 220 : 240,
        tooltip: {
            trigger: 'axis',
        },
        grid: {
            bottom: '14%',
            right:'15%'
        },
        legend: {
            data: ['总作品数', '总点赞数']
        },
        xAxis: {
            type: 'category',
            data: [] as any,
            axisLabel:{
                formatter:'{value}期'
            },
            axisPointer: {
                type: 'shadow'
            }
        },
        yAxis: [
            {
                name: '总作品数',
                type: 'value',
                min: 0,
                interval: 50,
                max: 250,
            },
            {
                name: '总点赞数',
                type: 'value',
                min: 0,
                max: 6000,
                interval: 1000,
                splitLine:false
            },
        ],
        series: [
            {
                name: '总作品数',
                type: 'bar',
                data: [] as any,
                yAxisIndex: 0,
            },
            {
                name: '总点赞数',
                type: 'bar',
                data: [],
                yAxisIndex: 1,
            },
        ]
    };
    useEffect(() => {
        option.xAxis.data = props.info?.competition_id;
        option.series[0].data = props.info?.total_submit_items;
        option.series[1].data = props.info?.total_votes;
        let box = echarts.getInstanceByDom(document.getElementById('contest-echarts-box') as HTMLElement);
        if (!box) {
            box = echarts.init(document.getElementById('contest-echarts-box') as HTMLElement);
        };
        box.setOption(option);
    }, [props.info])
    return (
        <div className="contest-box public-box">
            <div className="public-title">
                <p>AIGC大赛总览</p>
                {/* <div className="filter-box">
                    <input type="number" placeholder="Min" />
                    <p>-</p>
                    <input type="number" placeholder="Max" />
                </div> */}
            </div>
            <div className="contest-echarts-box echarts-box" id="contest-echarts-box">

            </div>
        </div>
    )
};

export default ContestBox;

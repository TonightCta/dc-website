import { ReactElement, useEffect } from "react";
import * as echarts from 'echarts'
// import { DatePicker } from 'antd';

// const { RangePicker } = DatePicker;

interface Count {
    month: string[],
    trade_count_plian_pi: number[],
    trade_count_plian_pnft: number[],
    trade_count_platon_lat:number[]
}

const TradeCountBox = (props: { info: Count }): ReactElement => {
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
                name: 'PI',
                data: [] as any,
                type: 'line',
                itemStyle: {
                    color: '#F70FFF'
                },

            },
            {
                name: 'PNFT',
                data: [],
                type: 'line',
                itemStyle: {
                    color: '#12D5DF'
                },
            },
            {
                name: 'LAT',
                data: [],
                type: 'line',
                itemStyle: {
                    color: '#6a7985'
                }
            },
        ]
    };
    useEffect(() => {
        option.xAxis.data = props.info?.month;
        option.series[0].data = props.info?.trade_count_plian_pi;
        option.series[1].data = props.info?.trade_count_plian_pnft;
        option.series[2].data = props.info?.trade_count_platon_lat;
        let box = echarts.getInstanceByDom(document.getElementById('trade-count-echarts-box') as HTMLElement);
        if (!box) {
            box = echarts.init(document.getElementById('trade-count-echarts-box') as HTMLElement);
        };
        box.setOption(option);
    }, [props.info])
    return (
        <div className="trade-count-box public-box">
            <div className="public-title">
                <p>交易总量</p>
                {/* <div className="filter-box">
                    <RangePicker />
                </div> */}
            </div>
            <div className="trade-count-echarts-box echarts-box" id="trade-count-echarts-box">

            </div>
        </div>
    )
};

export default TradeCountBox;

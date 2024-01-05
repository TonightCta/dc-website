import { ReactElement, useEffect } from "react";
import * as echarts from 'echarts'
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

interface Fee {
    month: string[],
    trade_fee_plian_pi: number[],
    trade_fee_plian_pnft: number[],
    trade_fee_platon_lat:number[]
}

const TradeFreeBox = (props: { info: Fee }): ReactElement => {
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
                    color: '#6665E6'
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return value + ' PI';
                    }
                },
            },
            {
                name: 'PNFT',
                data: [],
                type: 'line',
                itemStyle: {
                    color: '#FFBC37'
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return value + ' PNFT';
                    }
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
        option.series[0].data = props.info?.trade_fee_plian_pi;
        option.series[1].data = props.info?.trade_fee_plian_pnft;
        option.series[2].data = props.info?.trade_fee_platon_lat;
        let box = echarts.getInstanceByDom(document.getElementById('trade-free-echarts-box') as HTMLElement);
        if (!box) {
            box = echarts.init(document.getElementById('trade-free-echarts-box') as HTMLElement);
        };
        box.setOption(option);
    }, [props.info])
    return (
        <div className="trade-free-box public-box">
            <div className="public-title">
                <p>交易总手续费</p>
                {/* <div className="filter-box">
                    <RangePicker />
                </div> */}
            </div>
            <div className="trade-free-echarts-box echarts-box" id="trade-free-echarts-box">

            </div>
        </div>
    )
};

export default TradeFreeBox;

import { ReactElement, useEffect } from "react";
import * as echarts from 'echarts'
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

interface Amount {
    month: string[],
    trade_amount_plian_pi: number[],
    trade_amount_plian_pnft: number[]
}

const TradeAmountBox = (props: { info: Amount }): ReactElement => {
    const option = {
        height: window.innerWidth <= 1440 ? 230 : 250,
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
                    color: '#75C979'
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
                    color: 'red'
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return value + ' PNFT';
                    }
                },
            },
        ]
    };
    useEffect(() => {
        option.xAxis.data = props.info?.month;
        option.series[0].data = props.info?.trade_amount_plian_pi;
        option.series[1].data = props.info?.trade_amount_plian_pnft;
        let box = echarts.getInstanceByDom(document.getElementById('trade-amount-echarts-box') as HTMLElement);
        if (!box) {
            box = echarts.init(document.getElementById('trade-amount-echarts-box') as HTMLElement);
        };
        box.setOption(option);
    }, [props.info])
    return (
        <div className="trade-amount-box public-box">
            <div className="public-title">
                <p>成交总额</p>
                {/* <div className="filter-box">
                    <RangePicker />
                </div> */}
            </div>
            <div className="trade-amount-echarts-box echarts-box" id="trade-amount-echarts-box">

            </div>
        </div>
    )
};

export default TradeAmountBox;

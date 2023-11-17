import { ReactElement, useEffect } from "react";
import * as echarts from 'echarts'
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

interface Sale {
    month: string[],
    mint_list_filecoin: number[],
    mint_list_op: number[],
    mint_list_plian: number
}

const SaleBox = (props: { info: Sale }): ReactElement => {
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
                name: 'Plian',
                data: [] as any,
                type: 'line',
                itemStyle: {
                    color: '#FFED52'
                }
            },
            {
                name: 'Optimism',
                data: [],
                type: 'line',
                itemStyle: {
                    color: '#7ED9E6'
                }
            },
            {
                name: 'Filecoin',
                data: [],
                type: 'line',
                itemStyle: {
                    color: '#FF98FF'
                }
            }
        ]
    };
    useEffect(() => {
        option.xAxis.data = props.info?.month;
        option.series[0].data = props.info?.mint_list_plian;
        option.series[1].data = props.info?.mint_list_op;
        option.series[2].data = props.info?.mint_list_filecoin;
        let box = echarts.getInstanceByDom(document.getElementById('sale-echarts-box') as HTMLElement);
        if (!box) {
            box = echarts.init(document.getElementById('sale-echarts-box') as HTMLElement);
        };
        box.setOption(option);
    }, [props.info])
    return (
        <div className="sale-box public-box">
            <div className="public-title">
                <p>挂单总览</p>
                {/* <div className="filter-box">
                    <RangePicker />
                </div> */}
            </div>
            <div className="sale-echarts-box echarts-box" id="sale-echarts-box">

            </div>
        </div>
    )
};

export default SaleBox;

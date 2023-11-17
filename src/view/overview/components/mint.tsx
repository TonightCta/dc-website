import { ReactElement, useEffect } from "react";
import * as echarts from 'echarts'
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

interface Mint {
    month: string[],
    mint_count_filecoin: number[],
    mint_count_op: number[],
    mint_count_plian: number[]
}

const MintBox = (props: { mint: Mint }): ReactElement => {
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
                    color: '#5A38FC'
                }
            },
            {
                name: 'Optimism',
                data: [],
                type: 'line',
                itemStyle: {
                    color: '#00BBF0'
                }
            },
            {
                name: 'Filecoin',
                data: [],
                type: 'line',
                itemStyle: {
                    color: '#FF7F53'
                }
            }
        ]
    };
    useEffect(() => {
        option.xAxis.data = props.mint?.month;
        option.series[0].data = props.mint?.mint_count_plian;
        option.series[1].data = props.mint?.mint_count_op;
        option.series[2].data = props.mint?.mint_count_filecoin;
        let box = echarts.getInstanceByDom(document.getElementById('mint-echarts-box') as HTMLElement);
        if (!box) {
            box = echarts.init(document.getElementById('mint-echarts-box') as HTMLElement);
        };
        box.setOption(option);
    }, [props.mint])
    return (
        <div className="mint-box public-box">
            <div className="public-title">
                <p>NFT Mint总览</p>
                {/* <div className="filter-box">
                    <RangePicker />
                </div> */}
            </div>
            <div className="mint-echarts-box echarts-box" id="mint-echarts-box">

            </div>
        </div>
    )
};

export default MintBox;

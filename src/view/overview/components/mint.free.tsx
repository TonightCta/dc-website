import { ReactElement, useEffect } from "react";
import * as echarts from 'echarts'
// import { DatePicker } from 'antd';

// const { RangePicker } = DatePicker;

interface MintFree {
    mint_fee_eth_op: number[],
    month: number[],
    mint_fee_fil_filecoin: number[],
    mint_fee_pi_plian: number[],
    mint_fee_lat_platon:number[]
}

const MintFreeBox = (props: { info: MintFree }): ReactElement => {
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
                name: 'Plian',
                data: [] as any,
                type: 'line',
                itemStyle: {
                    color: '#DF0885'
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return value + ' PI';
                    }
                },
            },
            {
                name: 'Optimism',
                data: [],
                type: 'line',
                itemStyle: {
                    color: '#272931'
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return value + ' ETH';
                    }
                },
            },
            {
                name: 'Filecoin',
                data: [],
                type: 'line',
                itemStyle: {
                    color: '#34CDA9'
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return value + ' FIL';
                    }
                },
            },
            {
                name: 'PlatON',
                data: [],
                type: 'line',
                itemStyle: {
                    color: '#6a7985'
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return value + ' LAT';
                    }
                },
            },
        ]
    };
    useEffect(() => {
        option.xAxis.data = props.info?.month;
        option.series[0].data = props.info?.mint_fee_pi_plian;
        option.series[1].data = props.info?.mint_fee_eth_op;
        option.series[2].data = props.info?.mint_fee_fil_filecoin;
        option.series[3].data = props.info?.mint_fee_lat_platon;
        let box = echarts.getInstanceByDom(document.getElementById('mint-free-echarts-box') as HTMLElement);
        if (!box) {
            box = echarts.init(document.getElementById('mint-free-echarts-box') as HTMLElement);
        };
        box.setOption(option);
    }, [props.info])
    return (
        <div className="mint-free-box public-box">
            <div className="public-title">
                <p>NFT Mint手续费总览</p>
                {/* <div className="filter-box">
                    <RangePicker />
                </div> */}
            </div>
            <div className="mint-free-echarts-box echarts-box" id="mint-free-echarts-box">

            </div>
        </div>
    )
};

export default MintFreeBox;

import { ReactElement, ReactNode, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './index.scss'
import FirstScreenWapper from "./components/f.screen";
import AboutWapper from "./components/about";
import NewsWapper from "./components/news";
import MarketView from './components/market';
import RightWapper from './components/right';
import RoadMapWapper from './components/roadmap';

const PageView = (): ReactElement<ReactNode> => {
    const tag: string[] = ['LAUNCHPAD', 'ABOUT', 'NEWS', 'MARKET', 'ROADMAP'];
    const [swiper, setSwiper] = useState<any>();
    const CuestomControl = () => {
        return (
            <div className="custom-control">
                <ul>
                    {
                        tag.map((item: string, index: number) => {
                            return (
                                <li key={index} onClick={() => {
                                    switch (index) {
                                        case 0:
                                            return
                                        case 1:
                                            swiper.slideTo(1)
                                            break;
                                        case 2:
                                            swiper.slideTo(2)
                                            break;
                                        case 3:
                                            swiper.slideTo(3)
                                            break;
                                        case 4:
                                            swiper.slideTo(4)
                                            break;
                                        default:
                                            swiper.slideTo(0)
                                    }
                                }}>{item}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
    return (
        <div className="page-view">
            <Swiper
                direction={'vertical'}
                mousewheel={true}
                slidesPerView={1}
                speed={800}
                modules={[Mousewheel]}
                className="custom-swiper-page"
                onSwiper={(swiper:any) => {
                    setSwiper(swiper)
                }}
            >
                <SwiperSlide>
                    <FirstScreenWapper/>
                </SwiperSlide>
                <SwiperSlide>
                    <AboutWapper/>
                </SwiperSlide>
                <SwiperSlide>
                    <NewsWapper/>
                </SwiperSlide>
                <SwiperSlide>
                    <MarketView/>
                </SwiperSlide>
                <SwiperSlide>
                    <RoadMapWapper/>
                </SwiperSlide>
                <SwiperSlide>
                    <RightWapper/>
                </SwiperSlide>
            </Swiper>
            <CuestomControl />
        </div>
    )
};

export default PageView;
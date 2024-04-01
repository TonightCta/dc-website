import { ReactElement } from "react";
import IconFont from "../../../utils/icon";

interface News {
    date: string,
    poster:string,
    content: string,
    url:string
}

const NewsWapper = (): ReactElement => {
    const news: News[] = [
        {

            date: 'MARCH 1,2024',
            poster:'https://assets-global.website-files.com/640f3e3ec87e61dbaa49c418/65e1cd0cff4b8312a2505f1a_0301.jpg',
            content: 'Gerrtings to our mothly recap,where we look back at the developments from Dark Frontiers last month.Februarg was a month of significant transformtion and exciting partnerships for Dark Frontiers ,marking another chapter of growth and',
            url:'https://www.darkfrontiers.com/articles/dark-frontiers-monthly-recap-february-2024'
        },
        {
            date: 'FEBRUARY 27,2024',
            poster:'https://assets-global.website-files.com/640f3e3ec87e61dbaa49c418/65df0825d177dfbc97a69b4e_0227(3).jpg',
            content: "Is the expanses of Dark Frontiers,players find themselves ensnared in a web of lore that spans ancient myths,cosmic battles,and untold secrets.The story's architect plays a pivtoal role is shapingthe immersive narrative that captivates players'",
            url:'https://www.darkfrontiers.com/articles/meet-the-lore-writer-behind-dark-frontiers'
        }
    ]
    return (
        <div className="news-wapper">
            <p className="news-title">News</p>
            <div className="news-list">
                <ul>
                    {
                        news.map((item: News, index: number) => {
                            return (
                                <li key={index}>
                                    <div className="top-left-line"></div>
                                    <div className="item-inner">
                                        <div className="poster-box">
                                            <img src={item.poster} alt="" />
                                            <div className="mask-box"></div>
                                        </div>
                                        <p className="date-text">{item.date}</p>
                                        <div className="content-box">
                                            <p className="c-text">{item.content}</p>
                                            <div className="mask-box"></div>
                                        </div>
                                        <p className="read-more" onClick={() => {
                                            window.open(item.url)
                                        }}>
                                            {'Read more'.toLocaleUpperCase()}
                                            <IconFont type="icon-right" />
                                            <IconFont type="icon-right" />
                                            <IconFont type="icon-right" />
                                        </p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
};

export default NewsWapper;
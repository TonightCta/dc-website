import { ReactElement, ReactNode, useState } from "react";
import './index.scss'
import TableList from "./components/table.list";
import FilterBox from "./components/filter";

const NftsView = (): ReactElement<ReactNode> => {
    const [collection, setCollection] = useState<number>(0);
    const [category, setCategory] = useState<number>(0);
    const [label, setLabel] = useState<number[]>([]);
    const [sort, setSort] = useState<number>(0);
    const [sortBy, setSortBy] = useState<number>(0);
    const [poster1, setPoster1] = useState<boolean>(false);
    const [poster2, setPoster2] = useState<boolean>(false);
    return (
        <div className="nfts-view">
            <FilterBox upCollection={(val: number) => {
                setCollection(val);
            }} upCategory={(val: number) => {
                setCategory(val)
            }} upLabel={(val: number[]) => {
                setLabel(val);
            }} upSort={(val: number) => {
                setSort(val)
            }} upSortBy={(val: number) => {
                setSortBy(val);
            }} upPoster1={(val: boolean) => {
                setPoster1(val);
            }} upPoster2={(val: boolean) => {
                setPoster2(val);
            }} />
            <TableList poster1={poster1} poster2={poster2} collection={collection} category={category} label={label} sort={sort} sortBy={sortBy} />
        </div>
    )
};

export default NftsView;
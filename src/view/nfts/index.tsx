import { ReactElement, ReactNode, useState } from "react";
import './index.scss'
import TableList from "./components/table.list";
import FilterBox from "./components/filter";

const NftsView = (): ReactElement<ReactNode> => {
    const [collection,setCollection] = useState<number>(0);
    const [category,setCategory] = useState<number>(0);
    const [label,setLabel] = useState<number[]>([]);
    const [sort,setSort] = useState<number>(0);
    const [sortBy,setSortBy] = useState<number>(0);
    return (
        <div className="nfts-view">
            <FilterBox upCollection={(val:number) => {
                setCollection(val);
            }} upCategory={(val:number) => {
                setCategory(val)
            }} upLabel={(val:number[]) => {
                setLabel(val);
            }} upSort={(val:number) => {
                setSort(val)
            }} upSortBy={(val:number) => {
                setSortBy(val);
            }}/>
            <TableList collection={collection} category={category} label={label} sort={sort} sortBy={sortBy}/>
        </div>
    )
};

export default NftsView;
import React, { ReactElement, ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import * as View from '../view/view'
import LoadingMine from "../components/loading";


const RouteConfig = (): ReactElement<ReactNode> => {
    return (
        <Routes>
            <Route path="/" element={<React.Suspense fallback={<LoadingMine />}>
                <View.IndexView />
            </React.Suspense>}>
                <Route index element={<React.Suspense fallback={<LoadingMine />}>
                    <View.PageView />
                </React.Suspense>}></Route>
            </Route>
        </Routes>
    )
};

export default RouteConfig;
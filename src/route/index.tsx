import React, { ReactElement, ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import * as View from '../view/view'
import LoadingMine from "../components/loading";


const RouteConfig = (): ReactElement<ReactNode> => {
    return (
        <Routes>
            <Route path="/" element={<React.Suspense fallback={<LoadingMine/>}>
                <View.IndexView />
            </React.Suspense>}>
                <Route index element={<React.Suspense fallback={<LoadingMine/>}>
                    <View.NftsView/>
                </React.Suspense>}></Route>
                <Route path="/creator" element={<React.Suspense fallback={<LoadingMine/>}>
                    <View.CreatorView/>
                </React.Suspense>}></Route>
                <Route path="/gallery" element={<React.Suspense fallback={<LoadingMine/>}>
                    <View.GalleryView/>
                </React.Suspense>}></Route>
                <Route path="/creative" element={<React.Suspense fallback={<LoadingMine/>}>
                    <View.CreativeView/>
                </React.Suspense>}></Route>
                <Route path="/default" element={<React.Suspense fallback={<LoadingMine/>}>
                    <View.DefaultView/>
                </React.Suspense>}></Route>
            </Route>
            <Route path="/login" element={<React.Suspense fallback={<LoadingMine/>}>
                <View.LoginView />
            </React.Suspense>}></Route>
        </Routes>
    )
};

export default RouteConfig;
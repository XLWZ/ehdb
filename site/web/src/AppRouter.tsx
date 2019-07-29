import * as React from "react";
import { BrowserRouter, Redirect, Route, RouteProps } from "react-router-dom";
import Home, { GalleryType } from "./components/Home";

export const AppRouter: React.StatelessComponent<{}> = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={(p: any) => <Home {...p} type={GalleryType.Gallery} />} />
            <Route exact path="/uploader" component={(p: any) => <Home {...p} type={GalleryType.Uplaoder} />} />
            <Route exact path="/tags" component={(p: any) => <Home {...p} type={GalleryType.Tag} />} />
        </BrowserRouter>
    );
};
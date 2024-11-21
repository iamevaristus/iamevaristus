import { GlobalWorkerOptions } from "pdfjs-dist";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Layout from "./app/layout/Layout";
import { WebUiKit } from "./components/WebUikit";
import { Scroller } from "./utilities/Scroller";
import { RouteInterface } from "./configuration/routes/Route";
import Routing from "./configuration/routes/Routing";

GlobalWorkerOptions.workerSrc = "../node_modules/pdfjs-dist/build/pdf.worker.mjs"

export default function Main() {
    const ParentPage = () => {
        return (<Outlet />)
    }

    const renderRoutes = (routes: RouteInterface[]) => {
        return routes.map((route, index) => {
            if (route.children) {
                return (
                    <Route key={index} path={route.path} element={<ParentPage />}>
                        <Route index element={route.page} />
                        {renderRoutes(route.children)}
                    </Route>
                );
            } else {
                return <Route key={index} path={route.path} element={route.page} />;
            }
        });
    };

    return (
        <WebUiKit>
            <BrowserRouter>
                <Scroller>
                    <Routes>
                        {/* <Route path="*" element={AuthRouting.instance.error.page} /> */}
                        <Route element={<Layout />}>
                            {renderRoutes(Routing.instance.getAllRoutes())}
                        </Route>
                    </Routes>
                </Scroller>
            </BrowserRouter>
        </WebUiKit>
    );
}
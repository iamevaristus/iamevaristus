import React from "react";
import { RouteInterface } from "../../configuration/routes/Route";

export default function CommunitiesRoute(): RouteInterface {
    return {
        path: "/communities",
        page: <Layout />,
    }
}

const Layout: React.FC = () => {
    return (
        <React.Fragment>
            ///
        </React.Fragment>
    )
}
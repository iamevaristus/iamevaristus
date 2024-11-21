import AboutRoute from "../../app/about/page";
import CommunitiesRoute from "../../app/communities/page";
import CompaniesRoute from "../../app/companies/page";
import ContactRoute from "../../app/contact/page";
import HomeRoute from "../../app/page";
import { RouteInterface } from "./Route";
import RouteConfig from "./RouteConfig";

class Routing {
    static instance = new Routing();

    /** Home Route */
    home: RouteInterface = HomeRoute();

    /** About Route */
    about: RouteInterface = AboutRoute();

    /** Companies Route */
    companies: RouteInterface = CompaniesRoute();

    /** Communities Route */
    communities: RouteInterface = CommunitiesRoute();

    /** Contact Route */
    contact: RouteInterface = ContactRoute();

    /** Automatically collect all routes */
    getAllRoutes(): RouteInterface[] {
        return Object.values(this).filter((route) => RouteConfig.isRouteInterface(route));
    }

    gatherRoutes(route: RouteInterface): RouteInterface[] {
        const routes: RouteInterface[] = [route];

        // If the route has children, gather them recursively
        if (route.children && route.children.length > 0) {
            route.children.forEach((child) => {
                routes.push(...this.gatherRoutes(child));
            });
        }

        return routes;
    }

    /** Get the current route */
    get(route: string): RouteInterface | undefined {
        const routes: RouteInterface[] = [];

        Object.values(this).forEach((route) => {
            if (RouteConfig.isRouteInterface(route)) {
                routes.push(...this.gatherRoutes(route));
            }
        });

        return routes.find((r) => route === r.path || (route.startsWith(r.path) && r.path !== '/' && route !== '/'))
    }
}

export default Routing;
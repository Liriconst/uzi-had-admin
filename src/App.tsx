import * as React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, withRouter} from "react-router-dom";
import styles from './App.module.scss';
import Home from "./components/home/Home";
import Reviews from "./components/reviews/Reviews";
import Ultrasound from "./components/ultrasound/Ultrasound";
import Spa from "./components/spa/Spa";
import News from "./components/news/News";
import "./App.scss";
import { ApolloProvider } from "react-apollo";
import { client } from "./index";

import {createBrowserHistory} from 'history';

class AppHeaderInner extends React.Component<{location: any}, {
    mode?: string
}> {
    public constructor(props: {}) {
        // @ts-ignore
        super(props);
        this.state = {
            mode: 'all'
        };
    }

    public render(): React.ReactNode {
        const {location} = this.props;

        return (
            <>
                <div className={styles.appBar}>
                    <div className={styles.appBarHeader}>
                        <Link to="/">
                            <span>ПАНЕЛЬ</span>
                            <span>УПРАВЛЕНИЯ</span>
                        </Link>
                    </div>
                    <div>
                        <div className={location.pathname === "/reviews"? styles.appBarMenuButtonActive :
                            styles.appBarMenuButton}><Link to="/reviews">Отзывы</Link></div>
                        <div className={location.pathname === "/ultrasound"? styles.appBarMenuButtonActive :
                            styles.appBarMenuButton}><Link to="/ultrasound">УЗИ</Link></div>
                        <div className={location.pathname === "/spa"? styles.appBarMenuButtonActive :
                            styles.appBarMenuButton}><Link to="/spa">Массаж</Link></div>
                        <div className={location.pathname === "/news"? styles.appBarMenuButtonActive :
                            styles.appBarMenuButton}><Link to="/news">Новости</Link></div>
                    </div>
                    <div className={styles.appBarFooter}>
                        <span className={styles.appBarFooterBuild}>alpha-build:001/1a</span>
                        <span className={styles.appBarFooterLink}>
                            <Link to="/">raccon2.com</Link>
                        </span>
                    </div>
                </div>
            </>
        );
    };
}

const AppHeader = withRouter(AppHeaderInner);

export const appHistory = createBrowserHistory();
// export const {router, params, location, routes} = (window as any).props;

const App: React.FC = () => {
    return (
        <Router history={appHistory}>
            <ApolloProvider client={client}>
                <div className={styles.appHeader}>
                    <AppHeader/>
                    <Switch>
                        <Route path="/reviews">
                            <Reviews/>
                        </Route>
                        <Route path="/ultrasound">
                            <Ultrasound/>
                        </Route>
                        <Route path="/spa">
                            <Spa/>
                        </Route>
                        <Route path="/news">
                          <News/>
                        </Route>
                        <Route path="/">
                          <Home/>
                        </Route>
                    </Switch>
                </div>
            </ApolloProvider>
        </Router>
    );
};

export default App;
import * as React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, withRouter} from "react-router-dom";
import styles from './App.module.scss';
import autobind from "autobind-decorator";
import {Select, Modal, Button, Input} from 'antd';
import Home from "./components/home/Home";
import News from "./components/news/News";
import Reviews from "./components/reviews/Reviews";
import Spa from "./components/spa/Spa";
import Ultrasound from "./components/ultrasound/Ultrasound";
import "./App.scss";

import {createBrowserHistory} from 'history';

const {Option} = Select;
const {TextArea} = Input;

function countDown() {
    let secondsToGo = 10;

    const modal = Modal.success({
        title: 'Благодарим за ваш отзыв!',
        okText: 'Понятно',
        className: 'reviewsWarning',
        content: (<div>
            Ваш отзыв будет опубликован после модерации.
            Это окно закроется через {secondsToGo} сек.
        </div>),
    });

    const timer = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
            content: (<div>
                Ваш отзыв будет опубликован после модерации.
                Это окно закроется через {secondsToGo} сек.
            </div>),
        });
    }, 1000);

    setTimeout(() => {
        clearInterval(timer);
        modal.destroy();
    }, secondsToGo * 1000);
}

class AppHeaderInner extends React.Component<{location: any}, {
    mode?: string,
    visible?: boolean,
    visible2?: boolean,
    loading?: boolean
}> {
    public constructor(props: {}) {
        // @ts-ignore
        super(props);
        this.state = {
            mode: 'all',
            visible: true,
            visible2: false,
            loading: false
        };
    }

    @autobind
    private onModeChange(mode: string) {
        this.setState({mode});
    }

    @autobind
    private showModal() {
        this.setState({visible: true});
    };

    @autobind
    private handleOk() {
        this.setState({loading: true});
        setTimeout(() => {
            this.setState({loading: false, visible: false});
        }, 1000);
        setTimeout(() => {
            countDown();
        }, 1500);
    };

    @autobind
    private handleCancel() {
        this.setState({visible: false});
    };

    public render(): React.ReactNode {
        const {location} = this.props;

        return (
            <>
                <div className={styles.appBar}>
                    <div className={styles.appBarBlock1}>
                        <div className={styles.appBarHeader}>
                            <Link to="/">
                                <span>ПАНЕЛЬ</span>
                                <span>УПРАВЛЕНИЯ</span>
                            </Link>
                        </div>
                        <span className={styles.appBarSeparator}/>
                        <div className={location.pathname === "/reviews"? styles.appBarMenuButtonActive :
                            styles.appBarMenuButton}><Link to="/reviews">Отзывы</Link></div>
                        <div className={location.pathname === "/ultrasound"? styles.appBarMenuButtonActive :
                            styles.appBarMenuButton}><Link to="/ultrasound">УЗИ</Link></div>
                        <div className={location.pathname === "/spa"? styles.appBarMenuButtonActive :
                            styles.appBarMenuButton}><Link to="/spa">Массаж</Link></div>
                        <div className={location.pathname === "/news"? styles.appBarMenuButtonActive :
                            styles.appBarMenuButton}><Link to="/news">Новости</Link></div>
                    </div>
                    <div className={styles.appBarBlock2}>
                        <div className={styles.appBarMenuFooter}>
                            <span className={styles.appBarMenuFooterBlock1}>alpha-build:001/1a</span>
                            <span className={styles.appBarMenuFooterBlock2}>raccon2.com</span>
                        </div>
                    </div>
                </div>
                {/*<div className={styles.appHeaderStart}>*/}
                {/*  <div className={styles.appHeaderStartPart1}>*/}
                {/*    <div className={styles.appHeaderStartAddress}>*/}
                {/*      <div className={styles.appHeaderStartDoubleText}><span>г. Хадыженск, ул. Первомайская,</span></div>*/}
                {/*      <div className={styles.appHeaderStartDoubleText}>д. 103 "А", 2 этаж, кабинет №6</div>*/}
                {/*    </div>*/}
                {/*    <span className={styles.appHeaderStartAddressSeparator}/>*/}
                {/*    <div className={styles.appHeaderStartSchedule}>*/}
                {/*      <div className={styles.appHeaderStartDoubleText}><span>Пн, Вт</span></div>*/}
                {/*      <div className={styles.appHeaderStartDoubleText}>Ср, Пт</div>*/}
                {/*    </div>*/}
                {/*    <span className={styles.appHeaderStartScheduleSeparator}/>*/}
                {/*    <div className={styles.appHeaderStartNumber}>9</div>*/}
                {/*    <div className={styles.appHeaderStartTextOO}>ОО</div>*/}
                {/*    <div className={styles.appHeaderStartNumber}><span>-</span></div>*/}
                {/*    <div className={styles.appHeaderStartNumber}>17</div>*/}
                {/*    <div className={styles.appHeaderStartTextOO}>ОО</div>*/}
                {/*  </div>*/}
                {/*  <div className={styles.appHeaderStartPart2}>*/}
                {/*    <a className={styles.appHeaderStartNet} href='/home'>*/}
                {/*      <img id={styles.img1} src="/static/svg/7-vk-White.svg" alt={""}/>*/}
                {/*      <img id={styles.img2} src="/static/svg/7-vk-39d02a.svg" alt={""}/>*/}
                {/*    </a>*/}
                {/*    <a className={styles.appHeaderStartNet} href='/home'>*/}
                {/*      <img id={styles.img1} src="/static/svg/8-instagram-White.svg" alt={""}/>*/}
                {/*      <img id={styles.img2} src="/static/svg/8-instagram-39d02a.svg" alt={""}/>*/}
                {/*    </a>*/}
                {/*    <div className={styles.appHeaderStartButton}><Link to="/news">Запись online</Link></div>*/}
                {/*    <span className={styles.appHeaderStartPhone}>+7(918)177-24-17</span>*/}
                {/*  </div>*/}
                {/*</div>*/}
                {/*<div className={styles.appHeaderMiddle}>*/}
                {/*  <div className={styles.appHeaderMiddlePart1}>*/}
                {/*    <a className={styles.appHeaderMiddleFavicon} href='/home'>*/}
                {/*      <img src="/static/img/9-favicon.png" alt={""}/>*/}
                {/*    </a>*/}
                {/*    <div className={styles.appHeaderMiddleName}>*/}
                {/*      <div className={styles.appHeaderMiddleDoubleText}><span><Link to="/home">медицинский центр</Link></span></div>*/}
                {/*      <div className={styles.appHeaderMiddleDoubleText}><Link to="/home">"ЮЖНЫЙ"</Link></div>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*  <div className={styles.appHeaderMiddlePart2}>*/}
                {/*    <div className={styles.appHeaderMiddleMenu}>*/}
                {/*      <div className={location.pathname === "/home"? styles.appHeaderMiddleMenuCurrent :*/}
                {/*          styles.appHeaderMiddleMenuText}><Link to="/home">Главная</Link></div>*/}
                {/*      <span className={styles.appHeaderMiddleMenuSpace}/>*/}
                {/*      <div className={location.pathname === "/news"? styles.appHeaderMiddleMenuCurrent :*/}
                {/*          styles.appHeaderMiddleMenuText}><Link to="/news">Новости</Link></div>*/}
                {/*      <span className={styles.appHeaderMiddleMenuSpace}/>*/}
                {/*      <div className={styles.appHeaderMiddleMenuText}>УЗИ</div>*/}
                {/*      <span className={styles.appHeaderMiddleMenuSpace}/>*/}
                {/*      <div className={location.pathname === "/spa"? styles.appHeaderMiddleMenuCurrent :*/}
                {/*          styles.appHeaderMiddleMenuText}><Link to="/spa">Массаж</Link></div>*/}
                {/*      <span className={styles.appHeaderMiddleMenuSpace}/>*/}
                {/*      <div className={styles.appHeaderMiddleMenuText}>Цены</div>*/}
                {/*      <span className={styles.appHeaderMiddleMenuSpace}/>*/}
                {/*      <div className={location.pathname === "/about"? styles.appHeaderMiddleMenuCurrent :*/}
                {/*          styles.appHeaderMiddleMenuText}><Link to="/about">О нас</Link></div>*/}
                {/*      <span className={styles.appHeaderMiddleMenuSpace}/>*/}
                {/*      <div className={location.pathname === "/contacts"? styles.appHeaderMiddleMenuCurrent :*/}
                {/*          styles.appHeaderMiddleMenuText}><Link to="/contacts">Контакты</Link></div>*/}
                {/*      <span className={styles.appHeaderMiddleMenuSpace}/>*/}
                {/*      <div className={location.pathname === "/reviews"? styles.appHeaderMiddleMenuCurrent :*/}
                {/*          styles.appHeaderMiddleMenuText}><Link to="/reviews">Отзывы</Link></div>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</div>*/}
                {/*<div className={styles.appHeaderEnd}>*/}
                {/*  {(location.pathname === "/home") ? (<span className={styles.appHeaderEndText}>НАШИ ПРЕИМУЩЕСТВА</span>) :*/}
                {/*      (location.pathname === "/news") ? (<span className={styles.appHeaderEndText}>НОВОСТИ</span>) :*/}
                {/*          (location.pathname === "/spa") ? (<span className={styles.appHeaderEndText}>МАССАЖ</span>) :*/}
                {/*              (location.pathname === "/about") ? (<span className={styles.appHeaderEndText}>О НАС</span>) :*/}
                {/*                  (location.pathname === "/contacts") ? (<span className={styles.appHeaderEndText}>КОНТАКТЫ</span>) :*/}
                {/*                      (location.pathname === "/reviews") ? (<span className={styles.appHeaderEndText}>ОТЗЫВЫ</span>) :*/}
                {/*                          (<span className={styles.appHeaderEndText}>ОСТАЛЬНОЕ</span>)}*/}
                {/*</div>*/}
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
        </Router>
    );
};

export default App;
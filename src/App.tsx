import * as React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, withRouter} from "react-router-dom";
import styles from './App.module.scss';

import { createBrowserHistory } from 'history';

class AppHeaderInner extends React.Component<{
  location: any;
}> {

  render() {
    const { location } = this.props;

    return (
        <>
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

export const appHistory =  createBrowserHistory();
// export const {router, params, location, routes} = (window as any).props;

const App: React.FC = () => {
  return (
      <Router history={appHistory}>
        <div className={styles.appHeader}>
          <AppHeader/>
          <Switch>
            {/*<Route path="/news">*/}
            {/*  <News/>*/}
            {/*</Route>*/}
            {/*<Route path="/ultrasound">*/}
            {/*  <Ultrasound/>*/}
            {/*</Route>*/}
            {/*<Route path="/spa">*/}
            {/*  <Spa/>*/}
            {/*</Route>*/}
            {/*<Route path="/about">*/}
            {/*  <About/>*/}
            {/*</Route>*/}
            {/*<Route path="/contacts">*/}
            {/*  <Contacts/>*/}
            {/*</Route>*/}
            {/*<Route path="/reviews">*/}
            {/*  <Reviews/>*/}
            {/*</Route>*/}
            {/*<Route path="/">*/}
            {/*  <Home/>*/}
            {/*</Route>*/}
          </Switch>
        </div>
      </Router>
  );
};

export default App;
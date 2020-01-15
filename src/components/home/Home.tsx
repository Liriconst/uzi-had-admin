import * as React from "react";
import {Link} from "react-router-dom";
import styles from "./Home.module.scss";

class Home extends React.Component<{}, {
    mode?: string,
    visible?: boolean,
    visible2?: boolean,
    loading?:boolean
}> {
    public constructor(props: {}) {
        super(props);
        this.state = {
            mode: 'all',
            visible: false,
            visible2: false,
            loading: false
        };
    }

    public render(): React.ReactNode {
        return (
            <div className={styles.pageHome}>
                <span className={styles.homeTitle}>ЗДРАВСТВУЙТЕ, ИГОРЬ</span>
                <span className={styles.homeSeparator}/>
                <span className={styles.homeText}>Просмотреть, отредактировать и одобрить&nbsp;<Link to="/reviews">/отзывы</Link></span>
                <span className={styles.homeText}>Добавить, просмотреть или изменить запись на&nbsp;<Link to="/ultrasound">/узи</Link></span>
                <span className={styles.homeText}>Просмотреть запросы обратных звонков записи на&nbsp;<Link to="/spa">/массаж</Link></span>
                <span className={styles.homeText}>Добавить, удалить или отредактировать&nbsp;<Link to="/news">/новости</Link></span>
            </div>
        );
    }
}

export default Home;
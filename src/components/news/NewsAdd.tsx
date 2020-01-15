import * as React from "react";
import styles from "./News.module.scss";
import {Input} from "antd";
import "./News.scss";

const {TextArea} = Input;

class NewsAdd extends React.Component<{}, {
}> {
    public constructor(props: {}) {
        super(props);

        this.state = {

        };
    }

    public render(): React.ReactNode {
        return (
            <>
                <div className={styles.reviewsFeedbackHeader}>Введите название новости:</div>
                <Input placeholder="Название новости..."/>
                <div className={styles.reviewsFeedbackHeader2}><span>Введите текст новости:</span></div>
                <TextArea placeholder="Текст новости..." autoSize={{minRows: 3}}/>
            </>
        );
    }
}

export default NewsAdd;
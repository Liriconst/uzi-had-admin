import * as React from "react";
import {Link} from "react-router-dom";
import autobind from "autobind-decorator";
import styles from "./Reviews.module.scss";
import { Select, Modal, Button } from 'antd';
import "./Reviews.scss";
import SpaAll from "./SpaAll";

const {Option} = Select;

class Spa extends React.Component<{}, {
    mode?: string,
    visible?: boolean,
    loading?: boolean,
    valueCabinet?: string,
    valueReview?: string,
    valueMark?: string
}> {
    public constructor(props: {}) {
        super(props);
        this.state = {
            mode: 'all',
            visible: false,
            loading: false,
            valueCabinet: "",
            valueReview: "",
            valueMark: ""
        };
    }

    @autobind
    private handleChangeCabinet(value: any) {
        console.log(`selected ${value}`);
        this.setState({valueCabinet: value});
    }

    @autobind
    private handleChangeReview(value: any) {
        console.log(`selected ${value}`);
        this.setState({valueReview: value});
    }

    @autobind
    private handleChangeMark(value: any) {
        console.log(`selected ${value}`);
        this.setState({valueMark: value});
    }

    public render(): React.ReactNode {
        return (
            <div className={styles.pageReviews}>
                <div className={styles.reviewsFilterButtons}>
                    <div className="reviewsSelect">
                        <Select defaultValue={"allCabinets"} onChange={this.handleChangeCabinet} className="testDrop" dropdownClassName="testDrop">
                            <Option className={styles.reviewButtonSelectSub} value={"allCabinets"}>Все кабинеты</Option>
                            <Option className={styles.reviewButtonSelectSub} value={"USCabinet"}>УЗИ</Option>
                            <Option className={styles.reviewButtonSelectSub} value={"SPACabinet"}>Массаж</Option>
                        </Select>
                    </div>
                    <span className={styles.reviewQuote}>&gt;</span>
                    <div className="reviewsSelect">
                        <Select defaultValue={"allReviews"} onChange={this.handleChangeReview} className="testDrop" dropdownClassName="testDrop">
                            <Option className={styles.reviewButtonSelectSub} value={"allReviews"}>Все отзывы</Option>
                            <Option className={styles.reviewButtonSelectSub} value={"unverifiedReviews"}>Непроверенные</Option>
                            <Option className={styles.reviewButtonSelectSub} value={"approvedReviews"}>Одобренные</Option>
                            <Option className={styles.reviewButtonSelectSub} value={"rejectedReviews"}>Отклонённые</Option>
                        </Select>
                    </div>
                    <span className={styles.reviewQuote}>&gt;</span>
                    <div className="reviewsSelect">
                        <Select defaultValue={"allMarks"} onChange={this.handleChangeMark}>
                            <Option className={styles.reviewButtonSelectSub} value={"allMarks"}>Все оценки</Option>
                            <Option className={styles.reviewButtonSelectSub} value={"positiveMarks"}>Положительные</Option>
                            <Option className={styles.reviewButtonSelectSub} value={"neutralMarks"}>Нейтральные</Option>
                            <Option className={styles.reviewButtonSelectSub} value={"negativeMarks"}>Отрицательные</Option>
                        </Select>
                    </div>
                </div>
                <SpaAll valueCabinet={this.state.valueCabinet} valueReview={this.state.valueReview} valueMark={this.state.valueMark}/>
            </div>
        );
    }
}

export default Spa;
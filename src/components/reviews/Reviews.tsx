import * as React from "react";
import {Link} from "react-router-dom";
import autobind from "autobind-decorator";
import styles from "./Reviews.module.scss";
import { Select, Modal, Button } from 'antd';
import "./Reviews.scss";
import ReviewsAll from "./ReviewsAll";

const {Option} = Select;

function countDown() {
    let secondsToGo = 10;

    const modal = Modal.success({
        title: 'Новость успешно добавлена!',
        okText: 'Понятно',
        className: 'newsWarning',
        content: (<div>
            Новость была успешно добавлена.
            Это окно закроется через {secondsToGo} сек.
        </div>),
    });

    const timer = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
            content: (<div>
                Новость была успешно добавлена.
                Это окно закроется через {secondsToGo} сек.
            </div>),
        });
    }, 1000);

    setTimeout(() => {
        clearInterval(timer);
        modal.destroy();
    }, secondsToGo * 1000);
}

class Reviews extends React.Component<{}, {
    mode?: string,
    visible?: boolean,
    loading?: boolean,
    value?: number
}> {
    public constructor(props: {}) {
        super(props);
        this.state = {
            mode: 'all',
            visible: false,
            loading: false,
            value: 0
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
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 1000);
        setTimeout(() => {
            countDown();
        }, 1500);
    };

    @autobind
    private handleCancel() {
        this.setState({visible: false});
    };

    @autobind
    private handleChange(value: any) {
        console.log(`selected ${value}`);
        this.setState({value});
    }

    public render(): React.ReactNode {
        return (
            <div className={styles.pageReviews}>
                <div className={styles.reviewsFilterButtons}>
                    <div className="reviewsSelect">
                        <Select defaultValue={0} onChange={this.handleChange} className="testDrop" dropdownClassName="testDrop">
                            <Option className={styles.reviewButtonSelectSub} value={0}>Все отзывы</Option>
                            <Option className={styles.reviewButtonSelectSub} value={1}>Непроверенные</Option>
                            <Option className={styles.reviewButtonSelectSub} value={2}>Одобренные</Option>
                            <Option className={styles.reviewButtonSelectSub} value={3}>Отклонённые</Option>
                        </Select>
                    </div>
                    <span>&gt;</span>
                    <div className="reviewsSelect">
                        <Select defaultValue={0} onChange={this.handleChange}>
                            <Option className={styles.reviewButtonSelectSub} value={0}>Все оценки</Option>
                            <Option className={styles.reviewButtonSelectSub} value={1}>Положительные</Option>
                            <Option className={styles.reviewButtonSelectSub} value={2}>Нейтральные</Option>
                            <Option className={styles.reviewButtonSelectSub} value={3}>Отрицательные</Option>
                        </Select>
                    </div>
                </div>
                <ReviewsAll value={this.state.value}/>
            </div>
        );
    }
}

export default Reviews;
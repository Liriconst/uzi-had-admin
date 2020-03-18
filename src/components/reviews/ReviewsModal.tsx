import * as React from "react";
import {Button, Modal, Rate} from "antd";
import "./Reviews.scss";
import styles from "./Reviews.module.scss";
import moment from "moment";

class ReviewsModal extends React.Component<any, any> {
    render() {
        const { reviews, isVisible, onClose } = this.props;
        return (
            <Modal
                visible={ isVisible }
                onCancel={ onClose }
                footer={[
                    <Button className={"reviewsButtonButtonInModal"} key="submit" type="primary" onClick={onClose}>Закрыть</Button>
                ]}
                className={"reviewModal"}>
                <div className={styles.reviewsTitleInModal}>{reviews.firstName}&nbsp;{reviews.secondName}</div>
                <div className={styles.reviewsTitlePSInModal}>{moment(reviews.reviewDate).format("DD.MM.YYYY - dddd")}</div>
                <Rate className={(reviews.reviewMark >= 4) ? styles.reviewMarkPosInModal : ((reviews.reviewMark == 3) ? styles.reviewMarkMidInModal : styles.reviewMarkNegInModal)} disabled defaultValue={reviews.reviewMark} />
                <div className={styles.reviewsFullTextInModal}>{ reviews.reviewText }</div>
            </Modal>
        );
    }
}

export default ReviewsModal;
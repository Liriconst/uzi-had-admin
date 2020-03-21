import * as React from "react";
import {Button, Form, Icon, Input, Modal, notification, Popconfirm, Radio} from "antd";
import "./Reviews.scss";
import styles from "./Reviews.module.scss";
import gql from "graphql-tag";
import TextArea from "antd/lib/input/TextArea";
import {Mutation} from "react-apollo";
import {FormCreateKostyl} from "../../utils";
import moment from "moment";

const UPDATE_REVIEWS = gql`
  mutation UpdateReviews ($id: BigInt!, $firstName: String!, $secondName: String!, $reviewText: String!, $reviewStatus: Boolean!) {
    updateReviewById (
        input: {
            id: $id
            reviewPatch: {
                firstName: $firstName
                secondName: $secondName
                reviewText: $reviewText
                reviewStatus: $reviewStatus
            }
        }
    ) {
        review {
            id
            firstName
            secondName
            reviewText
            reviewMark
            reviewDate
            reviewStatus
            reviewCabinet
        }
      }
  }
`;

const DELETE_REVIEWS = gql`
    mutation DeleteReviews($id: BigInt!) {
      deleteReviewById (
        input: {
          id: $id
        }
      ){
        deletedReviewId
      }
    }
`;

interface ReviewsAddProps {
    onClose(): void
    form?: any
    reviews: any
    isVisible: boolean
}

class ReviewsModal extends React.Component<ReviewsAddProps, {
    visible?: boolean,
    visible2?: boolean,
    loading?:boolean
}> {
    public constructor(props: ReviewsAddProps) {
        super(props);
        this.state = {
            visible: false,
            visible2: false,
            loading: false
        };
    }

    componentDidMount(): void {
        console.log(this.props.form);
        this.props.form.setFieldsValue(
            this.props.reviews
        )
    }

    openNotification = () => {
        notification.open({
            message: 'Отзыв успешно отредактирован!',
            icon: <Icon type="check-circle" style={{ color: '#52c41a' }} />,
            duration: 1.5,
        });

        function reloadPage () {
            return window.location.reload();
        }

        setTimeout(reloadPage, 1500);
    };

    openNotificationAfterDelete = () => {
        notification.open({
            message: 'Отзыв был удалён!',
            icon: <Icon type="check-circle" style={{ color: '#52c41a' }} />,
            duration: 1.5,
        });

        function reloadPage () {
            return window.location.reload();
        }

        setTimeout(reloadPage, 1500);
    };

    handleSubmit = (updateReviews: any) => {
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values);
                updateReviews({ variables: {id: this.props.reviews.id, firstName: values.firstName, secondName: values.secondName, reviewText: values.reviewText, reviewStatus: values.reviewStatus }});
                this.props.onClose();
                this.openNotification();
            }
        });
    };

    handleDelete = (deleteNews: any, id: string) => () => {
        this.props.form.validateFields((err: any) => {
            if (!err) {
                deleteNews({ variables: { id }});
                this.props.onClose();
                this.openNotificationAfterDelete();
            }
        });

    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { isVisible, onClose } = this.props;
        let Mark = this.props.reviews.reviewMark;

        return (
            <Mutation mutation={UPDATE_REVIEWS}>
                {(updateReviews: any) => (
                    <Modal
                        visible={ isVisible }
                        onCancel={ onClose }
                        wrapClassName="reviewsWrap">
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <span className={styles.titleInModal}>Отзыв</span>
                            <span className={styles.separatorInModal}/>
                            <div className={styles.HeadersInModal}>
                                <div>
                                    <div className={styles.headerInModal}>Имя пациента:</div>
                                    <Form.Item>
                                        {getFieldDecorator('firstName', {
                                            rules: [{ required: true, message: 'Пожалуйста, заполните поле!' }],
                                        })(
                                            <Input style={{marginRight: "30px"}} className={styles.FIOInModal} placeholder="Имя..."/>
                                        )}
                                    </Form.Item>
                                </div>
                                <div>
                                    <div className={styles.headerInModal}>Фамилия пациента:</div>
                                    <Form.Item>
                                        {getFieldDecorator('secondName', {
                                            rules: [{ required: true, message: 'Пожалуйста, заполните поле!' }],
                                        })(
                                            <Input className={styles.FIOInModal} placeholder="Фамилия..."/>
                                        )}
                                    </Form.Item>
                                </div>
                            </div>
                            <div className={styles.complexTitleInModal}>
                                <span className={styles.headerInModal}>Отзыв пациента:</span>
                                <div className={styles.infoInModal}>
                                    <span>Дата: {moment(this.props.reviews.reviewDate).format("DD.MM.YYYY HH:mm")}</span>
                                    <span style={{margin: "0 10px", color: "#0064aa"}}>|</span>
                                    <div>
                                        <span>Оценка пациента:</span>
                                        &nbsp;
                                        <span className={(Mark >= 4) ? styles.markInModalPos :
                                            ((Mark == 3) ? styles.markInModalMid :
                                                styles.markInModalNeg)}
                                        >
                                        {Mark}
                                    </span>
                                    </div>
                                </div>
                            </div>
                            <Form.Item>
                                {getFieldDecorator('reviewText', {
                                    rules: [{ required: true, message: 'Пожалуйста, заполните поле!' }],
                                })(
                                    <TextArea placeholder="Текст отзыва..." autoSize={{minRows: 3}}/>
                                )}
                            </Form.Item>
                            <div className={styles.headerInModal}>Выберите статус отзыва:</div>
                            <Form.Item>
                                {getFieldDecorator('reviewStatus')(
                                    <Radio.Group className={styles.radioGroupInModal}>
                                        <Radio className={styles.radioInModalPos} value={true}>Одобрить отзыв</Radio>
                                        <Radio className={styles.radioInModalNeg} value={false}>Отклонить отзыв</Radio>
                                        <Radio className={styles.radioInModalMid} disabled={true} value={null}>Новый</Radio>
                                    </Radio.Group>,
                                )}
                            </Form.Item>
                            <span className={styles.reviewsFooterSeparator}/>
                            <div className={styles.reviewsFooter}>
                                <Button className={styles.reviewsFooterButtonCancel} key="submit" type="primary" onClick={this.props.onClose}>Отмена</Button>
                                <span/>
                                <Mutation mutation={DELETE_REVIEWS}>
                                    {(deleteReview: any) => (
                                        <Popconfirm
                                            title="Удалить отзыв?"
                                            onConfirm={this.handleDelete(deleteReview, this.props.reviews.id)}
                                            okText="Да"
                                            cancelText="Нет"
                                            overlayClassName="popDeleteReviews"
                                        >
                                            <Button type="primary" className={styles.reviewsFooterButtonDelete}>Удалить отзыв</Button>
                                        </Popconfirm>
                                    )}
                                </Mutation>
                                <span/>
                                <Button className={styles.reviewsFooterButtonSubmit} key="submit" type="primary" onClick={() => {this.handleSubmit(updateReviews)}}>Подтвердить изменения</Button>
                            </div>
                        </Form>
                    </Modal>
                )}
            </Mutation>
        );
    }
}

export default Form.create()(ReviewsModal) as unknown as React.ComponentClass<FormCreateKostyl<ReviewsModal>>;
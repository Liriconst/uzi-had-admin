import * as React from "react";
import {Link} from "react-router-dom";
import autobind from "autobind-decorator";
import styles from "./Reviews.module.scss";
import {Select, Modal, Button, Input, Rate} from 'antd';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Table } from 'antd';
import { ApolloError } from "apollo-boost";
import moment from "moment";
import 'moment/locale/ru';
import ReviewsModal from "../reviews/ReviewsModal";

const GET_REVIEWS = gql`
    query {
        allReviews(orderBy: REVIEW_DATE_DESC, condition: {reviewStatus: true}) {
            nodes {
                id
                firstName
                secondName
                reviewText
                reviewMark
                reviewDate
            }
        }
    }
`;

interface ReviewsAddProps {
    value?: number
}

class ReviewsAll extends React.Component<ReviewsAddProps, {
    mode?: string,
    visible?: boolean,
    activeModal?: number
}> {
    public constructor(props: ReviewsAddProps) {
        super(props);
        this.state = {
            mode: 'all',
            visible: false,
            activeModal: 0
        }
    }

    @autobind
    private showModal() {
        this.setState({visible: true});
    };

    @autobind
    private showModalFull(id: number) {
        this.setState({activeModal: id});
    };

    @autobind
    private handleCancel() {
        this.setState({visible: false});
    };

    @autobind
    private handleCancelFull() {
        this.setState({activeModal: 0});
    };

    public render(): React.ReactNode {
        function sliceTextFull(str: string) {
            let newStr = str.trim();
            if( newStr.length <= 350) return newStr;
            newStr = newStr.slice( 0, 350);
            let lastSpace = newStr.lastIndexOf(" ");
            if( lastSpace > 0) newStr = newStr.substr(0, lastSpace);
            return newStr + "...";
        }

        function sliceTextMobile(str: string) {
            let newStr = str.trim();
            if( newStr.length <= 100) return newStr;
            newStr = newStr.slice( 0, 100);
            let lastSpace = newStr.lastIndexOf(" ");
            if( lastSpace > 0) newStr = newStr.substr(0, lastSpace);
            return newStr + "...";
        }

        return (
            <Query query={GET_REVIEWS}>
                {({loading, error, data}: {loading: boolean, error?: ApolloError, data: any}) => {
                    if (loading) return <span>"Loading...";</span>;
                    if (error) return <span>`Error! ${error.message}`</span>;
                    let nodes;

                    switch(this.props.value) {
                        case 1: {
                            nodes = data.allReviews.nodes.filter((revTemp:any) => revTemp.reviewMark >= 4);
                            break;
                        }
                        case 2: {
                            nodes = data.allReviews.nodes.filter((revTemp:any) => revTemp.reviewMark == 3);
                            break;
                        }
                        case 3: {
                            nodes = data.allReviews.nodes.filter((revTemp:any) => revTemp.reviewMark <= 2);
                            break;
                        }
                        default: {
                            nodes = data.allReviews.nodes;
                            break;
                        }
                    }
                    return (
                        <div className={styles.pageReviewsAll}>
                            {nodes.map((reviewsQuery: any) => (
                                <div>
                                    <div className={styles.reviewHeader}>
                                        <span className={styles.reviewAvatar}><img src="/static/svg/profileIcon.svg" alt=""/></span>
                                        <div className={styles.reviewHeaderText}>
                                            <span className={(reviewsQuery.reviewMark >= 4) ? styles.reviewsFIOPos :
                                                ((reviewsQuery.reviewMark == 3) ? styles.reviewsFIOMid : styles.reviewsFIONeg)}>
                                                {reviewsQuery.firstName}&nbsp;{reviewsQuery.secondName}
                                            </span>
                                            <span className={styles.reviewHeaderDate}>{moment(reviewsQuery.reviewDate).format("DD.MM.YYYY")}</span>
                                        </div>
                                            <Rate className={(reviewsQuery.reviewMark >= 4) ? styles.reviewMarkPos :
                                                ((reviewsQuery.reviewMark == 3) ? styles.reviewMarkMid :
                                                    styles.reviewMarkNeg)} disabled defaultValue={reviewsQuery.reviewMark}/>
                                    </div>
                                        <div className={styles.reviewsText}>{sliceTextFull(reviewsQuery.reviewText)}</div>
                                        {((reviewsQuery.reviewText).length > 500) ?
                                            <Button type="primary" key={reviewsQuery.id} className={"reviewsButton"} onClick={() => this.showModalFull(reviewsQuery.id)}>Читать целиком</Button> : null}

                                    <ReviewsModal reviews={reviewsQuery} isVisible={reviewsQuery.id === this.state.activeModal} onClose={this.handleCancelFull}/>
                                </div>
                            ))}
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default ReviewsAll;
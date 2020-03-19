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
import ReviewsModal from "../reviews/ReviewsModal";

const GET_REVIEWS = gql`
    query {
        allReviews(orderBy: REVIEW_DATE_DESC) {
            nodes {
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

interface ReviewsAddProps {
    valueReview?: string,
    valueMark?: string
}

class ReviewsAll extends React.Component<ReviewsAddProps, {
    visible?: boolean,
    activeModal?: number
}> {
    public constructor(props: ReviewsAddProps) {
        super(props);
        this.state = {
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
        const Pizdec = 0;
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
                    let endNodes;

                    switch(this.props.valueReview) {
                        case "unverifiedReviews": {
                            nodes = data.allReviews.nodes.filter((revTemp:any) => revTemp.reviewStatus === null);
                            break;
                        }
                        case "approvedReviews": {
                            nodes = data.allReviews.nodes.filter((revTemp:any) => revTemp.reviewStatus === true);
                            break;
                        }
                        case "rejectedReviews": {
                            nodes = data.allReviews.nodes.filter((revTemp:any) => revTemp.reviewStatus === false);
                            break;
                        }
                        default: {
                            nodes = data.allReviews.nodes;
                            break;
                        }
                    }

                    switch(this.props.valueMark) {
                        case "positiveMarks": {
                            endNodes = nodes.filter((revTemp:any) => revTemp.reviewMark >= 4);
                            break;
                        }
                        case "neutralMarks": {
                            endNodes = nodes.filter((revTemp:any) => revTemp.reviewMark === 3);
                            break;
                        }
                        case "negativeMarks": {
                            endNodes = nodes.filter((revTemp:any) => revTemp.reviewMark <= 2);
                            break;
                        }
                        default: {
                            endNodes = nodes;
                            break;
                        }
                    }

                    function changeCabinetName(bool: boolean) {
                        let str;
                        if (bool) str = "УЗИ";
                        else if (!bool) str = "СПА";
                        else str = "???";
                        return str;
                    }

                    function changeStatusName(bool: boolean) {
                        let str;
                        if (bool) str = "ОДОБРЕН";
                        else if (!bool) str = "ОТКЛОНЁН";
                        else str = "НОВЫЙ";
                        return str;
                    }

                    return (
                        <div className={styles.pageReviewsAll}>
                            <div className={styles.priceListTableHeader}>
                                <span className={styles.tableHeaderText}>Инициалы пациента</span>
                                <span className={styles.tableHeaderSeparator} style={{height: "55px", width: "1px", padding: "5px 0"}}/>
                                <span className={styles.tableHeaderText}>Кабинет</span>
                                <span className={styles.tableHeaderSeparator} style={{height: "55px", width: "1px", padding: "5px 0"}}/>
                                <span className={styles.tableHeaderText}>Оценка</span>
                                <span className={styles.tableHeaderSeparator} style={{height: "55px", width: "1px", padding: "5px 0"}}/>
                                <span className={styles.tableHeaderText}>Дата</span>
                                <span className={styles.tableHeaderSeparator} style={{height: "55px", width: "1px", padding: "5px 0"}}/>
                                <span className={styles.tableHeaderText}>Статус</span>
                            </div>
                            {endNodes.map((reviewsQuery: any) => (
                                <div>
                                    <div className={styles.priceListTable}>
                                        <span className={styles.tableSeparator} style={{height: "100%", width: "1px"}}/>
                                        <Button type="primary" key={reviewsQuery.id} style={{justifyContent: "flex-start", paddingLeft: "15px"}} className={"reviewsButton"} onClick={() => this.showModalFull(reviewsQuery.id)}>
                                            {reviewsQuery.firstName}&nbsp;{reviewsQuery.secondName}
                                        </Button>
                                        <span className={styles.tableSeparator} style={{height: "100%", width: "1px", marginLeft: "1px"}}/>
                                        <Button type="primary" key={reviewsQuery.id} className={"reviewsButton"} onClick={() => this.showModalFull(reviewsQuery.id)}>
                                            {changeCabinetName(reviewsQuery.reviewCabinet)}
                                        </Button>
                                        <span className={styles.tableSeparator} style={{height: "100%", width: "1px", marginLeft: "1px"}}/>
                                        <Button type="primary" key={reviewsQuery.id} className={"reviewsButton"} onClick={() => this.showModalFull(reviewsQuery.id)}>
                                            {reviewsQuery.reviewMark}
                                        </Button>
                                        <span className={styles.tableSeparator} style={{height: "100%", width: "1px", marginLeft: "1px"}}/>
                                        <Button type="primary" key={reviewsQuery.id} className={"reviewsButton"} onClick={() => this.showModalFull(reviewsQuery.id)}>
                                            <div className="reviewsButtonInner">
                                                <span>{moment(reviewsQuery.reviewDate).format("DD.MM.YYYY")}</span>
                                                <span>{moment(reviewsQuery.reviewDate).format("HH:mm:ss")}</span>
                                            </div>
                                        </Button>
                                        <span className={styles.tableSeparator} style={{height: "100%", width: "1px", marginLeft: "1px"}}/>
                                        <Button type="primary" key={reviewsQuery.id} className={"reviewsButton"} onClick={() => this.showModalFull(reviewsQuery.id)}>
                                            {changeStatusName(reviewsQuery.reviewStatus)}
                                        </Button>
                                        <span className={styles.tableSeparator} style={{height: "100%", width: "1px"}}/>
                                    </div>
                                    <span className={styles.tableSeparatorHorizontal}/>
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
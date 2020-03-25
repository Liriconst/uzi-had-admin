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
    valueCabinet?: string,
    valueReview?: string,
    valueMark?: string
}

class SpaAll extends React.Component<ReviewsAddProps, {
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

        return (
            <Query query={GET_REVIEWS}>
                {({loading, error, data}: {loading: boolean, error?: ApolloError, data: any}) => {
                    if (loading) return <span>"Loading...";</span>;
                    if (error) return <span>`Error! ${error.message}`</span>;
                    let filterCabinets;
                    let filterReviews;
                    let filterMarks;

                    switch(this.props.valueCabinet) {
                        case "USCabinet": {
                            filterCabinets = data.allReviews.nodes.filter((cabTemp:any) => cabTemp.reviewCabinet === true);
                            break;
                        }
                        case "SPACabinet": {
                            filterCabinets = data.allReviews.nodes.filter((cabTemp:any) => cabTemp.reviewCabinet === false);
                            break;
                        }
                        default: {
                            filterCabinets = data.allReviews.nodes;
                            break;
                        }
                    }

                    switch(this.props.valueReview) {
                        case "unverifiedReviews": {
                            filterReviews = filterCabinets.filter((revTemp:any) => revTemp.reviewStatus === null);
                            break;
                        }
                        case "approvedReviews": {
                            filterReviews = filterCabinets.filter((revTemp:any) => revTemp.reviewStatus === true);
                            break;
                        }
                        case "rejectedReviews": {
                            filterReviews = filterCabinets.filter((revTemp:any) => revTemp.reviewStatus === false);
                            break;
                        }
                        default: {
                            filterReviews = filterCabinets;
                            break;
                        }
                    }

                    switch(this.props.valueMark) {
                        case "positiveMarks": {
                            filterMarks = filterReviews.filter((markTemp:any) => markTemp.reviewMark >= 4);
                            break;
                        }
                        case "neutralMarks": {
                            filterMarks = filterReviews.filter((markTemp:any) => markTemp.reviewMark === 3);
                            break;
                        }
                        case "negativeMarks": {
                            filterMarks = filterReviews.filter((markTemp:any) => markTemp.reviewMark <= 2);
                            break;
                        }
                        default: {
                            filterMarks = filterReviews;
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
                        else if (bool === false) str = "ОТКЛОНЁН";
                        else if (bool === null) str = "НОВЫЙ";
                        return str;
                    }

                    return (
                        <div className={styles.pageReviewsAll}>
                            <div className={styles.reviewsTableHeader}>
                                <span className={styles.reviewsHeaderText}>Инициалы пациента</span>
                                <span className={styles.tableHeaderSeparator} style={{height: "55px", width: "1px", padding: "5px 0"}}/>
                                <span className={styles.reviewsHeaderText}>Кабинет</span>
                                <span className={styles.tableHeaderSeparator} style={{height: "55px", width: "1px", padding: "5px 0"}}/>
                                <span className={styles.reviewsHeaderText}>Оценка</span>
                                <span className={styles.tableHeaderSeparator} style={{height: "55px", width: "1px", padding: "5px 0"}}/>
                                <span className={styles.reviewsHeaderText}>Дата</span>
                                <span className={styles.tableHeaderSeparator} style={{height: "55px", width: "1px", padding: "5px 0"}}/>
                                <span className={styles.reviewsHeaderText}>Статус</span>
                            </div>
                            {filterMarks.map((reviewsQuery: any) => (
                                <div key={reviewsQuery.id}>
                                    <div className={styles.reviewsTable}>
                                        <span className={styles.tableSeparator} style={{height: "100%", width: "1px"}}/>
                                        <Button type="primary" key={reviewsQuery.id} style={{justifyContent: "flex-start", paddingLeft: "15px", left: "-1px"}}
                                                          className={(reviewsQuery.reviewStatus == null) ? "reviewsButtonNew" : "reviewsButton"}
                                        onClick={() => this.showModalFull(reviewsQuery.id)}>
                                            {reviewsQuery.firstName}&nbsp;{reviewsQuery.secondName}
                                        </Button>
                                        <span className={styles.tableSeparator} style={{height: "100%", width: "1px", marginLeft: "1px"}}/>
                                        <Button type="primary" key={reviewsQuery.id} className={(reviewsQuery.reviewStatus == null) ? "reviewsButtonNew" :
                                                                                                                                      "reviewsButton"}
                                        onClick={() => this.showModalFull(reviewsQuery.id)}>
                                            {changeCabinetName(reviewsQuery.reviewCabinet)}
                                        </Button>
                                        <span className={styles.tableSeparator} style={{height: "100%", width: "1px", marginLeft: "1px"}}/>
                                        <Button type="primary" key={reviewsQuery.id} className={(reviewsQuery.reviewStatus == null) ? "reviewsButtonNew" :
                                                                                                                                       "reviewsButton"}
                                                                                     style={(reviewsQuery.reviewMark >= 4) ? {color: "#3bbf00"} :
                                                                                           ((reviewsQuery.reviewMark == 3) ? {color: "#003f7f"} :
                                                                                                                             {color: "#d50000"})}
                                        onClick={() => this.showModalFull(reviewsQuery.id)}>
                                            {reviewsQuery.reviewMark}
                                        </Button>
                                        <span className={styles.tableSeparator} style={{height: "100%", width: "1px", marginLeft: "1px"}}/>
                                        <Button type="primary" key={reviewsQuery.id} className={(reviewsQuery.reviewStatus == null) ? "reviewsButtonNew" :
                                                                                                                                      "reviewsButton"}
                                        onClick={() => this.showModalFull(reviewsQuery.id)}>
                                            <div className="reviewsButtonInner">
                                                <span>{moment(reviewsQuery.reviewDate).format("DD.MM.YYYY")}</span>
                                                <span>{moment(reviewsQuery.reviewDate).format("HH:mm:ss")}</span>
                                            </div>
                                        </Button>
                                        <span className={styles.tableSeparator} style={{height: "100%", width: "1px", marginLeft: "1px"}}/>
                                        <Button type="primary" key={reviewsQuery.id} className={(reviewsQuery.reviewStatus == null) ? "reviewsButtonNew" :
                                                                                                                                      "reviewsButton"}
                                                                                     style={(reviewsQuery.reviewStatus == true) ? {color: "#3bbf00"} :
                                                                                           ((reviewsQuery.reviewStatus == null) ? {color: "#003f7f"} :
                                                                                                                                  {color: "#d50000"})}
                                        onClick={() => this.showModalFull(reviewsQuery.id)}>
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

export default SpaAll;
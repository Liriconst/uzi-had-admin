import * as React from "react";
import {Link} from "react-router-dom";
import autobind from "autobind-decorator";
import styles from "./News.module.scss";
import {Select, Modal, Button, Input} from 'antd';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Table } from 'antd';
import { ApolloError } from "apollo-boost";
import moment from "moment";
import WrappedNewsAdd from "./NewsAdd";

const GET_REVIEWS = gql`
    query {
        allNews(orderBy: NEWS_DATE_DESC) {
            nodes {
                id
                title
                fullText
                newsDate
            }
        }
    }
`;

class NewsAll extends React.Component<{}, {
    mode?: string,
    visible?: boolean
}> {
    public constructor(props: {}) {
        super(props);
        this.state = {
            mode: 'all',
            visible: false
        };
    }

    @autobind
    private showModal() {
        this.setState({visible: true});
    };

    @autobind
    private handleCancel() {
        this.setState({visible: false});
    };

    public render(): React.ReactNode {
        function sliceTitleNews(str: string) {
            return (str.slice(0, 65) + '...');
        }

        return (
            <Query query={GET_REVIEWS}>
                {({loading, error, data}: {loading: boolean, error?: ApolloError, data: any}) => {
                    if (loading) return <span>"Loading...";</span>
                    if (error) return <span>`Error! ${error.message}`</span>;
                    console.log(data);
                    return (
                        <div className={styles.newsAll}>
                            {data.allNews.nodes.map((newsQuery: any) => (
                                <Button type="primary" key={newsQuery.id} className={"newsList"}>
                                    <span style={{fontWeight: "normal"}}>Новость&nbsp;</span>
                                    <span>"{sliceTitleNews(newsQuery.title)}"&nbsp;</span>
                                    <span style={{fontWeight: "normal"}}>от&nbsp;</span>
                                    <span>{moment(newsQuery.newsDate).format("DD.MM.YYYY hh:mm:ss")}</span>
                                </Button>
                            ))}
                            <Modal
                                title="Ваш отзыв"
                                visible={this.state.visible}
                                onCancel={this.handleCancel}
                                wrapClassName="newsWrap"
                            >
                                <WrappedNewsAdd onCancel={this.handleCancel}/>
                            </Modal>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default NewsAll;
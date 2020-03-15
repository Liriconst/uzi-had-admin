import * as React from "react";
import {Link} from "react-router-dom";
import autobind from "autobind-decorator";
import styles from "./News.module.scss";
import {Select, Modal, Button, Input, notification, Icon, Popconfirm} from 'antd';
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Table } from 'antd';
import { ApolloError } from "apollo-boost";
import moment from "moment";
import NewsModal from "./NewsModal";

const GET_NEWS = gql`
    query {
        allNews(orderBy: NEWS_DATE_DESC) {
            nodes {
                id
                title
                fullText
                newsDate
                newsImg
            }
        }
    }
`;

const DELETE_NEWS = gql`
    mutation DeleteNews($id: BigInt!) {
      deleteNewsById (
        input: {
          id: $id
        }
      ){
        deletedNewsId
      }
    }
`;

const UPDATE_NEWS = gql`
    mutation UpdateNews ($id: String!, $title: String!, $fullText: String!, $newsImg: String!) {
    updateNewsById (
        input: {
            id: $id
            newsPatch: {
                title: $title
                fullText: $fullText
                newsImg: $newsImg
            }
        }
    ) {
        news {
          id
          title
          fullText
          newsImg
          newsDate
        }
      }
  }
`;

class NewsAllTest extends React.Component<{}, {
    mode?: string,
    visible?: boolean,
    loading?: boolean,
    activeModal?: number
}> {
    public constructor(props: {}) {
        super(props);
        this.state = {
            mode: 'all',
            visible: false,
            loading: false,
            activeModal: 0
        };
    }

    @autobind
    private showModal(id: number) {
        this.setState({activeModal: id});
    };

    @autobind
    private handleCancel() {
        this.setState({activeModal: 0});
    };

    openNotification = () => {
        notification.open({
            message: 'Новость успешно добавлена!',
            description:
                'Ваша новость была успешно добавлена и в скором времени появится на сайте.',
            icon: <Icon type="check-circle" style={{ color: '#52c41a' }} />,
            duration: 6,
        });
    };

    handleSubmit = (deleteNews: any, id: string) => () => {
        deleteNews({ variables: { id }});
        this.openNotification();
        window.location.reload();
    };

    public render(): React.ReactNode {
        function sliceTitleNews(str: string) {
            return (str.slice(0, 56) + '...');
        }

        return (
            <Query query={GET_NEWS}>
                {({loading, error, data}: {loading: boolean, error?: ApolloError, data: any}) => {
                    if (loading) return <span>"Loading...";</span>;
                    if (error) return <span>`Error! ${error.message}`</span>;
                    console.log(data);
                    return (
                        <div className={styles.newsAll}>
                            {data.allNews.nodes.map((newsQuery: any) => (
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <Button type="primary" key={newsQuery.id} className={"newsList"} onClick={() => this.showModal(newsQuery.id)}>
                                        <span style={{width: "102px", fontWeight: "normal"}}>Новость&nbsp;</span>
                                        <span style={{width: "743px", textAlign: "start"}}>"{sliceTitleNews(newsQuery.title)}"&nbsp;</span>
                                        <span style={{width: "31px", fontWeight: "normal"}}>от&nbsp;</span>
                                        <span style={{width: "214px", textAlign: "start"}}>{moment(newsQuery.newsDate).format("DD.MM.YYYY hh:mm:ss")}</span>
                                    </Button>
                                    <Mutation mutation={DELETE_NEWS}>
                                        {(deleteNews: any) => (
                                            <Popconfirm
                                                title="Удалить новость?"
                                                onConfirm={this.handleSubmit(deleteNews, newsQuery.id)}
                                                okText="Да"
                                                cancelText="Нет"
                                            >
                                            <Button type="primary" className={"newsDeleteButton"}>
                                                <img src="/static/svg/closed-trash-bin.svg" alt=""/>
                                            </Button>
                                            </Popconfirm>
                                        )}
                                    </Mutation>
                                    <NewsModal news={newsQuery} isVisible={newsQuery.id === this.state.activeModal} onClose={this.handleCancel}/>
                                </div>
                            ))}
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default NewsAllTest;
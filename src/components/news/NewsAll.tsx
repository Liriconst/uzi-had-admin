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

const GET_NEWS = gql`
    query AddNews {
        allNews(orderBy: NEWS_DATE_DESC) {
            nodes {
                id
                title
                annotation
                fullText
                newsDate
            }
        }
    }
`;

class NewsAll extends React.Component<{}, {
    mode?: string,
    visible?: boolean,
    visible2?: boolean
}> {
    public constructor(props: {}) {
        super(props);
        this.state = {
            mode: 'all',
            visible: false,
            visible2: false
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
        // const numbers = [
        //     {id: 35, name: 'jumper', color: 'red', price: 20},
        //     {id: 42, name: 'shirt', color: 'blue', price: 15},
        //     {id: 56, name: 'pants', color: 'green', price: 25},
        //     {id: 71, name: 'socks', color: 'black', price: 5},
        //     {id: 72, name: 'socks', color: 'white', price: 5},
        // ];
        //
        // const listItems = numbers.map((number) =>
        //     <div className={styles.newsAllTemplate}>
        //         <span>{number.id}</span>
        //         <span>{number.name}</span>
        //         <span>{number.color}</span>
        //         <span>{number.price}</span>
        //     </div>
        // );
        //
        // return (
        //     <div className={styles.newsAll}>
        //         {listItems}
        //     </div>
        // );

        // const NewsQuery1 = () => (

        return (
            <Query query={GET_NEWS}>
                {({loading, error, data}: {loading: boolean, error?: ApolloError, data: any}) => {
                    if (loading) return <span>"Loading...";</span>
                    if (error) return <span>`Error! ${error.message}`</span>;
                    console.log(data);
                    return (
                        <div className={styles.newsAll}>
                        {/*<select name="newsQuery" onChange={onNewSelected}>*/}
                            {data.allNews.nodes.map((newsQuery: any) => (
                                // onClick={this.showModal}
                                <Button type="primary" key={newsQuery.id} className={"newsList"}>
                                    <span>Новость&nbsp;</span>
                                    <span>"{newsQuery.title}"&nbsp;</span>
                                    <span>от&nbsp;</span>
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
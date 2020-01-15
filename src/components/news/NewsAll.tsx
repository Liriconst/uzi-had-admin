import * as React from "react";
import {Link} from "react-router-dom";
import autobind from "autobind-decorator";
import styles from "./News.module.scss";
import {Select, Modal, Button, Input} from 'antd';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Table } from 'antd';
import {stringify} from "querystring";
import any = jasmine.any;

const GET_NEWS = gql`
    query AddNews {
        allNews {
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
            visible: true,
            visible2: false
        };
    }

    public render(): React.ReactNode {
        const numbers = [
            {id: 35, name: 'jumper', color: 'red', price: 20},
            {id: 42, name: 'shirt', color: 'blue', price: 15},
            {id: 56, name: 'pants', color: 'green', price: 25},
            {id: 71, name: 'socks', color: 'black', price: 5},
            {id: 72, name: 'socks', color: 'white', price: 5},
        ];

        const listItems = numbers.map((number) =>
            <div className={styles.newsAllTemplate}>
                <span>{number.id}</span>
                <span>{number.name}</span>
                <span>{number.color}</span>
                <span>{number.price}</span>
            </div>
        );

        const News = () => (
            <Query query={GET_NEWS}>
                {({loading, error, data}: {loading: boolean, error: boolean, data: any}) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;

                    return (
                        <select name="dog" onChange={News}>
                            {data.dogs.map(dog => (
                                <option key={dog.id} value={dog.breed}>
                                    <span>{dog.breed}</span>
                                </option>
                            ))}
                        </select>
                    );
                }}
            </Query>
        );

        // return (
        //     <div className={styles.newsAll}>
        //         {listItems}
        //     </div>
        // );
    }
}

export default NewsAll;
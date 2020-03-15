import * as React from "react";
import {Button, Form, Icon, Input, Modal, notification} from "antd";
import "./News.scss";
import styles from "./News.module.scss";
import gql from "graphql-tag";
import TextArea from "antd/lib/input/TextArea";
import {Mutation} from "react-apollo";
import {FormCreateKostyl} from "../../utils";

const UPDATE_NEWS = gql`
  mutation UpdateNews ($id: BigInt!, $title: String!, $fullText: String!, $newsImg: String!) {
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

interface NewsAddProps {
    onClose(): void
    form?: any
    news: any
    isVisible: boolean
}

class NewsModal extends React.Component<NewsAddProps, {
    mode?: string,
    visible?: boolean,
    visible2?: boolean,
    loading?:boolean
}> {
    public constructor(props: NewsAddProps) {
        super(props);
        this.state = {
            mode: 'all',
            visible: false,
            visible2: false,
            loading: false
        };
    }

    componentDidMount(): void {
        console.log(this.props.form);
        this.props.form.setFieldsValue(
            this.props.news
        )
    }

    openNotification = () => {
        notification.open({
            message: 'Новость успешно добавлена!',
            description:
                'Ваша новость была успешно добавлена и вскором времени появится на сайте.',
            icon: <Icon type="check-circle" style={{ color: '#52c41a' }} />,
            duration: 6,
        });
    };

    handleSubmit = (updateNews: any) => {
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values);
                updateNews({ variables: {id: this.props.news.id, title: values.title, fullText: values.fullText, newsImg: values.newsImg }});
                this.props.onClose();
                this.openNotification();
                // this.props.form.resetFields();
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { news, isVisible, onClose } = this.props;

        return (
            <Mutation mutation={UPDATE_NEWS}>
                {(updateNews: any, {}) => (
                    <Modal
                        visible={ isVisible }
                        onCancel={ onClose }
                        // footer={[
                        //     <Button className={"newsButtonInModal"} key="submit" type="primary" onClick={onClose}>Закрыть</Button>
                        // ]}
                        className={"newsModal"}>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <div className={styles.addNewsHeaderTitle}>Введите название новости:</div>
                            <Form.Item>
                                {getFieldDecorator('title', {
                                    rules: [{ required: true, message: 'Пожалуйста, заполните поле!' }],
                                })(
                                    <Input placeholder="Название новости..."/>
                                )}
                            </Form.Item>
                            <div className={styles.addNewsHeaderText}>Краткое содержание новости:</div>
                            <Form.Item>
                                {getFieldDecorator('newsImg', {
                                    rules: [{ required: true, message: 'Пожалуйста, заполните поле!' }],
                                })(
                                    <TextArea placeholder="Краткое содержание, заполняется автоматически..." autoSize={{minRows: 3}} name="addAnnotation"/>
                                )}
                            </Form.Item>
                            <div className={styles.addNewsHeaderText}>Введите текст новости:</div>
                            <Form.Item>
                                {getFieldDecorator('fullText', {
                                    rules: [{ required: true, message: 'Пожалуйста, заполните поле!' }],
                                })(
                                    <TextArea placeholder="Текст новости..." autoSize={{minRows: 3}}/>
                                )}
                            </Form.Item>
                            <span className={styles.addNewsFooterSeparator}/>
                            <div className={styles.addNewsFooter}>
                                <span/>
                                <Button className={styles.addNewsFooterButtonCancel} key="submit" type="primary" onClick={this.props.onClose}>Отмена</Button>
                                <Button className={styles.addNewsFooterButtonSubmit} key="submit" type="primary" onClick={() => {this.handleSubmit(updateNews)}}>Добавить новость</Button>
                            </div>
                        </Form>
                    </Modal>
                )}
            </Mutation>
        );
    }
}

export default Form.create()(NewsModal) as unknown as React.ComponentClass<FormCreateKostyl<NewsModal>>;
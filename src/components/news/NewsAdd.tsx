import * as React from "react";
import styles from "./News.module.scss";
import {Input, Form, Icon, Button, Checkbox, notification} from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import "./News.scss";
import autobind from "autobind-decorator";
import {ReactDOM} from "react";
import {FormCreateKostyl} from "../../utils";
const {TextArea} = Input;

const ADD_TODO = gql`
  mutation AddNews ($title: String!, $annotation: String!, $fullText: String!) {
    createNews (
        input: {
            news: {
                title: $title
                annotation: $annotation
                fullText: $fullText
            }
        }
    ) {
        news {
          id
          title
          annotation
          fullText
          newsDate
        }
      }
  }
`;

interface NewsAddProps {
    onCancel(): void
    form?: any
}

class NewsAdd extends React.Component<NewsAddProps, {
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

    openNotification = () => {
        notification.open({
            message: 'Новость успешно добавлена!',
            description:
                'Ваша новость была успешно добавлена и вскором времени появится на сайте.',
            icon: <Icon type="check-circle" style={{ color: '#52c41a' }} />,
            duration: 6,
        });
    };

    handleSubmit = (createNews: any) => {
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values);
                createNews({ variables: { title: values.title, annotation: values.annotation, fullText: values.fullText } });
                this.props.onCancel();
                this.openNotification();
                this.props.form.resetFields();
            }
        });
    };

    public render(): React.ReactNode {
        const { getFieldDecorator } = this.props.form;

        return (
            <Mutation mutation={ADD_TODO}>
                {(createNews: any, {}) => (
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
                            {getFieldDecorator('annotation', {
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
                            <Button className={styles.addNewsFooterButtonCancel} key="submit" type="primary" onClick={this.props.onCancel}>Отмена</Button>
                            <Button className={styles.addNewsFooterButtonSubmit} key="submit" type="primary" onClick={() => {this.handleSubmit(createNews)}}>Добавить новость</Button>
                        </div>
                    </Form>
                )}
            </Mutation>
        );
    }
}

// const WrappedNewsAdd = Form.create({ name: 'normal_login' })(NewsAdd);
// export default WrappedNewsAdd;
export default Form.create()(NewsAdd) as unknown as React.ComponentClass<FormCreateKostyl<NewsAdd>>;
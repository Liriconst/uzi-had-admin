import * as React from "react";
import styles from "./News.module.scss";
import {Input, Form, Icon, Button, Upload, notification, Modal} from "antd";
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
    onCancel(): void
    form?: any
}

function getBase64(file: any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class NewsAdd extends React.Component<NewsAddProps, {
    mode?: string,
    visible?: boolean,
    visible2?: boolean,
    loading?:boolean,
    previewVisible?: boolean,
    previewImage?: string,
    fileList?: any[]
}> {
    public constructor(props: NewsAddProps) {
        super(props);
        this.state = {
            mode: 'all',
            visible: false,
            visible2: false,
            loading: false,
            previewVisible: false,
            previewImage: '',
            fileList: []
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

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleChange = ({fileList}: { fileList: any}) => this.setState({ fileList });

    public render(): React.ReactNode {
        const { getFieldDecorator } = this.props.form;
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="newsUploadImgButton">
                    <span>Выберите</span>
                    <span>картинку</span>
                </div>
            </div>
        );

        return (
            <Mutation mutation={ADD_TODO}>
                {(createNews: any, {}) => (
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <div className={styles.newsModalImgTitleBlock}>
                            <div className="clearfix">
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                >
                                    {fileList && fileList.length >= 1 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </div>
                            <div style={{paddingLeft: "30px"}}>
                                <div className={styles.addNewsHeaderTitle}>Введите название новости:</div>
                                <Form.Item>
                                    {getFieldDecorator('title', {
                                        rules: [{ required: true, message: 'Пожалуйста, заполните поле!' }],
                                    })(
                                        <TextArea placeholder="Название новости..." autoSize={{minRows: 2}}/>
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        <div className={styles.addNewsHeaderText}>Введите ссылку на картинку:</div>
                        <Form.Item>
                            {getFieldDecorator('newsImg', {
                                rules: [{ required: true, message: 'Пожалуйста, заполните поле!' }],
                            })(
                                <Input placeholder="Ссылка на картинку..."/>
                            )}
                        </Form.Item>
                        <div className={styles.addNewsHeaderText}>Введите текст новости:</div>
                        <Form.Item>
                            {getFieldDecorator('fullText', {
                                rules: [{ required: true, message: 'Пожалуйста, заполните поле!' }],
                            })(
                                <TextArea placeholder="Текст новости..." autoSize={{minRows: 7}}/>
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
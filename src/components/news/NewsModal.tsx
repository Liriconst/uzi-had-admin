import * as React from "react";
import {Button, Form, Icon, Input, Modal, notification, Upload} from "antd";
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

function getBase64(file: any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

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

    render() {
        const { getFieldDecorator } = this.props.form;
        const { isVisible, onClose } = this.props;
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
            <Mutation mutation={UPDATE_NEWS}>
                {(updateNews: any, {}) => (
                    <Modal
                        visible={ isVisible }
                        onCancel={ onClose }
                        className={"newsModal2"}
                        wrapClassName="newsWrap">
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
                            <div className={styles.addNewsHeaderText}>Краткое содержание новости:</div>
                            <Form.Item>
                                {getFieldDecorator('newsImg', {
                                    rules: [{ required: true, message: 'Пожалуйста, заполните поле!' }],
                                })(
                                    <Input placeholder="Краткое содержание, заполняется автоматически..."/>
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
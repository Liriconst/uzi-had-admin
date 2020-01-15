import * as React from "react";
import {Link} from "react-router-dom";
import autobind from "autobind-decorator";
import styles from "./News.module.scss";
import {Select, Modal, Button, Input} from 'antd';
import "./News.scss";
import WrappedNewsAdd from "./NewsAdd";
import NewsAll from "./NewsAll";

const {Option} = Select;
const {TextArea} = Input;

function countDown() {
    let secondsToGo = 10;

    const modal = Modal.success({
        title: 'Новость успешно добавлена!',
        okText: 'Понятно',
        className: 'newsWarning',
        content: (<div>
            Новость была успешно добавлена.
            Это окно закроется через {secondsToGo} сек.
        </div>),
    });

    const timer = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
            content: (<div>
                Новость была успешно добавлена.
                Это окно закроется через {secondsToGo} сек.
            </div>),
        });
    }, 1000);

    setTimeout(() => {
        clearInterval(timer);
        modal.destroy();
    }, secondsToGo * 1000);
}

class News extends React.Component<{}, {
    mode?: string,
    visible?: boolean,
    visible2?: boolean,
    loading?:boolean
}> {
    public constructor(props: {}) {
        super(props);
        this.state = {
            mode: 'all',
            visible: false,
            visible2: false,
            loading: false,

        };
    }

    @autobind
    private onModeChange(mode: string) {
        this.setState({mode});
    }

    @autobind
    private showModal() {
        this.setState({visible: true});
    };

    @autobind
    private handleOk() {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 1000);
        setTimeout(() => {
            countDown();
        }, 1500);
    };

    @autobind
    private handleCancel() {
        this.setState({visible: false});
    };

    public render(): React.ReactNode {
        return (
            <div className={styles.pageNews}>
                <div className={styles.newsButtons}>
                    <div className="newsModal">
                        <Button type="primary" onClick={this.showModal}>
                            Добавить новость
                        </Button>
                        <Modal
                            title="Ваш отзыв"
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            // footer={[
                            //     <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
                            //         Добавить новость
                            //     </Button>,
                            // ]}
                            wrapClassName="newsWrap"
                        >
                            <WrappedNewsAdd onCancel={this.handleCancel}/>
                        </Modal>
                    </div>
                </div>
                {/*<div className={styles.newsShowBlock}/>*/}
                <NewsAll/>
            </div>
        );
    }
}

export default News;
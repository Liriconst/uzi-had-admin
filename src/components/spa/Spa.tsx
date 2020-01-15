import * as React from "react";
import {Link} from "react-router-dom";
import autobind from "autobind-decorator";
import {Select, Modal, Button, Input} from 'antd';

class Spa extends React.Component<{}, {
    mode?: string,
    visible?: boolean,
    visible2?: boolean,
    loading?:boolean
}> {
    public constructor(props: {}) {
        super(props);
        this.state = {
            mode: 'all',
            visible: true,
            visible2: false,
            loading: false
        };
    }

    public render(): React.ReactNode {
        return (
            <div>
                123
            </div>
        );
    }
}

export default Spa;
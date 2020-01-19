import * as React from 'react';

import './style.less';
import units from '../../units/units';

import { Drawer, Input, DatePicker, Select, Button } from 'antd';
import * as moment from 'moment';
const { TextArea } = Input;
const { Option } = Select;

import { connect } from 'dva';

export interface State {
    title: string,
    time: string,
    content: string,
    status: string,
}

let statusOption = [
    {
        label: '未完成',
        value: '0',
    },
    {
        label: '已完成',
        value: '1',
    },
];

export interface Props {
    drawerVisible: boolean,
    dispatch?: (action: any) => void;
}

class drawer extends React.Component<Props, object> {
    static displayName = 'Tode'

    static defaultProps = {
    }

    public state: State = {
        title: '',
        time: '',
        content: '',
        status: '',
    }

    // 输入框编辑
    inputChange =(type: String, e: React.FormEvent<HTMLInputElement>)=>{
        // console.log(type, e.currentTarget.value);
        let value = e.currentTarget.value||'';
        this.setState({
            title: (type == 'title')?value:this.state.title,
            content: (type == 'content')?value:this.state.content,
        })
    }

    // 状态选择
    statusChange =(value: String)=>{
        // console.log(value);
        this.setState({
            status: value,
        })
    }

    // 时间选择
    timeChange =(value: Object, time: String)=>{
        // console.log( time );
        this.setState({
            time: time,
        })
    }

    // 创建
    createBtn =()=>{
        if( this.state.title && this.state.time && this.state.content && this.state.status ){
            let payload: object = {
                title: this.state.title, time: this.state.time, content: this.state.content, status: this.state.status,
            };
            this.props.dispatch({
                type: 'todoModel/createTodos',
                payload,
            });
        }
    }

    // 取消
    closeBtn =()=>{
        let payload: object = {
            drawerVisible: false
        };
        this.props.dispatch({
            type: 'todoModel/save',
            payload,
        });
    }

    render() {

      return (
        <Drawer
          placement="right"
          closable={false}
          destroyOnClose={true}
          width={300}
          visible={this.props.drawerVisible}
        >
            <div className='drawer-title'>
                <div className='drawer-title-name'>标题：</div>
                <Input
                    placeholder="请输入标题" 
                    style={{ width: 200 }}
                    allowClear={true}
                    onChange={this.inputChange.bind(this, 'title')}
                />
            </div>

            <div className='drawer-time'>
                <div className='drawer-time-name'>时间：</div>
                <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    allowClear={true}
                    disabledDate={units.disabledDate}
                    disabledTime={units.disabledDateTime}
                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                    style={{ width: 200 }} 
                    onChange={this.timeChange.bind(this)}
                />
            </div>

            <div className='drawer-content'>
                <div className='drawer-content-name'>内容：</div>
                <TextArea
                    placeholder="请输入内容" 
                    style={{ width: 200 }} 
                    autoSize={{ minRows: 4, maxRows: 8 }}
                    allowClear={true}
                    onChange={this.inputChange.bind(this, 'content')}
                />
            </div>

            <div className='drawer-status'>
                <div className='drawer-status-name'>状态：</div>
                <Select
                    style={{ width: 120 }} 
                    allowClear={true}
                    onChange={this.statusChange.bind(this)}
                >
                    {
                        statusOption.map( v =>(
                            <Option key={v.value} value={v.value}>{v.label}</Option>
                        ) )
                    }
                </Select>
            </div>

            <Button 
                className='drawer-create'
                type="primary"
                onClick={this.createBtn.bind(this)}
            >创建</Button>

            <Button 
                className='drawer-close'
                onClick={this.closeBtn.bind(this)}
            >取消</Button>
        </Drawer>
      );
    }
}

const StateToProps = (state: any, props: any) => {
    return {
        drawerVisible: state.todoModel.drawerVisible,
    }
};

export default connect(StateToProps)(drawer);
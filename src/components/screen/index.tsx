import * as React from 'react';

import './style.less';

import { Input, DatePicker, Select, Button } from 'antd';
import * as moment from 'moment';
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
    current: number,
    pageSize: number,
    dispatch?: (action: any) => void;
}

class screen extends React.Component<Props, object> {
    static displayName = 'Tode'

    static defaultProps = {
    }

    public state: State = {
        title: '',
        time: '',
        content: '',
        status: '',
    }

    componentDidMount(){
        let payload: object = {
            title: this.state.title, time: this.state.time, content: this.state.content, status: this.state.status, current: 1, pageSize: this.props.pageSize,
        };
        this.props.dispatch({
            type: 'todoModel/searchTodos',
            payload,
        });
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

    // 确定搜索
    searchBtn =()=>{
        let payload: object = {
            title: this.state.title, time: this.state.time, content: this.state.content, status: this.state.status, current: 1, pageSize: this.props.pageSize,
        };
        this.props.dispatch({
            type: 'todoModel/searchTodos',
            payload,
        });
    }

    // 新增
    createBtn =()=>{
        let payload: object = {
            drawerVisible: true
        };
        this.props.dispatch({
            type: 'todoModel/save',
            payload,
        });
    }

    render() {
      const {  } = this.props;

      return (
        <div className='screen-index' >
            <div className='screen-title'>
                <div className='screen-title-name'>标题：</div>
                <Input
                    placeholder="请输入标题" 
                    style={{ width: 200 }}
                    allowClear={true}
                    onChange={this.inputChange.bind(this, 'title')}
                />
            </div>

            <div className='screen-time'>
                <div className='screen-time-name'>时间：</div>
                <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    allowClear={true}
                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                    style={{ width: 200 }} 
                    onChange={this.timeChange.bind(this)}
                />
            </div>

            <div className='screen-content'>
                <div className='screen-content-name'>内容：</div>
                <Input
                    placeholder="请输入内容" 
                    style={{ width: 200 }} 
                    allowClear={true}
                    onChange={this.inputChange.bind(this, 'content')}
                />
            </div>

            <div className='screen-status'>
                <div className='screen-status-name'>状态：</div>
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
                className='screen-search'
                type="primary"
                onClick={this.searchBtn.bind(this)}
            >搜索</Button>

            <Button 
                className='screen-create'
                onClick={this.createBtn.bind(this)}
            >新增</Button>
            
        </div>
      );
    }
}

const StateToProps = (state: any, props: any) => {
    return {
        current: state.todoModel.current, // 表格当前页
        pageSize: state.todoModel.pageSize, // 表格页数据量
    }
};

export default connect(StateToProps)(screen);
import * as React from 'react';

import './style.less';
import units from '../../units/units';

import { Table, Pagination } from 'antd';
import * as moment from 'moment';

import { connect } from 'dva';

export interface State {
    columns: Array<any>,
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

let pageSizeOptions = ['3','5','10','20','50'];

export interface Props {
    current: number,
    pageSize: number,
    total: number,
    dataSource: Array<any>,
    dispatch?: (action: any) => void;
}

class table extends React.Component<Props, object> {
    static displayName = 'Tode'

    static defaultProps = {
    }

    public state: State = {
        columns: [],
    }

    componentDidMount(){
        
        let dom: any = this.refs;
        let tableWidth: number = 1260;
        if(dom){
            tableWidth = dom.toDoTable.offsetWidth-20;
        }

        let list = (
            [
                {
                    title: '序号',
                    dataIndex: 'id',
                    key: 'id',
                    align: 'center',
                    render: (id:number, all: any, index:number) => (
                        <div
                            style={{
                                height:'100%',
                                width: `${(tableWidth * 0.05) - 6}px`,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                textAlign: 'center',
                            }}
                            title={`${index}`}
                        >
                            {index}
                        </div>
                    ),
                },
                {
                    title: '标题',
                    dataIndex: 'title',
                    key: 'title',
                    align: 'center',
                    render: (title:string, all: any, index:number) => (
                        <div
                            style={{
                                height:'100%',
                                width: `${(tableWidth * 0.15) - 6}px`,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                textAlign: 'center',
                            }}
                            title={`${title}`}
                        >
                            {title}
                        </div>
                    ),
                },
                {
                    title: '时间',
                    dataIndex: 'time',
                    key: 'time',
                    align: 'center',
                    render: (time:string, all: any, index:number) => (
                        <div
                            style={{
                                height:'100%',
                                width: `${(tableWidth * 0.1) - 6}px`,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                textAlign: 'center',
                            }}
                            title={`${time}`}
                        >
                            {moment(time).format('YYYY-MM-DD HH:mm:ss')}
                        </div>
                    ),
                },
                {
                    title: '内容',
                    dataIndex: 'content',
                    key: 'content',
                    align: 'center',
                    render: (content:string, all: any, index:number) => (
                        <div
                            style={{
                                height:'100%',
                                width: `${(tableWidth * 0.5) - 6}px`,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                textAlign: 'center',
                            }}
                            title={`${content}`}
                        >
                            {content}
                        </div>
                    ),
                },
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    align: 'center',
                    render: (status:string, all: any, index:number) => (
                        <div
                            style={{
                                height:'100%',
                                width: `${(tableWidth * 0.05) - 6}px`,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                textAlign: 'center',
                                color: `${status!=='1'?'#1890ff':'#666'}`,
                            }}
                            title={`${statusOption.map( (v:any)=>{ if(v.value === status){return v.label} } )}`}
                        >
                            {statusOption.map( (v:any)=>{ if(v.value === status){return v.label} } )}
                        </div>
                    ),
                },
                {
                    title: '操作',
                    dataIndex: 'id',
                    key: 'action',
                    align: 'center',
                    render: (id:string, all: any, index:number) => (
                        <div
                            style={{
                                height:'100%',
                                width: `${(tableWidth * 0.05) - 6}px`,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                textAlign: 'center',
                            }}
                        >
                            {all.status !== '1' && <span 
                                className='table-okBtn'
                                onClick={this.obBtn.bind(this, all.id)}
                            >完成</span>}
                            <span 
                                className='table-delBtn'
                                onClick={this.delBtn.bind(this, all.id)}
                            >删除</span>
                        </div>
                    ),
                },
            ]
        );
        this.setState({
            columns: list,
        })

    }

    // 完成
    obBtn =(id:string)=>{
        let payload: object = {
            id, status: '1',
        };
        this.props.dispatch({
            type: 'todoModel/updateTodos',
            payload,
        });
    }

    // 删除
    delBtn =(id:string)=>{
        let payload: object = {
            id,
        };
        this.props.dispatch({
            type: 'todoModel/delTodos',
            payload,
        });
    }

    // 改变页码
    pageChange =(current: number, pageSize: number)=>{
        // console.log( 'pageChange', current, pageSize);

        let payload: object = {
            title: '', time: '', content: '', status: '', current, pageSize,
        };
        this.props.dispatch({
            type: 'todoModel/searchTodos',
            payload,
        });
    }

    render() {

      return (
        <div 
            className='table-index'
            ref='toDoTable'
        >
            <Table 
                className='table-index-table'
                columns={this.state.columns}
                dataSource={this.props.dataSource}
                bordered={true}
                size='small'
                pagination={false}
                rowKey={record => record.id}
            />

            <Pagination 
                className='table-index-pagination'
                current={this.props.current} 
                total={this.props.total} 
                pageSize={this.props.pageSize}
                onChange={this.pageChange.bind(this)}
                showSizeChanger={true}
                pageSizeOptions={pageSizeOptions}
                onShowSizeChange={this.pageChange.bind(this)}
            />
        </div>
      );
    }
}

const StateToProps = (state: any, props: any) => {
    return {
        current: state.todoModel.current,
        pageSize: state.todoModel.pageSize,
        total: state.todoModel.total,
        dataSource: state.todoModel.dataSource,
    }
};

export default connect(StateToProps)(table);
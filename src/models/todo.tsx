import request from '../units/request';
import api from '../units/api';
import { message } from 'antd';

export default {

    namespace: 'todoModel',
  
    state: {
        stateNameSpace: 'todoModel',
        current: 1, // 表格当前页
        pageSize: 3, // 表格页数据量
        total: 0, // 表格数据总量
        dataSource: [], // 表格内容
        drawerVisible: false, // 新增抽屉的展示隐藏
    },
  
    subscriptions: {
      setup() {
      },
    },
  
    effects: {
        *searchTodos(action:any, operation:any ){
            let result = yield request( api.get.apiSearchTodos, 'get', action.payload, 'params', {}  );
            if(result.status === 0){
                message.success('查询成功！');
                yield operation.put({ type: 'save', payload: { 
                    dataSource: (result.body.rows||[]), 
                    total: result.body.count,
                    current: action.payload.current,
                    pageSize: action.payload.pageSize,
                }});
            }
            else{
                message.error('查询失败！');
            }
        },
        *createTodos(action:any, operation:any ){
            let result = yield request( api.post.apiCreateTodos, 'post', action.payload, 'data', {}  );
            if(result.status === 0){
                message.success('创建成功！');
                yield operation.put({ type: 'save', payload: { 
                    drawerVisible: false,
                }});
                
                let pageSize = yield operation.select( (state:any) => state.todoModel.pageSize);
                yield operation.put({ type: 'searchTodos', payload: { 
                    title: '', time: '', content: '', status: '', current: 1, pageSize
                }});
            }
            else{
                message.error('创建失败！');
            }
        },
        *updateTodos(action:any, operation:any ){
            let result = yield request( api.post.apiUpdateTodos, 'post', action.payload, 'data', {}  );
            if(result.status === 0){
                message.success('编辑成功！');
            }
            else{
                message.error('编辑失败！');
            }

            let pageSize = yield operation.select( (state:any) => state.todoModel.pageSize);
            let current = yield operation.select( (state:any) => state.todoModel.current);
            yield operation.put({ type: 'searchTodos', payload: { 
                title: '', time: '', content: '', status: '', current, pageSize
            }});

        },
        *delTodos(action:any, operation:any ){
            let result = yield request( api.delete.apiDeleteTodos, 'delete', action.payload, 'data', {}  );
            if(result.status === 0){
                message.success('删除成功！');    
            }
            else{
                message.error('删除失败！');
            }

            let pageSize = yield operation.select( (state:any) => state.todoModel.pageSize);
            let current = yield operation.select( (state:any) => state.todoModel.current);
            yield operation.put({ type: 'searchTodos', payload: { 
                title: '', time: '', content: '', status: '', current, pageSize
            }});
        },
    },
  
    reducers: {
      // 通用方法，保存
      save(state:any, action:any) {
        return { ...state, ...action.payload };
      },
    },
  
};
  
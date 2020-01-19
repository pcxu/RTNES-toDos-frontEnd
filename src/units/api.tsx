const env = process.env.NODE_ENV
// 应对部署在不同服务器中
let win:any = window;
const server = `${
    env && env !== 'development'
        ? (win.GLOBAL_CONFIG.url||'')
        : [
            'http://localhost:3000',
        ][0]
}/todo`

let api = {
    get:{
        apiSearchTodos: `${server}/search`, // 查询列表
    },
    post:{
        apiCreateTodos: `${server}/create`, // 创建列表
        apiUpdateTodos: `${server}/update`, // 创建列表
    },
    delete:{
        apiDeleteTodos: `${server}/delete`, // 创建列表
    },
    json:{
    }
}

export default api;
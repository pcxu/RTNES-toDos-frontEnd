import axios from 'axios';

const env = process.env.NODE_ENV
let win:any = window;
const host = `${
    (env && env !== 'development')
    ? (win.GLOBAL_CONFIG.url||'') // win.GLOBAL_CONFIG.url
    : [
        'http://localhost:3000',
    ][0]
}`

const baseURL = `${host}/todo/`;
axios.defaults.timeout = 50000
axios.defaults.baseURL = baseURL
axios.interceptors.request.use(
  (config) => {
    // 发送请求前做些什么 例如修改配置
    return config
  },
  (error) => {
    // 发送请求错误后做些什么
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  (response) => {
    // 请求成功
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url
 * @param  {string} method get post option...
 * @param  {object or string} payload payload
 * @param  {string} type params or data(get) 参数位置
 * @param  {object} options  axios option
 * @return {object} An object containing either "data" or "err"
 */

export default function request( url: string, method: string, payload: any, type: string, opt: any ) {

    return new Promise((resolve, reject) => {
      let options = {
        url,
        method: method ? method : 'post',
        [type]: payload,
        ...opt,
      };
  
      axios({...options}).then(
        (response) => {
          resolve(response.data)
        },
        (error) => {
          reject(error)
        }
      );
  
    });
}
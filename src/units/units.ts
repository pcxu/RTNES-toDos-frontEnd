// 公共方法集
import * as moment from 'moment';

// 获取当前准确时间
function nowDate ():string{
    let now = new Date();
    let year: string = '';
    let month: string = '';
    let date: string = '';
    let day: number;
    let hour: string = '';
    let minu: string = '';
    let sec: string = '';
    let mss: string = '';
    let week: string = '';

    year = `${now.getFullYear()}`;  //得到年份
    month = (now.getMonth()+1 < 9)?`0${now.getMonth()+1}`:`${now.getMonth()+1}`; //得到月份
    date = (now.getDate() < 10)?`0${now.getDate()}`:`${now.getDate()}`; //得到日期
    day = now.getDay(); //得到周几
    hour = (now.getHours() < 10)?`0${now.getHours()}`:`${now.getHours()}`; //得到小时
    minu = (now.getMinutes() < 10)?`0${now.getMinutes()}`:`${now.getMinutes()}`; //得到分钟
    sec = (now.getSeconds() < 10)?`0${now.getSeconds()}`:`${now.getSeconds()}`; //得到秒
    mss = `${now.getMilliseconds()}`; //获取毫秒

    let arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    week = arr_week[day];

    let nowDate = `${year}年${month}月${date}日 ${hour}:${minu}:${sec}(${mss}) ${week}`;

    return nowDate;
}

// 时间限制 系类方法
function range (start: any, end: any) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
}
function disabledDate (current: any) {
    return current && current < moment().endOf('day');
}
function disabledDateTime () {
    return {
      disabledHours: () => [ ...range(0, 8), ...range(20, 24) ],
      disabledMinutes: () => [ ...range(0, 25), ...range(35, 60) ],
      disabledSeconds: () => [61],
    };
}

const units = {
    nowDate,
    disabledDate,
    disabledDateTime,
};

export default units;
import { HOST_WS } from '@/assets/config';

//对象数组，保存业务类型与对应的回调函数
const bizArr = [];
var ws1;
const ws = {
    clearBizArr() {
        bizArr.splice(0);
    },
    init({account,email,phone}) { //建立ws连接
        if (ws1) {
            ws1.close();
        }
        ws1 = new WebSocket(`${HOST_WS}/notification?socketid=${account||email||phone}`);
        
        ws1.onopen = function() {
            console.log('WebSocket connect success.');
        }
        ws1.onclose = function() {
            console.log('WebSocket closed.');
        }
        ws1.onerror = function(err) {
            console.error("err:", err);
        }
        ws1.onmessage = function(evt) {
            console.log("当前回调函数个数" + bizArr.length);
            console.log(evt.data);
            /*let data = JSON.parse(evt.data);
            for (let i = 0; i < bizArr.length; i++) {
              let biz = bizArr[i];
              if (data.mtype == biz.mtype) {
                biz.callback(data);
                break;
              }
            }*/
        };
        console.log("ws:" + ws1);
    },
    register(bizHandler) { //注册业务处理的回调函数,对象格式为：{mtype:'',callback:function(){}
        bizArr.push(bizHandler);
        console.log("bizArrSize = " + bizArr.length)
    },
    close() {
        if (ws1) {
            ws1.close();
        }
    }
}

export default ws;

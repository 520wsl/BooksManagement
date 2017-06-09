import Vue from 'vue';
// 通过process.env.NODE_ENV配置开发还是线上环境
console.log(process.env.NODE_ENV);

let path = (process.env.NODE_ENV === "development")
    ?"http://192.168.2.200:8081/mockjsdata/2/"
    :"";

let getApiUrl = (apiName)=>{
    // if(apiName == "http://172.30.34.121:8080/aliApi/directPay?totalFee=0.01"){
    //     return apiName
    // }
    return path + apiName
};

export default {
    //接口名字和接口参数 测试可行
    get:(apiName="",params={})=>{
        let apiUrl = getApiUrl(apiName);
        console.log(apiUrl)
        return Vue.http.get(apiUrl,{params:params}).then((e)=>{
            return e.data;
        });
    },
    getmoney:()=>{
        Vue.http.get("http://172.30.34.121:8080/aliApi/directPay?totalFee=0.01");
    },
    post:(apiName="",body={})=>{
        let apiUrl = getApiUrl(apiName);
        console.log(apiUrl)
        return Vue.http.post(apiUrl,body).then((e)=>{
            return e.data;
        });
    }
};
<style scoped>
    .sx-tabs {
        margin-top: 17px;
    }
    
    .employ-p {
        padding-left: 20px;
        font-size: 18px;
        line-height: 1.5;
        padding-bottom: 20px;
    }
    
    .employ-p em {
        font-style: normal;
        color: #2d8cf0;
    }
    
    .sx-btn-link {
        color: #2d8cf0;
        cursor: pointer;
    }
    
    .sx-btn-link:hover {
        text-decoration: underline
    }
    .page{
        margin:20px 5px;
    }
    .sx-tabs {
    margin-top: 17px;
  }
  
  .sx-tabs>.ivu-tabs-card>.ivu-tabs-content {}
  
  .sx-tabs .ivu-tabs-nav {
    padding-left: 20px;
  }
  
  .sx-tabs>.ivu-tabs-card>.ivu-tabs-content>.ivu-tabs-tabpane {
    padding: 5px;
  }
  
  .sx-tabs>.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-nav-container {
    height: 49px;
  }
  
  .sx-tabs>.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
    width: 160px;
    height: 48px;
    font-size: 24px;
    color: #666666;
    margin-right: 15px;
    text-align: center;
  }
  
  .sx-tabs>.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
    color: #2d8cf0!important;
  }
  
  .sx-tabs>.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
    height: 50px;
  }
   table td{
       padding:10px 0;
   }
</style>

<template>
    <div>
        <div v-if="page_code == 1" class="sx-tabs">  
            <div class="clearfix" style="height:50px;line-height:32px;padding-top:8px;">
                <span class="float-left">类目:　</span>
                <Checkbox-group v-model="queryInfo.checkbox">
                    <Checkbox v-for="typeList in typeLists" :label="typeList.id" :key="typeList.id" >{{typeList.name}}</Checkbox>                    
                </Checkbox-group>
            </div>
            <div class="clearfix" style="height:50px;line-height:32px;padding-top:8px;">
                <span class="float-left">设计师:</span>
                <Select class="float-left" style="width:100px;margin-left:26px;" v-model="queryInfo.departmentId" @on-change="getDesignerList2">
                    <Option v-for="item in designer_list_1" :value="item.value" :key="item">{{ item.label }}</Option>
                </Select>
                <Select class="float-left" style="width:100px;margin-left:20px;" v-model="queryInfo.designerId">
                    <Option v-for="item in designer_list_2" :value="item.value" :key="item">{{ item.label }}</Option>
                </Select>
                <span class="float-left" style="margin-left:50px;">状态:</span>
                <Select class="float-left" style="width:100px;margin-left:20px;">
                    <Option v-for="item in status_list" :value="item.value" :key="item">{{ item.label }}</Option>
                </Select>
            </div>      
            <div class="clearfix" style="height:50px;line-height:32px;padding-top:8px;">
                <span class="float-left">查询时间:　</span>
                <div class="float-left" style="width:300px;">
                    <Row>
                        <Col span="11">
                        <Date-picker type="date" placeholder="选择日期" v-model="queryInfo.startTime"></Date-picker>
                        </Col>
                        <Col span="2" style="text-align:center;"> 至
                        </Col>
                        <Col span="11">
                        <Date-picker type="date" placeholder="选择日期" v-model="queryInfo.endTime"></Date-picker>
                        </Col>
                    </Row>
                </div>
                <span class="float-left">
                        　最近 ｜
                    </span>
                <span class="float-left sx-btn-link" style="display:block;margin:0 10px;" @click="oneWeek">
                        一周
                    </span>
                <span class="float-left sx-btn-link" style="display:block;margin:0 10px;" @click="oneMonth">
                        1个月
                </span>
                <span class="float-left sx-btn-link" style="display:block;margin:0 10px;" @click="threeMonth">
                        3个月
                </span>
                <span class="float-left sx-btn-link" style="display:block;margin:0 10px;" @click="oneYear">
                    一年
                </span>
            </div>
            <div class="clearfix" style="height:50px;line-height:32px;padding-top:8px;">
                <div class="float-left">
                    <Button type="primary" style="padding: 3.5px 12px;" @click="searchBtn">搜索</Button>
                </div>
                <div class="float-left">
                    <Button type="primary" style="padding: 3.5px 12px;margin-left:20px;" @click="searchBtn">重置</Button>
                </div>
            </div>
            <Table border :columns="demand_columns" :data="demand_data"></Table>
            <div class="clearfix sx-page" >
                <Page :total="queryInfo.total" :current="queryInfo.pageNum" :page-size="queryInfo.pageSize" show-elevator class="float-right page" @on-change="changePage" ></Page>
            </div>
        </div>
        <div v-if="page_code == 2">
            <div class="clearfix">   
                <h2  class="float-left">待分配>任务详情</h2> 
                <Button @click="backPageOne" class="float-right">返回</Button>
            
            </div>
            
            <table width="100%">
                <tr>
                    <td width="40%">任务名称：{{chooseObj.title}}</td>
                    <td width="40%">雇主：{{chooseObj.employer_nickname}}</td>
                </tr>
                <tr>
                    <td>平台>类目：{{chooseObj.class_str}}</td>
                    <td>联系方式：{{chooseObj.employer_phone}}</td>
                </tr>
               
                <tr>
                    <td>期望风格：{{chooseObj.style_name}}</td>

                    <td>详细说明：{{chooseObj.accept_view}}</td>
                    
                </tr>

                <tr>
                    <td>参考店铺：www.taobao.comtd</td>
                    <td>
                        <img src="" alt="">
                    </td>
                </tr>
 
            </table>
            <div class="clearfix" style="height:50px;line-height:32px;padding-top:8px;">
                <span class="float-left">预算:</span>
                <Input  placeholder="请输入..." style="width: 300px"></Input>
            </div>  
            <div class="clearfix" style="height:50px;line-height:32px;padding-top:8px;">
                <span class="float-left">设计师:</span>
                <Select class="float-left" style="width:100px;margin-left:26px;" @on-change="getDesignerList2">
                    <Option v-for="item in designer_list_1" :value="item.value" :key="item">{{ item.label }}</Option>
                </Select>
                <Select class="float-left" style="width:100px;margin-left:20px;">
                    <Option v-for="item in designer_list_2" :value="item.value" :key="item">{{ item.label }}</Option>
                </Select>
            </div>
            <div class="clearfix" style="height:50px;line-height:32px;padding-top:8px;">
                <span class="float-left">计划完成时间:</span>
                <Input  placeholder="请输入..." style="width: 300px"></Input>
            </div>
            <Button type="primary">分配</Button>              
        </div>
        <div v-if="page_code == 3">
            <div class="clearfix">   
                <h2  class="float-left">待支付保证金>任务详情</h2> 
                <Button @click="backPageOne" class="float-right">返回</Button>
            </div>
             <table width="100%">
                <tr>
                    <td width="40%">任务名称:{{chooseObj.title}}</td>
                    <td width="40%">雇主:************</td>
                </tr>
                <tr>
                    <td>平台:****************</td>
                    <td>联系方式:************</td>
                </tr>
                <tr>
                    <td>类目:{{chooseObj.style_name}}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>设计类型:****************</td>
                    <td>详细说明:************</td>
                </tr>
                <tr>
                    <td>期望风格:****************</td>
                    <td>
                        <img src="" alt="">
                    </td>
                </tr>
                <tr>
                    <td>参考店铺：www.taobao.comtd</td>
                    <td>
                        <img src="" alt="">
                    </td>
                </tr>
 
            </table>
            <div class="clearfix" style="height:50px;line-height:32px;padding-top:8px;">
                <span class="float-left">预算:</span>
                1000元（未支付）
            </div>  
            <div class="clearfix" style="height:50px;line-height:32px;padding-top:8px;">
                <span class="float-left">设计师:</span>
                青龙帮-----小朱
            </div>
            <div class="clearfix" style="height:50px;line-height:32px;padding-top:8px;">
                <span class="float-left">计划完成时间:</span>
                2017年6月15日
            </div>
            <Button type="primary">修改</Button> 
        </div>

    </div>
</template>

<script>
    import Api from "../../api/index.js";
    import moment from "moment";
    export default {
    
        data() {
            return {
                chooseObj:{
                    
                },
                // 1 显示主页面 2显示 分配页面 3 显示查看页面
                page_code : "1",
                typeLists:[],

                //设计师帮派选择框
                designer_list_1:[],
            
                //设计师选择框
                designer_list_2:[],
          
                //状态选择框
                status_list: [{
                        value: '0',
                        label: '工作中'
                    },
                    {
                        value: '1',
                        label: '已完成'
                    }
    
                ],
                // 查询参数
                queryInfo:{
                    checkbox:[],
                    pageNum:1,
                    pageSize:10,
                    endTime:new Date(),
                    startTime:moment().subtract('weeks', 1).format(),
                    total:10,
                    departmentId:"",
                    designerId:""
                },
                demand_columns: [{
                        title: '序号',
                        key: 'index'
                    },
                    {
                        title: '需求名称',
                        key: 'title',
                    },
                    {
                        title: '需求发布日期',
                        key: 'publish_time_value'
                    }, {
                        title: '预算',
                        key: 'budget'
                    },
                    {
                        title: '雇主',
                        key: 'employer_nickname'
                    },
                    {
                        title: '联系方式',
                        key: 'employer_phone'
                    },
                    {
                        title:"开始时间",
                         key: 'create_time_value'
                    },{
                        title:"结束时间",
                         key: 'deliver_date_value'
                    },{
                        title:"状态",
                         key: 'status'
                    },{
                        title:"设计师",
                         key: 'designer_name'
                    },{
                        title:"操作",
                        key: 'action',
                        render: (h, params) => {
                            console.log("选中的参数",params,this.chooseObj);
                            if(!params.row.audit_status){
                                 return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        on:{
                                            click:()=>{
                                                console.log(params)
                                                this.chooseObj = this.demand_data[params.index];
                                                this.page_code = 2;
                                            }
                                        }
                                    }, '分配'),
                                    
                                ]); 
                            }else{
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        on:{
                                            click:()=>{
                                                console.log(params);
                                                this.chooseObj = this.demand_data[params.index];
                                                this.page_code = 3;
                                            }
                                        }
                                    }, '查看'),
                                    
                                ]); 
                            }
                           
                        }
                    }
                ],
                demand_data: [],    
            }
        },
        mounted() {
            this.getTypeList();
            this.searchBtn();
            this.getDesignerList1();
        },
        methods:{
           getDesignerList2(){
               Api.get("admin/department/designer/list",{
                   id:this.queryInfo.departmentId
               }).then((e)=>{
                    console.log("获取部门下的设计师",e);
                    if(e.status == 200){
                        let list = []; 
                        for(let i in e.data){
                            let obj = {
                                value:e.data[i].id,
                                label:e.data[i].nickname || e.data[i].realname
                            };
                            list.push(obj);
                        }
                        this.designer_list_2 = list;
                    }
               });
           },
           getDesignerList1(){
               Api.get("admin/department/list").then((e)=>{
                   console.log("获取部门列表",e);
                   if(e.status == 200){
                        let list = []; 
                        for(let i in e.data){
                            let obj = {
                                value:e.data[i].id,
                                label:e.data[i].name
                            };
                            list.push(obj);
                        }
                        this.designer_list_1 = list;
                   }
        
               })
           },
        
           backPageOne(){
             this.page_code=1;
           },
           getStatusValue(complete_status,audit_status,budget_status){
                if(complete_status == 1){
                    return "已完成"
                }else if(complete_status == -1){
                    return "已取消"
                }
                if(audit_status == 0){
                    return "未分配"
                }
                if(audit_status == 1 && budget_status == 0){
                     return "已分配/未缴纳";
                }
                if(audit_status == 1 &&  budget_status==1 && (accept_status == 0 || accept_status == -1)){
                    return "待完成"
                }   
           },
           getTypeList(){
                Api.get("class/child",{
                    pid:4
                }).then((e)=>{
                    console.log("获取到的类目信息数据",e)
                    if(e.status == 200){
                        this.typeLists = e.data;
                        this.queryInfo.checkbox = [];
                        for(let i in e.data){
                            this.queryInfo.checkbox.push(e.data[i].id);
                        }
                    }
                })
           },
           changePage(num){
              this.queryInfo.pageNum = num;
              this.searchBtn();
           },
           searchBtn(){
               console.log(this.queryInfo);
               Api.get("demand/list",{}).then((e)=>{
                    console.log("获取到的需求列表信息",e);
                    if(e.status == 200){
                        let list = [];
                        for(let i in e.data){
                            let obj = {
                                index:"序号",
                                id:e.data[i].id,
                                title:e.data[i].title,
                                publish_time_value: moment(e.data[i].publish_time).format('YYYY-MM-DD hh:mm:ss'),
                                budget:e.data[i].budget,
                                create_time_value: moment(e.data[i].create_time).format('YYYY-MM-DD hh:mm:ss'),
                                deliver_date_value:moment(e.data[i].deliver_date).format('YYYY-MM-DD hh:mm:ss'),
                                designer_name:e.data[i].designer_nickname || e.data[i].designer_realname,
                                employer_nickname:e.data[i].employer_nickname,
                                employer_phone:e.data[i].employer_phone,
                                audit_status:e.data[i].audit_status,
                                status : this.getStatusValue(e.data[i].complete_status,e.data[i].audit_status,e.data[i].budget_status),
                                style_name:e.data[i].style_name,
                                class_str:e.data[i].class_str,
                                accept_view:e.data[i].accept_view
                            };
                            list.push(obj);
                        }
                        this.demand_data = list;
                    }
               }) 
           },
           threeMonth() {
                // this.designerpageInfo.startTime = moment().subtract('months', 3).format();
                // this.designerpageInfo.eDate = new Date();
            },
            oneMonth() {
                // this.designerpageInfo.sDate = moment().subtract('months', 1).format();
                // this.designerpageInfo.eDate = new Date();
            },
            oneWeek() {
                // this.designerpageInfo.sDate = moment().subtract('weeks', 1).format();
                // this.designerpageInfo.eDate = new Date();
            },
            oneYear(){
                // this.designerpageInfo.sDate = moment().subtract('year', 1).format();
                // this.designerpageInfo.eDate = new Date();
            }
        }
    }
</script>
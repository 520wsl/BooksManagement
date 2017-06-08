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
    
</style>

<template>
    <div class="sx-tabs">  
         <div class="clearfix" style="height:50px;line-height:32px;padding-top:8px;">
            <span class="float-left">类目:　</span>
            <!--Checkbox-group v-modal="queryInfo.checkbox">
                <Checkbox label="服装内衣"></Checkbox>
                <Checkbox label="精品鞋包"></Checkbox>
                <Checkbox label="化妆美容"></Checkbox>
                <Checkbox label="珍珠手表"></Checkbox>
                <Checkbox label="汽车配件"></Checkbox>
                <Checkbox label="母婴玩具"></Checkbox>
                <Checkbox label="生活百货"></Checkbox>
                <Checkbox label="家电办公"></Checkbox>
                <Checkbox label="家具家纺"></Checkbox>
                <Checkbox label="食品保健"></Checkbox>
                <Checkbox label="户外运动"></Checkbox>
                <Checkbox label="其他"></Checkbox>
            </Checkbox-group-->
        </div>      
        <div class="clearfix" style="height:50px;line-height:32px;padding-top:8px;">
            <span class="float-left">雇佣日期:　</span>
            <div class="float-left" style="width:300px;">
                <Row>
                    <Col span="11">
                    <Date-picker type="date" placeholder="选择日期" v-model="designerpageInfo.sDate"></Date-picker>
                    </Col>
                    <Col span="2" style="text-align:center;"> 至
                    </Col>
                    <Col span="11">
                    <Date-picker type="date" placeholder="选择日期" v-model="designerpageInfo.eDate"></Date-picker>
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
            <span class="float-left">雇佣类型:　</span>
            <Select v-model="designerpageInfo.type" class="float-left" style="width:116px">
                    <Option v-for="item in typeList" :value="item.value" :key="item">{{ item.label }}</Option>
                </Select>
            <span class="float-left">　雇佣状态:　</span>
            <Select v-model="designerpageInfo.status" class="float-left" style="width:116px">
                    <Option v-for="item in statusList" :value="item.value" :key="item">{{ item.label }}</Option>
                </Select>
            <div class="float-left" style="padding-left:10px;">
                <Button type="primary" style="padding: 3.5px 12px;" @click="getdesignerpagelist">搜索</Button>
            </div>
        </div>
        <Table border :columns="designer_columns" :data="designer_data"></Table>
      
    </div>
</template>

<script>
    import Api from "../../api/index.js";
    import moment from "moment";
    export default {
        data() {
            return {
                value1: "",
                value2: "",
                designer_columns: [{
                        title: '设计师',
                        key: 'designerName'
                    },
                    {
                        title: '雇佣日期',
                        key: 'emloymentDate',
                        width:200
                    },
                    {
                        title: '雇佣类型',
                        key: 'typeValue'
                    }, {
                        title: '雇佣金额',
                        key: 'price'
                    },
                    {
                        title: '待发工资',
                        key: 'price'
                    },
                    {
                        title: '雇佣状态',
                        key: 'statusValue'
                    }
                ],
                designer_data: [],    
                statusList: [{
                        value: '0',
                        label: '工作中'
                    },
                    {
                        value: '1',
                        label: '已完成'
                    }
    
                ],
                typeList: [{
                        value: '0',
                        label: '定制'
                    },
                    {
                        value: '1',
                        label: '包月'
                    }
                ],
                designerpageInfo:{
                    type: "0",
                    status: "0",
                    pageIndex:1,			
                    pageSize:10,
                    total:10,
                    eDate:new Date(),
                    sDate:moment().subtract('weeks', 1).format(),
                }
            }
        },
        mounted() {
           this.getdesignerpagelist();   
        },
        methods:{
           changeDesignerPage(num){
               this.designerpageInfo.pageIndex = num;
               this.getdesignerpagelist();
           },
           getdesignerpagelist(){
                let obj = {
                    ...this.designerpageInfo
                }
                obj.sDate = new Date(obj.sDate).getTime();
                obj.eDate = new Date(obj.eDate).getTime();
                console.warn(obj);
                Api.post("employ/getdesignerpagelist",this.designerpageInfo).then((e)=>{
                    for(let i in e.data.list){
                        e.data.list[i].emloymentDate = new Date(e.data.list[i].startTime).Format('yyyy/MM/dd') +"-"+ new Date(e.data.list[i].endTime).Format('yyyy/MM/dd');
                     }
                     this.designer_data = e.data.list;
                     this.paylogpageInfo.pageIndex = e.pageNum;			
                     this.paylogpageInfo.pageSize = e.pageSize;
                     this.paylogpageInfo.total = e.total;
                })
           },
           threeMonth() {
                this.designerpageInfo.sDate = moment().subtract('months', 3).format();
                this.designerpageInfo.eDate = new Date();
            },
            oneMonth() {
                this.designerpageInfo.sDate = moment().subtract('months', 1).format();
                this.designerpageInfo.eDate = new Date();
            },
            oneWeek() {
                this.designerpageInfo.sDate = moment().subtract('weeks', 1).format();
                this.designerpageInfo.eDate = new Date();
            },
            oneYear(){
                this.designerpageInfo.sDate = moment().subtract('year', 1).format();
                this.designerpageInfo.eDate = new Date();
            }
        }
    }
</script>
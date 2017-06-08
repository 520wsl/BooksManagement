<style scoped>

</style>

<template>
    <div>
        <div v-if="!lookStatus">
            <h2>个人管理</h2>
            <Form :model="from" label-position="left" :label-width="60" :inline="true">
                <Form-item label="姓名:">
                    <Input v-model="from.t1"></Input>
                </Form-item>
                <Form-item label="花名:">
                    <Input v-model="from.t2"></Input>
                </Form-item>
                <Form-item label="门派:">
                    <Select v-model="from.t3" style="width:200px">
                        <Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="状态:">
                    <Select v-model="from.t4" style="width:200px">
                        <Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="search">查询</Button>
                </Form-item>
            </Form>  
            <Table :columns="person_columns" :data="person_data"></Table>
        </div>
        <div v-else>
            <Row>
                <Col :span="12">
                     <h2>个人管理>查看详情 </h2>
                </Col>
                <Col :span="12">
                    <Button @click="back">
                        返回
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col :span="24">
                    <h3>基本信息</h3>
                    <Row>
                        <Col :span="18">
                            <Form :model="formItem" :label-width="80">
                                <Form-item >
                                    输入框:<Input v-model="formItem.input" placeholder="请输入" style="width:200px"></Input>
                                </Form-item>
                                <Form-item label="选择器">
                                    <Select v-model="formItem.select" placeholder="请选择" style="width:200px">
                                        <Option value="beijing">北京市</Option>
                                        <Option value="shanghai">上海市</Option>
                                        <Option value="shenzhen">深圳市</Option>
                                    </Select>
                                </Form-item>
                                
                                <Form-item label="单选框">
                                    <Radio-group v-model="formItem.radio">
                                        <Radio label="male">帅哥</Radio>
                                        <Radio label="female">美女</Radio>
                                    </Radio-group>
                                </Form-item>
                                <Form-item label="多选框">
                                    <Checkbox-group v-model="formItem.checkbox">
                                        <Checkbox label="服装"></Checkbox>
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
                                    </Checkbox-group>
                                </Form-item>
                               
                               
                                <Form-item label="一句话描述">
                                    <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                                </Form-item>


                                <Form-item>
                                    <Button type="primary">提交</Button>
                                    <Button type="ghost" style="margin-left: 8px">取消</Button>
                                </Form-item>
                            </Form>                     
                        </Col>
                        <Col :span="6">
                            <Button @click="back">
                                上传头像
                            </Button>
                        </Col>
                    </Row>
                    
                </Col>
            </Row>
            
        </div>
    </div>
</template>
<script>
    import moment from "moment";
    import Api from "../../api/index.js";
    export default {
        data() {
            
            return {
                formItem: {
                    input: '',
                    select: '',
                    radio: 'male',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [20, 50],
                    textarea: ''
                },
               lookStatus:false,
               cityList:[
                    {
                        value: 'beijing',
                        label: '北京市'
                    },
                    {
                        value: 'shanghai',
                        label: '上海市'
                    },
                    {
                        value: 'shenzhen',
                        label: '深圳市'
                    },
                    {
                        value: 'hangzhou',
                        label: '杭州市'
                    },
                    {
                        value: 'nanjing',
                        label: '南京市'
                    },
                    {
                        value: 'chongqing',
                        label: '重庆市'
                    }
               ],
               from:{
                    t1:"",
                    t2:"",
                    t3:"",
                    t4:""
               },
               person_columns:[
                   {
                       key:"alipayAccount",
                       title: '序号',
                   },
                   {
                       key:"amount",
                       title: '设计师姓名',
                   },
                   {
                       key:"comment",
                       title: '花名',
                   },
                   {
                       key:"comment",
                       title: '门派',
                   },
                   {
                       key:"comment",
                       title: '角色',
                   },
                   {
                       key:"comment",
                       title: '账号状态',
                   },
                   {
                       key:"action",
                       title: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on:{
                                        click:()=>{
                                            this.look(params.index)
                                        }
                                    }
                                }, '查看')
                            ]);
                        }
                   },
                   
               ],
               person_data:[     
               ]
            };
        },
        methods:{
            search(){
                console.log("你点击了search按钮");
                this.query();
            },
            query(){
                let params = {
                    ...this.from
                }
                console.log(params,"TAG")
                Api.get("traderRecode/list",params).then((e)=>{
                    if(e.status == 200){
                        this.person_data = e.data.list;
                    }
                });
            },
            look(index){
                this.lookStatus = true;
            },
            back(){
                this.lookStatus = false;
            }
            
        },
        //生命周期 组件完成渲染
        mounted(){
            this.query();
        },

       
    }
</script>

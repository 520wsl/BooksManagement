<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .layout-3-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
    .layout-top{
      background: #464c5b;
        padding: 10px 0;
        overflow: hidden;

    }
    .layout-top-main{
        float: right;
        margin-right: 15px;
    }
    .layout-top-main a{
        color: #9ba7b5;
    }
    .layout-top-main-left{
        color: #9ba7b5;
        float: left;
        margin-left: 15px;
    }
</style>
<style>
     
  .font20 {
    font-size: 20px;
  }
  .font22{
    font-size: 22px;
  }
  .font24 {
    font-size: 24px;
  }
  
  .float-right {
    float: right;
  }
  
  .float-left {
    float: left;
  }
  
  .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden
  }
  
  .clearfix {
    *+height: 1%;
  }
</style>
<template>
<div id="app">
      <div class="layout" >
        <div class="layout-top">
            <div v-if="!userInfo.login">
                <div class="layout-top-main">
                    <a @click="loginBtn">登录</a> |
                </div>
                <Login></Login>
            </div>
            <div class="clearfix" v-else>
                <div class="layout-top-main-left">
                    欢迎管理员{{ userInfo.info.nickname || userInfo.info.username }} 登陆页面
                </div>
               
                <div class="layout-top-main">
                    <a @click="logoutBtn">登出</a>
                </div>
                <Logout></Logout>
            </div>
        </div>
        <Row type="flex">
            <i-col :span="spanLeft" class="layout-menu-left">
                <Menu :active-name="activeMenuName" theme="dark" width="auto" @on-select="selectMenu">
                    <Menu-item name="1">
                        <span class="layout-text">需求管理</span>
                    </Menu-item>
                    <Menu-item name="2">
                        <span class="layout-text">雇佣管理</span>
                    </Menu-item>
                    <Menu-item name="3">
                        <span class="layout-text">人员管理</span>
                    </Menu-item>
                     <Menu-item name="4">
                        <span class="layout-text">系统配置</span>
                    </Menu-item>
                     <Menu-item name="5">
                        <span class="layout-text">财务管理</span>
                    </Menu-item>
                </Menu>
            </i-col>
            <i-col :span="spanRight">               
                <div class="layout-content">
                    <div class="layout-content-main">
                      <router-view></router-view>
                    </div>
                </div>

            </i-col>
        </Row>
    </div>
</div>

</template>
<script>
    var Pathlist;
    (function (Path) {
        Pathlist[Pathlist["demand"] = 1] = "demand";
        Pathlist[Pathlist["employment"] = 2] = "employment";
        Pathlist[Pathlist["personnel"] = 3] = "personnel";
        Pathlist[Pathlist["system"] = 4] = "system";
        Pathlist[Pathlist["financial"] = 5] = "financial";
    })(Pathlist || (Pathlist = {}));
    let statusCode = "init";
    import Login from "./page/user/login.vue";

    import Api from "./api/index.js"
    export default {
        data () {
            return {
                login_plane:false,
                activeMenuName:"1",
                spanLeft: 2,
                spanRight: 22,
                userInfo :{
                    login:false,
                    info:{
                      
                    }
                }
            }
        },
        computed: {
            iconSize () {
                return this.spanLeft === 5 ? 14 : 24;
            }
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            selectMenu(name){
                let path = Pathlist[name];
                this.$router.push({
                  path:"/user/"+path
                });
            },
            fetchData(){
                console.log(11);
                let activeNum =  Pathlist[this.$route.name];
                if(activeNum){
                    this.activeMenuName = ""+ activeNum;
                }
            },
            loginBtn(){
                this.$root.$emit("LOGIN_PLANE_OPEN",true);
            },
            logoutBtn(){
                this.$Modal.warning({
                    title: "确认退出",
                    content: "你确认要退出吗？",
                    onOk:()=>{
                        Api.get("auth/logout",{}).then((e)=>{
                            if(e.status == 200){
                                 this.userInfo = {
                                    login:false,
                                    info:{
                      
                                    }
                                }   
                            }
                        })
                    }
                });
            },
            bindEvnets(){
                this.$root.$on("LOGIN_SUCESS",()=>{
                    Api.get("auth/info",{}).then((e)=>{
                        if(e.status == 200){
                            this.userInfo.login = true;
                            this.userInfo.info = e.data;
                        }
                    })
                });

            }
        },
        mounted(){
            this.bindEvnets();
        },
        components:{
            Login

        }
    }
</script>
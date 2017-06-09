<template>
     <Modal v-model="login_modal" width="360" :mask-closable="false" >
        <p slot="header" style="text-align:center">
            <span>登陆</span>
        </p>
        <div style="text-align:center">
            <Form ref="formInline" :model="formInline" :rules="ruleInline">
                <Form-item prop="user">
                    <Input type="text" v-model="formInline.user" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </Form-item>
                <Form-item prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="Password">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </Form-item>
            </Form>
        </div>
        <div slot="footer">
            <Button type="primary" size="large" long  @click="login">登录</Button>
        </div>
    </Modal>
</template>
<script>
    import Api from "../../api/index.js";
     export default {
        mounted(){
            this.bindEvents();
        },
        data () {
            return {
                login_modal:false,
                formInline:{
                    user:"",
                    password:""
                },
                ruleInline: {
                    user: [{
                        required: true,
                        message: '请填写用户名',
                        trigger: 'blur'
                    }],
                    password: [{
                            required: true,
                            message: '请填写密码',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            min: 6,
                            message: '密码长度不能小于6位',
                            trigger: 'blur'
                        }
                    ]
                }
            }
            
        },
        methods:{
            login(){
                 this.$refs["formInline"].validate((valid) => {
                    if (valid) {
                        Api.get('auth/login',{
                            password:this.formInline.password,
                            username:this.formInline.user
                        }).then((e)=>{
                            if(e.status == 200){
                                this.$Message.success(e.msg);
                                this.login_modal = false;
                                this.$root.$emit("LOGIN_SUCESS");
                            }else{
                                this.$Message.success('发生错误!');
                            }
                        })
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                }) 
            },

            bindEvents(){   
                this.$root.$on("LOGIN_PLANE_OPEN",()=>{
                    this.login_modal = true;
                });
            },
            removeEvents(){
                this.$root.$off("LOGIN_PLANE_OPEN");
            }
        },
        destroyed(){
            this.removeEvents();
        }
     }
</script>
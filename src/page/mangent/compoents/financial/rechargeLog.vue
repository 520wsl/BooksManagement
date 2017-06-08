<style scoped>

</style>
<template>
    <div>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="80">
            <Form-item label="关键词：">
                <Input v-model="formInline.keyword" placeholder="请输入账号/手机号"></Input>
            </Form-item>
            <Form-item label="充值时间">
                <Row>
                    <Col span="4">
                    <Date-picker type="date" placeholder="开始日期" v-model="formInline.date_s"></Date-picker>
                    </Col>
                    <Col span="1" style="text-align: center">-</Col>
                    <Col span="4">
                    <Date-picker type="date" placeholder="结束日期" v-model="formInline.date_e"></Date-picker>
                    </Col>
                    <Col span="8" style="text-align: center">
                    <Radio-group v-model="action" type="button">
                        <Radio label="new">最近</Radio>
                        <Radio label="week">一周</Radio>
                        <Radio label="onemonth">1个月</Radio>
                        <Radio label="threemonth">3个月</Radio>
                        <Radio label="oneyear">1年</Radio>
                    </Radio-group>
                    </Col>
                    <Col span="7">
                    <Button type="primary" @click="handleSubmit('formInline')">查询</Button>
                    <Button type="info" @click="handleSubmit('formInline')">导出</Button>
                    </Col>
                </Row>
            </Form-item>
        </Form>
        <Table border :columns="columns" :data="data"></Table>
    </div>
</template>
<script>
    import moment from "moment";
    export default {
        data() {
            return {
                action: '',
                columns: [{
                        type: 'index',
                        align: 'center',
                        width: 80 + 'px'
                    },
                    {
                        title: '雇主账号',
                        key: 'zhanghao',
                        align: 'center'
                    },
                    {
                        title: '手机号码',
                        key: 'phonenumber',
                        align: 'center'
                    },
                    {
                        title: '账户余额',
                        key: 'remainingsum',
                        align: 'center'
                    },
                    {
                        title: '充值金额',
                        key: 'rechargesum',
                        align: 'center'
                    },
                    {
                        title: '充值时间',
                        key: 'rechargetime',
                        align: 'center'
                    }
                ],
                data: [{
                        "id": 1463,
                        "phonenumber": -187379989540184,
                        "rechargesum": 719,
                        "rechargetime": "1989-06-15 PM 21:05:45",
                        "remainingsum": 561,
                        "zhanghao": "Michael Rodriguez"
                    },
                    {
                        "id": 539,
                        "phonenumber": -2399626934721384,
                        "rechargesum": 765,
                        "rechargetime": "1972-11-16 AM 04:00:21",
                        "remainingsum": 761,
                        "zhanghao": "Barbara Allen"
                    },
                    {
                        "id": 581,
                        "phonenumber": 1325515466919460,
                        "rechargesum": 627,
                        "rechargetime": "2013-11-29 AM 07:50:17",
                        "remainingsum": 487,
                        "zhanghao": "Betty Williams"
                    },
                    {
                        "id": 444,
                        "phonenumber": 7811731106415720,
                        "rechargesum": 732,
                        "rechargetime": "2011-12-16 PM 22:43:00",
                        "remainingsum": 1984,
                        "zhanghao": "Mark Thompson"
                    }
                ],
                formInline: {
                    user: '',
                    password: '',
                    keyword: ''
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
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        },
        watch: {
            action: function(val, oldVal) {
                this.$Message.success("从  " + oldVal + "  切换到  " + val);
            }
        }
    }
</script>
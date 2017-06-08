<style scoped>
    .fontColor {
        color: red;
        font-weight: bold;
    }
    th {
        text-align: right;
    }
    tr {
        height: 30px;
    }
</style>

<template>
    <div>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
            <Form-item prop="keyword">
                <Input type="text" v-model="formInline.keyword" placeholder="账号或手机号码">
                <Icon type="ios-search-strong" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item>
                <Button type="primary" @click="handleSubmit('formInline')">查询</Button>
            </Form-item>
        </Form>
        <Card style="min-width:600px;max-width:60px;">
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                雇主信息
            </p>
            <table style="width:100%;font-size:16px;">
                <tr>
                    <th>店主账号：</th>
                    <td>xxxxxxxxx</td>
                    <th>手机号码：</th>
                    <td>13401730353</td>
                </tr>
                <tr>
                    <th>支付宝：</th>
                    <td>13401730353</td>
                    <th>支付宝姓名：</th>
                    <td>朱*虎</td>
                </tr>
                <tr>
                    <th>账户余额：</th>
                    <td class="fontColor">5000元</td>
                    <td colspan="2">
                        <Button @click="modal1 = true" type="primary" size="small">操作</Button>
                    </td>
                </tr>
                <tr>
                    <th>平台监管金额：</th>
                    <td class="fontColor">5000元</td>
                    <td colspan="2">
                        <Button @click="modal2 = true" type="primary" size="small">操作</Button>
                    </td>
                </tr>
            </table>
        </Card>
        <br>
        <Table border :columns="columns" :data="data"></Table>
        <Modal v-model="modal1" title="普通的Modal对话框标题" @on-ok="ok" @on-cancel="cancel">
            <p>对话框内容</p>
            <p>对话框内容</p>
            <p>对话框内容</p>
        </Modal>
        <Modal v-model="modal2" title="普通的Modal对话框标题" @on-ok="ok2" @on-cancel="cancel2">
            <p>对话框内容</p>
            <p>对话框内容</p>
            <p>对话框内容</p>
        </Modal>
    </div>
</template>

<script>
    import moment from "moment";
    export default {
        data() {
            return {
                modal1: false,
                modal2: false,
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
                        title: '类型',
                        key: 'actiontype',
                        align: 'center'
                    },
                    {
                        title: '扣减金额',
                        key: 'reducesum',
                        align: 'center'
                    },
                    {
                        title: '事由',
                        key: 'remark',
                        align: 'center',
                        width: '30%'
                    },
                    {
                        title: '操作人',
                        key: 'rechargetime',
                        align: 'center'
                    }
                ],
                data: [{
                        "id": 1463,
                        "phonenumber": -187379989540184,
                        "remark": '"很由百转住元史矿到几算形候全江即。万表思例史在选算切人科从油记华别。共达复直划合们条划工器方细。点毛身育题起着叫标这极属指里正效去常。而产信可存民义效件因更断。""进条集把表维你家那团论己面。照约张展与解美养面电我光斗同。消经少界日路区七元业压定。王办火委改片各队律必部引明。局统包究化二人效会处时造情究。""广格万管改亲育局率相联题取展但。使影响九型正外口亲每次安质道适较列。际党先学学家到三处多空通提铁龙达例强。增样成开办理己开她存需深较委形。"',
                        "rechargetime": "admin<br>1989-06-15 PM 21:05:45",
                        "reducesum": 561,
                        "zhanghao": "Michael Rodriguez",
                        "actiontype": "账户余额退款"
                    },
                    {
                        "id": 539,
                        "phonenumber": -2399626934721384,
                        "remark": 765,
                        "rechargetime": "1972-11-16 AM 04:00:21",
                        "reducesum": 761,
                        "zhanghao": "Barbara Allen",
                        "actiontype": "平台监管<br>（退款至账户余额）"
                    },
                    {
                        "id": 581,
                        "phonenumber": 1325515466919460,
                        "remark": 627,
                        "rechargetime": "2013-11-29 AM 07:50:17",
                        "reducesum": 487,
                        "zhanghao": "Betty Williams",
                        "actiontype": "平台监管<br>（直接退款）"
                    },
                    {
                        "id": 444,
                        "phonenumber": 7811731106415720,
                        "remark": 732,
                        "rechargetime": "2011-12-16 PM 22:43:00",
                        "reducesum": 1984,
                        "zhanghao": "Mark Thompson",
                        "actiontype": "账户余额退款"
                    }
                ],
                formInline: {
                    user: '',
                    password: '',
                    keyword: ''
                },
                ruleInline: {
                    keyword: [{
                        required: true,
                        message: '请填写关键词',
                        trigger: 'blur'
                    }]
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
            },
            ok() {
                this.$Message.info('点击了确定');
            },
            cancel() {
                this.$Message.info('点击了取消');
            },
            ok2() {
                this.$Message.info('点击了确定2222');
            },
            cancel2() {
                this.$Message.info('点击了取消222');
            }
        },
    }
</script>

<style scoped>

</style>

<template>
    <div>
        <Form ref="editData" :model="editData" :rules="ruleInline" inline>
            <Form-item prop="name">
                <Input type="text" v-model="editData.name" placeholder="新增门派">
                <Icon type="edit" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item>
                <Button v-if="editData.action == 'add'" type="success" @click="handleSubmit('editData')">新增</Button>
                <Button v-else="editData.action == 'edit'" type="warning" @click="handleSubmit('editData')">设置</Button>
            </Form-item>
        </Form>
        <Table border :columns="columns" :data="data"></Table>
    </div>
</template>

<script>
    import moment from "moment";
    import Api from "../../../../api/index.js"
    export default {
        data() {
            return {
                editData: {
                    action: 'add',
                    name: '',
                    id: 0,
                    pid:0
                },
                ruleInline: {
                    name: [{
                        required: true,
                        message: '请填写门派名称',
                        trigger: 'blur'
                    }]
                },
                //table thead
                columns: [{
                        type: 'index',
                        align: 'center'
                    },
                    {
                        title: '门派名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        icon: 'edit',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.set(params.row)
                                        }
                                    }
                                }, '设置')
                            ]);
                        }
                    }
                ],
                //table tbody
                data: []
            };
        },
        methods: {
            initEditData() {
                this.editData.action = 'add';
                this.editData.name = '';
                this.editData.id = 0;
            },
            set(params) {
                this.editData.action = 'edit';
                this.editData.name = params.name;
                this.editData.id = params.id;
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.setTeamInfo();
                        this.initEditData();
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            //获取部门列表
            getTeamList() {
                Api.get("admin/department/list").then((e) => {
                    if (e.status == 200) {
                        this.data = e.data;
                    }
                });
            },
            //添加/修改 部门
            setTeamInfo(){
                let params = {
                    ...this.editData
                };
                Api.get("admin/department/add",params).then((e) => {
                    if (e.status == 200 ){
                        this.$Message.success('设置成功!');
                        this.getTeamList();
                    }else{
                        this.$Message.error('设置失败!');
                    }
                });
            }
        },
        mounted(){
            this.getTeamList();
        }
    }
</script>

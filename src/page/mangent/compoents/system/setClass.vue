<style scoped>

</style>

<template>
    <div>
        <Form ref="editData" :model="editData" :rules="ruleInline" inline>
            <Form-item prop="name">
                <Input type="text" v-model="editData.name" placeholder="新增类目">
                <Icon type="edit" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item>
                <Button type="success" @click="handleSubmit('editData')">新增</Button>
            </Form-item>
        </Form>
        <Table border :columns="columns" :data="data"></Table>
    </div>
</template>

<script>
    import moment from "moment";
    import Api from "../../../../api/index.js";
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
                        message: '请填写类目名称',
                        trigger: 'blur'
                    }]
                },
                 //table thead
                columns: [{
                        type: 'index',
                        align: 'center'
                    },
                    {
                        title: '类目名称',
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
                                        type: 'error',
                                        icon: 'trash-a',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.del(params.row)
                                        }
                                    }
                                }, '删除')
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
                this.editData.name = '';
                this.editData.id = 0;
            },
            set(params) {
                console.debug(params);
                this.editData.name = params.name;
                this.editData.id = params.id;
                this.$Message.info('点击了set！');
               
            },
            del(params){
                this.data.splice(params.index, 1);
                this.$Message.info('点击了del11！');
               
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.setClassInfo();
                        this.initEditData();
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            //设计类目
            getClassList(){
                Api.get("designs/getclasslist").then((e) => {
                    if (e.status == 200 ){
                        this.data = e.data;
                    }
                });
            },
            setClassInfo(){
                let params = {
                    ...this.editData
                }
                Api.post("admin/class/add",params).then((e) => {
                    if (e.status == 200 ){
                        this.$Message.success('设置成功!');
                        this.getClassList();
                    }
                });
            }
        },
        mounted(){
            this.getClassList();
        }
    }
</script>

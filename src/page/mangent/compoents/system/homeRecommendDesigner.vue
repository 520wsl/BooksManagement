<style scoped>

</style>
<template>
    <div>
        <Table border :columns="columns" :data="data"></Table>
        <Modal v-model="modal1" title="选择设计师" @on-ok="ok" @on-cancel="cancel">
            <Cascader :data="selectData" v-model="selectVaule"></Cascader>
        </Modal>
    </div>
</template>
<script>
    import moment from "moment";
    import Api from "../../../../api/index.js";
    export default {
        data() {
            return {
                modal1: false,
                //table thead
                columns: [{
                        title: '序号',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '设计师',
                        key: 'designerName',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('p', {}, params.row.departmentName + '--' + params.row.designerName),
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            let btnArr = [];
                            let set = h('Button', {
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
                            }, '设置');
                            let moveUp =
                                h('Button', {
                                    props: {
                                        type: 'ghost',
                                        icon: 'arrow-up-c',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.moveUp(params.index)
                                        }
                                    }
                                }, '上移');
                            let moveDown = h('Button', {
                                props: {
                                    type: 'ghost',
                                    icon: 'arrow-down-c',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.moveDown(params.index)
                                    }
                                }
                            }, '下移');
                            btnArr.push(set);
                            if (params.index != 0) {
                                btnArr.push(moveUp);
                            }
                            if (params.index != this.data.length - 1) {
                                btnArr.push(moveDown)
                            }
                            return h('div', btnArr);
                        }
                    }
                ],
                //table tbody
                data: [],
                selectVaule: ['jiangsu', 'nanjing', 'fuzimiao'],
                selectData: [{
                    value: 'beijing',
                    label: '北京',
                    children: [{
                            value: 'gugong',
                            label: '故宫'
                        },
                        {
                            value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        }
                    ]
                }, {
                    value: 'jiangsu',
                    label: '江苏',
                    children: [{
                            value: 'nanjing',
                            label: '南京',
                            children: [{
                                value: 'fuzimiao',
                                label: '夫子庙',
                            }]
                        },
                        {
                            value: 'suzhou',
                            label: '苏州',
                            children: [{
                                    value: 'zhuozhengyuan',
                                    label: '拙政园',
                                },
                                {
                                    value: 'shizilin',
                                    label: '狮子林',
                                }
                            ]
                        }
                    ],
                }]
            }
        },
        methods: {
            set(params) {
                this.$Message.info('点击了set！');
                this.modal1 = true;
            },
            //设置设计师排序
            setConfig() {
                Api.post("admin/designer/recommend/add", {
                    list: JSON.stringify(this.data)
                }).then((e) => {
                    if (e.status == 200) {
                    } else {
                        this.getDesignerConfig();
                    }
                })
            },
            //获得推荐设计师列表
            getDesignerConfig() {
                Api.get("admin/designer/recommend").then((e) => {
                    if (e.status == 200) {
                        this.data = e.data;
                    }
                });
            },
            //上移
            moveUp(index) {
                let arr = ["departmentName", "designerName", "userId"];
                for (let i in arr) {
                    let warp = this.data[index - 1][arr[i]];
                    this.data[index - 1][arr[i]] = this.data[index][arr[i]];
                    this.data[index][arr[i]] = warp;
                }
                this.setConfig();
            },
            //下移
            moveDown(index) {
                let arr = ["departmentName", "designerName", "userId"];
                for (let i in arr) {
                    let warp = this.data[index + 1][arr[i]];
                    this.data[index + 1][arr[i]] = this.data[index][arr[i]];
                    this.data[index][arr[i]] = warp;
                }
                this.setConfig();
            },
            ok() {
                this.$Message.info('点击了确定');
            },
            cancel() {
                this.$Message.info('点击了取消');
            },
        },
            mounted() {
                this.getDesignerConfig();
            }
    }
</script>
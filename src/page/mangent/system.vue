<style scoped>
    .hr {
        height: 2px;
        border: none;
        border-top: 2px solid #000;
    }
</style>

<template>
    <div>
        <h1>系统配置</h1>
        <hr class="hr">
        <br>
        <Tabs type="card">
            <Tab-pane label="首页推荐设计师配置">
                <HRD />
            </Tab-pane>
            <Tab-pane label="门派配置">
                <ST />
            </Tab-pane>
            <Tab-pane label="类目配置">
                <SC />
            </Tab-pane>
        </Tabs>
    </div>
</template>

<script>
    import HRD from "./compoents/system/homeRecommendDesigner.vue";
    import ST from "./compoents/system/setTeam.vue";
    import SC from "./compoents/system/setClass.vue";
    import moment from "moment";
    export default {
        data() {
            return {}
        },
        components: {
            HRD,
            ST,
            SC
        }
    }
</script>

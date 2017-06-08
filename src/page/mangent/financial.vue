<style scoped>
    .hr {
        height: 2px;
        border: none;
        border-top: 2px solid #000;
    }
</style>

<template>
    <div>
        <h1>财务管理</h1>
        <hr class="hr">
        <br>
        <Tabs type="card">
            <Tab-pane label="充值记录">
                <RL />
            </Tab-pane>
            <Tab-pane label="雇主账户扣减">
                <AL />
            </Tab-pane>
        </Tabs>
    </div>
</template>

<script>
    import RL from "./compoents/financial/rechargeLog.vue";
    import AL from "./compoents/financial/actionLog.vue";
    import moment from "moment";
    export default {
        data() {
            return {}
        },
        components: {
            RL,
            AL
        }
    }
</script>

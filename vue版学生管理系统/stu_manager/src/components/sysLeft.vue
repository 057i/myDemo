<template>
    <div class="left-content">
        <dl class="left-menu">
            <dt>学生管理</dt>
<!--            router做左侧导航跳转-->
            <router-link tag="dd" to="/stuList" class="active" data-id="student-list" id="stuList">学生列表</router-link>
            <router-link tag="dd" to="/addStu" class="active" data-id="student-list" id="totalList">新增学生</router-link>
        </dl>
    </div>
</template>

<script>
    export default {
    }
</script>

<style scoped>

</style>
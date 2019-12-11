<template>
    <table>
        <thead>
        <tr>
            <th>学号</th>
            <th>姓名</th>
            <th>性别</th>
            <th>邮箱</th>
            <th>年龄</th>
            <th>手机号</th>
            <th>住址</th>
            <th>操作</th>
        </tr>
        </thead>
        <tbody id="stu_list">
            <tr id = "list0"
                v-for="item in list">
                <td>{{item.sNo}}</td>
                <td>{{item.name}}</td>
                <td>{{item.sex==0? '男':'女'}}</td>
                <td>{{item.email}}</td>
                <td>{{item.birth}}</td>
                <td>{{item.phone}}</td>
                <td>{{item.address}}</td>
                <td>
                    <button class="btn edit" @click="editHandle(item)">编辑</button>
                    <button class="btn del" @click="delHandle(item)">删除</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import { mapState,mapMutations } from 'vuex'
    export default {
        name: "listTable",
        //初始化页面时候调用渲染当前页面全部数据
        created() {
            this.$store.dispatch('getStudent',1)
        },
        methods:{
            //页面触发修改学生事件，然后核心功能放在store里面
            editHandle(item){
                this.changeShowModal(true);
                this.seteditStu(item)

            },
            delHandle(item){
                let flag=window.confirm('真的要删除学生:'+item.name+'吗');
                if(flag){
                    this.$store.dispatch('delStudent',item.sNo).finally(_=>{
                        let leaveFlag=window.confirm('删除成功，跳转吗？');
                        if(leaveFlag){
                            this.$store.dispatch('getStudent',this.$store.nowPage)
                        }
                    })
                }
            },
            ...mapMutations(['changeShowModal','seteditStu'])

        },
        computed:{
          ...mapState(['list'])
        }
    }
</script>

<style scoped>

</style>
<template>
    <div class="add-student" id="add-student">
        <form action="" class="stu-form addform">
            <div>
                <label for="name" name="name">姓名</label>
                <input type="text"
                       id="name"
                       v-model="user.name">
            </div>
            <div>
                <label for="">性别</label>
                <label for="male" class="radio-label">男</label>
                <input type="radio" id="male" name="sex" value="0" checked v-model="user.sex">
                <label for="female" class="radio-label">女</label>
                <input type="radio" id="female" name="sex" value="1" v-model="user.sex">
            </div>
            <div>
                <label for="sNo">学号</label>
                <input type="text"
                       id="sNo"
                       name="sNo"
                       v-model="user.sNo">
            </div>
            <div>
                <label for="email">邮箱</label>
                <input type="text"
                       id="email"
                       name="email"
                       v-model="user.email">
            </div>
            <div>
                <label for="birth">出生年</label>
                <input type="text"
                       id="birth"
                       name="birth"
                       v-model="user.birth">
            </div>
            <div>
                <label for="phone">手机号</label>
                <input type="text"
                       id="phone"
                       name="phone"
                       v-model="user.phone">
            </div>
            <div>
                <label for="address">住址</label>
                <input type="text"
                       id="address"
                       name="address"
                       v-model="user.address">
            </div>
            <div>
                <button type="button"
                        class="submitBtn"
                        @click="submitHandle">提交
                </button>
                <button type="button"
                        class="resetBtn"
                        @click="resetHandle">重置
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import addStu from '@/api/index'

    export default {
        data() {
            return {
                user: {
                    name: '',
                    sex: 0,
                    age: '',
                    sNo: '',
                    email: '',
                    phone: '',
                    birth: ''
                }
            }
        },
        methods: {
            submitHandle() {
                this.$api.addStu(this.user).then(res => {
                    if (res.data.status == 'success') {
                        // 增加学生成功的话
                        this.$store.dispatch('getStudent', 1)
                            .finally(_=>{
                                this.resetHandle()
                                let flag=window.confirm('添加成功，跳转吗？')
                                if(flag){
                                    this.$router.push('/stuList')
                                }
                        })

                    } else {
                        console.log(res.data.msg)
                    }
                })


            },
            resetHandle() {
                this.user={
                        name: '',
                        sex: 0,
                        age: '',
                        sNo: '',
                        email: '',
                        phone: '',
                        birth: ''
                }
            }

        }
    }
</script>

<style scoped>

</style>
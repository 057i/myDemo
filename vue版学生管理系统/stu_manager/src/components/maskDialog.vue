<template>
    <div class="dialog">
        <div class="mask" @click="hideMask"></div>
        <div class="dialogcontent">
            <h2>编辑信息</h2>
            <form action="" class="stu-form">
                <div>
                    <label for="name"
                           name="name">姓名</label>
                    <input type="text"
                           id="name"
                           autocomplete="off"
                           :value="editStu.name"
                           ref="name"
                           @input="changeValue('name',$event.target.value)">
                </div>
                <div>
                    <label for="sex">性别</label>
                    <input type="radio"
                           name="sex"
                           :checked="editStu.sex==0"
                           ref="sex"
                           @input="changeValue('sex',0)"/>
                    <span>男</span>
                    <input type="radio"
                           name="sex"
                           :checked="editStu.sex==1"
                           @input="changeValue('sex',1)"/>
                    <span>女</span>
                </div>

                <div>
                    <label for="sNo">学号</label>
                    <input type="text"
                           id="sNo"
                           name="sNo"
                           :value="editStu.sNo"
                           ref="sNo"
                           @input="changeValue('sNo',$event.target.value)"/>
                </div>
                <div>
                    <label for="email">邮箱</label>
                    <input type="text"
                           id="email"
                           name="email"
                           :value="editStu.email"
                           ref="email"
                           @input="changeValue('email',$event.target.value)"/>
                </div>
                <div>
                    <label for="birth">出生年</label>
                    <input type="text"
                           id="birth"
                           name="birth"
                           :value="editStu.birth"
                           ref="birth"
                           @input="changeValue('birth',$event.target.value)"/>
                </div>
                <div>
                    <label for="phone">手机号</label>
                    <input type="text"
                           id="phone"
                           name="phone"
                           :value="editStu.phone"
                           ref="phone"
                           @input="changeValue('phone',$event.target.value)"/>
                </div>
                <div>
                    <label for="address">住址</label>
                    <input type="text"
                           id="address"
                           name="address"
                           :value="editStu.address"
                           ref="address"
                           @input="changeValue('address',$event.target.value)"/>
                </div>
                <div>
                    <button class="btn editSubmitBtn"
                            type="button"
                            @click="submitHandle">提交
                    </button>
                    <button class="btn reseSubmittBtn"
                            type="button"
                            @click="resetHandle">重置
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        data() {
            return {
                user: {}//记录修改的内容
            }
        },

        methods: {
            //隐藏遮罩层
            hideMask() {
                this.$store.commit('changeShowModal', false)
            },
            //提交处于遮罩层中心的编辑按钮
            submitHandle() {
                //将存储在本地的和在store里面的要修改的学生信息合并，然后触发store里面的updateStuInfo事件
                //利用这个事件往服务器推
                let user = Object.assign({}, this.editStu, this.user)
                this.updataStuInfo(user)
                    .then(res => {
                        //修改成功后重新获取数据
                        this.$store.dispatch('getStudent', this.$store.nowPage)

                    }).catch(rej => {
                })
            },
            //重置
            resetHandle() {
                //重置时候，不是性别的设置成空
                for (let prop in this.$refs) {
                    if (prop != 'sex') {
                        this.user[prop] = this.$refs[prop].value = '';
                    }
                }
                //性别变成0
                this.$refs.sex.value = 0;
                this.$refs.sex.checked = true;//性别男单选按钮重置时候默认选中
            },
            //更改的对象单独存储
            changeValue(key, value) {
                this.user[key] = value;
            },
            ...mapActions(['updataStuInfo'])
        },
        computed: {
            ...mapState(['editStu'])
        }
    }
</script>

<style scoped>

</style>
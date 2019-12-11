<template>
    <ul id="turn-page" class="turnpage">
        <li class="prev-page" @click="turnPage(-2)">上一页</li>

        <!--            七页以内情况-->
        <template v-if="totalPage<=7">
            <li
                    v-for="i in totalPage"
                    :key="i"
                    :class="{'cur-page':i ==nowPage}"
                    @click="turnPage(i)">{{i}}
            </li>
        </template>
        <!--        大于7页情况-->
        <template v-if="totalPage>7">
            <template v-if="nowPage <=4 ">
                <li v-for="i in 6"
                    :key="i"
                    @click="turnPage(i)"
                    :class="{'cur-page':i==nowPage}">{{i}}
                </li>
            </template>
            <!--                //当前页即大于4且总页数大于7-->
            <template v-if="nowPage>4">
                <li @click="turnPage(1)">1</li>
                <span>...</span>
            </template>
            <!--                判断是不是在四页往后以及不在倒数的四页里面,不是的话渲染中间5页-->
            <template v-if="nowPage >4 && nowPage+4 <totalPage">
                <li v-for="i in 5"
                    :key="nowPage-3+i"
                    @click="turnPage(nowPage-3+i)"
                    :class="{'curPage':i==3}">{{nowPage-3+i}}
                </li>
            </template>

            <!--                //判断是不是在在四页之后-->
            <template v-if="nowPage+4 <= totalPage">
                <span>...</span>
                <li @click="turnPage(totalPage)">{{totalPage}}</li>
            </template>

            <template v-if="nowPage>totalPage-4">
                <li
                        v-for="i in 6"
                        :key=totalPage-6+i
                        @click="turnPage(totalPage-6+i)"
                        :class="{'cur-page':totalPage-6+i==nowPage}">
                    {{totalPage-6+i}}
                </li>
            </template>
        </template>
        <li class="next-page" @click="turnPage(-1)">下一页</li>

    </ul>

</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        name: "turnPageList",
        methods: {
            turnPage(n) {
                //上一页情况
                if (n == -2 && this.nowPage != 1) {
                    this.getStudent(this.nowPage - 1)
                } else if (n == -1 && this.nowPage != this.totalPage) {
                    //下一页情况
                    this.getStudent(this.nowPage + 1)
                } else if (n != -1 && n != -2) {
                    this.getStudent(n)
                }
                this.$toast(2000,'success','hello')
            },
            //当做获取学生列表然后传一个页码使用（异步）
            ...mapActions(['getStudent'])
        },
        computed: {
            //获取总页码和当前页码
            ...mapState(['totalPage', 'nowPage'])
        }
    }
</script>

<style scoped>

</style>


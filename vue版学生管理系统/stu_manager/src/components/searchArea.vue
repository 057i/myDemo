<template>
    <div class="searchBox">
        <label for="search-word">关键字搜索:</label>
        <input type="text" id="search-word" v-model="word">
        <input type="button" id="search-submit" value="搜索" @click="searchHandle">
    </div>
</template>

<script>
    import { mapMutations, mapActions } from 'vuex'

    export default {
        data(){
            return {
                word:''
            }
        },

        methods: {
            searchHandle() {
                this.$store.commit('changeKeyWord',this.word)
                this.getStudent(1)

            //         search:this.keyWord,
            //         page: this.nowPage,
            //         size:1
            //     }).then(res=>{
            //         console.log(res)
            //     })
            },
            ...mapMutations(['changeKeyWord']),
            ...mapActions(['getStudent'])
        },

    }
</script>

<style scoped>

</style>
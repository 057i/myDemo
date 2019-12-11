<template>
    <div class="student-list" id="student-list">
        <search-area/>
        <list-table/>
        <turn-page-list/>
        <transition>
            <mask-dialog v-if="showModal"/>
        </transition>
    </div>
</template>

<script>
    import listTable from '@/components/listTable.vue'
    import searchArea from '@/components/searchArea.vue'
    import turnPageList from '@/components/turnPageList.vue'
    import maskDialog from '@/components/maskDialog.vue'
    import { mapState } from 'vuex'
    export default {
       components:{
           searchArea,
           listTable,
           turnPageList,
           maskDialog
       },
        computed:{
           ...mapState(['showModal'])
        }

    }
</script>

<style scoped>

</style>
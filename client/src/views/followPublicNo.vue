<template>
    <div class="page">

    </div>
</template>

<script>
    import Nav from '@/components/Nav.vue'
    import localstorage from '@/util/localstorage'

    export default {
        name: 'home',
        components: {
            Nav
        },
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        mounted(){
            location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAwNzEyMzQyOA==&scene=124#wechat_redirect';
        },
        methods: {

        }
    }
</script>
<style scoped>


</style>
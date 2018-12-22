<template>
    <div class="page">
        <!--<h1>主页</h1>-->
        <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->

        <Nav :activeIndex="4"></Nav>


        <div class="home-content">
            <img alt="Vue logo" src="../assets/logo.png">

        </div>
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
            let loginSessionId = localstorage.get("loginSessionId");
            console.log(loginSessionId);
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
<style scoped>
    .home-content {
        padding-top: 150px;
        text-align: center;
    }

</style>
<template>
    <div class="page">
        <!--<h1>小程序模板</h1>-->
        <Nav :activeIndex="3"></Nav>


       <div class="page-content">
           <el-row>
               <template v-for="item in tpl">
                   <div class="tplItem-wrap">
                       <div class="tplItem">
                           <img src="https://dummyimage.com/200x300&text=hello" alt="" class="tplItem-img">
                           <div class="tplItem-name">
                               {{'模板'+item}}
                               <el-button type="text" size="mini" class="fr">删除</el-button>
                           </div>
                           <div class="tplItem-handle">
                           </div>
                       </div>
                   </div>
               </template>
           </el-row>
       </div>


    </div>
</template>
<script>
    import Nav from '@/components/Nav.vue'
    export default {
        name: 'HelloWorld',
        components: {
            Nav
        },
        data(){
            return {
                tpl: [
                    1, 2, 3, 4, 5, 6
                ]
            }
        }
    }
</script>

<style scoped lang="scss">

    .tplItem-wrap {
        padding: 10px;
        width: 20%;
        float: left;

    }

    .tplItem {
        padding: 10px;
        /*border: 1px solid #ddd;*/
        border-radius: 5px;
        box-shadow: 3px 3px 3px #ddd;
    }

    .tplItem-img {
        width: 100%;
        min-height: 200px;
    }

    .tplItem-name {
       text-align: center;
    }
    .tplItem-handle {
        /*padding: 10px 0;*/
        text-align: right;
    }


</style>
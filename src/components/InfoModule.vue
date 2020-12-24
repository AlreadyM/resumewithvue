<template lang="">
    <div class="base-info module">
        <h3>基本信息</h3>
        <pre>
        <span class="tag">工作经验 {{ timegap }} 年 </span>
        <span class="tag"
            v-for="(item,key) in data" :key="key" > {{item}} </span>
        </pre>
    </div>
</template>
<script>
export default {
    name:'InfoModule',
    data(){
        return {

        }
    },
    props:[ 'data'],
    methods: {
        
    },
    computed:{
        timegap:function (){
            let now = new Date();
            let start = new Date('2012-08-18');
            let month = 11 - (start.getMonth()) + (now.getMonth());
            return now.getFullYear() - start.getFullYear() + (month > 11 ? 1 : 0);
        }
    }
}
</script>
<style lang="scss">
.module{
        font-size:18px;
        text-align:left;
        line-height:28px;
        text-align:justify;
        .module-title{
            font-size:24px;
            margin:20px 0;
            h4{
            }
        }
        

    }
    pre{
        
    }
    .tag{
        position:relative;
        font-size:18px;
        padding: 0 18px;
        white-space:nowrap;
        &::before{
            content:'';
            display: block;
            width: 2px;
            height: 18px;
            position: absolute;
            top: 5px;left: 0;
            border-left: 2px solid #828282;
        }
    }
    
</style>
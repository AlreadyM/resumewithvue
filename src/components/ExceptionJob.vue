<template lang="">
    <div class="exceptionJob module">
        <h3 class="module-title">
            期望职位
        </h3>
        <div class="modult-content">
            <pre><span class="tag"
             v-for="(item, name) in job" :key="name"> {{ item }} </span></pre>
        </div>
    </div>
</template>
<script>
export default {
    name:'ExceptionJob',
    data(){
        return{
            job:[
                "Web",
                "前端薪资：12 - 15 k",
                "行业不限",
                "城市 成都",
            ]
        }
    }
}
</script>
<style lang="scss">
    
</style>
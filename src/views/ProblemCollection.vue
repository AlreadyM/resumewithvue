<template lang="">
    <div class="problemcollection ">
        <h3 class="">
            Vue 遇到的问题整理
        </h3>
        <div class="modult-content">
            <pre style="white-space: pre-wrap;
        word-wrap: break-word;font-size:18px;text-align:left;"><h5>gitpage 发布</h5>
        配置文件打包发布的路径规则，在根目录新建vue.config.js 内容为
        module.exports = {
            // 这里是配置上线读取当前目录，默认是根路径，如 /js, /css 等，具体根据项目来
            publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
        };
            注：有过react配置经验的需区别于 pakage.json 内的homepage 配置项
   </pre>
        </div>
    </div>
</template>
<script>
export default {
    name:'ProblemCollection'
}
</script>
<style lang="scss">
    
</style>
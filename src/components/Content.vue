<template lang="">
    <div class="content">
        <InfoModule v-bind:data ="baseinfo" />
        <Advantage />
        <ExceptionJob />
        <WorkExperience />
    </div>
</template>
<script>
import InfoModule from '@/components/InfoModule.vue'
import Advantage from '@/components/Advantage.vue'
import ExceptionJob from '@/components/ExceptionJob.vue'
import WorkExperience from '@/components/WorkExperience.vue'

export default {
    name:'Content',
    data:function(){
       return  {
            baseinfo:{
                name: "雷春华",
                // birthday: "1990-01-06",
                sex: "man",
                education_background: "大专",
                // education_endtime: "20120701",
                work_start_date: '2012-08-18',
                current_status: "离职-随时到岗",
                contact_number: "17896057893",
                email: "617054896@qq.com",
            }
        }
    },
    components:{
        InfoModule,Advantage,ExceptionJob,WorkExperience,
    }
}
</script>
<style lang="">
    
</style>
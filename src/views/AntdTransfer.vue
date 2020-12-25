<template lang="">
    <div class="antd-transfer">
        <a-transfer
      :data-source="mockData"
      :target-keys="targetKeys"
      :selected-keys="selectedKeys"
      :render="item => item.title"
      :disabled="disabled"
      @change="handleChange"
      @selectChange="handleSelectChange"
      @scroll="handleScroll"
      :list-style="{
          width:'calc(50% - 30px)'
      }"
    />
   
    </div>
</template>
<script>
    export default {
        name:'AntdTransfer',
    data() {
        const mockData = [];
        for (let i = 0; i < 20; i++) {
        mockData.push({
            key: i.toString(),
            title: `选项内容${i + 1}`,
            description: `description of content${i + 1}`,
            // disabled: i % 3 < 1,
        });
        }

        const oriTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);
        return {
        mockData,
        targetKeys: oriTargetKeys,
        selectedKeys: ['1', '4'],
        disabled: false,
        };
    },
    methods: {
        handleChange(nextTargetKeys, direction, moveKeys) {
        this.targetKeys = nextTargetKeys;

        console.log('targetKeys: ', nextTargetKeys);
        console.log('direction: ', direction);
        console.log('moveKeys: ', moveKeys);
        },
        handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
        this.selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys];

        console.log('sourceSelectedKeys: ', sourceSelectedKeys);
        console.log('targetSelectedKeys: ', targetSelectedKeys);
        },
        handleScroll(direction, e) {
        console.log('direction:', direction);
        console.log('target:', e.target);
        },
        handleDisable(disabled) {
        this.disabled = disabled;
        },
    },
    };
</script>
<style lang="scss">
    
</style>


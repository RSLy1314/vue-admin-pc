<template>
    <div class="tree">
        <div v-for="(item, index) in treeData" :key="index">
            <p class="parent-node">
                <span v-if="!item.children || !item.children.length">
                    <span class="outer" v-if="!item.last">
                        <span class="inner"></span>
                    </span>
                    <span class="outer-sub" v-if="item.last">
                        <span class="inner-sub"></span>
                    </span>
                </span>
                <span v-if="item.children && item.children" @click="changeStatus(item)">
                    <i class="arrow el-icon-caret-top" v-if="item.expand"></i>
                    <i class="arrow el-icon-caret-bottom" v-else></i>
                </span>
                <span v-else>
                    <i style="display: inline-block;height:14px; width:14px"></i>
                </span>
                <span class="select-box" @click="changeSelect(item,index)">
                    <img src="./images/select-false.png" class="select-icon" v-if="!item.selected">
                    <img src="./images/select-true.png" class="select-box" v-else>
                </span>
                <span>
                    <img src="./images/filedir.png" v-if="item.children && item.children">
                    <img src="./images/file.png" v-else>
                </span>
                <span>{{item.name}}</span>
            </p>
            <y-tree
                class="sub-content"
                v-if="item.children && item.children && item.expand"
                :class="canceBor(item)"
                :treeData='item.children'
                :level='level+1'
                @nodeClick='nodeClick'
                @changeParent="changeParent"
            >
            </y-tree>
        </div>
    </div>
</template>

<script>
export default {
    name: 'yTree',
    data() {
        return {

        };
    },
    props: {
        treeData: {
            type: Array,
            default: () => ([])
        },
        level: {
            type: Number,
            default: 0
        }
    },
    methods: {
        canceBor(item) {
            if (!item.last) {
                return 'add-border';
            }
        },
        changeStatus(item) {
            item.expand = !item.expand;
        },
        nodeClick(item) {
            this.$emit('nodeClick', item);
        },
        changeSelect(item, index) {
            item.selected = !item.selected;
            if (item.selected) {
                if (item.children && item.children.length) {
                    this.transfromArr(item.children, true);
                }
            } else {
                if (item.children && item.children.length) {
                    this.transfromArr(item.children, false);
                }
            }
            this.$emit('changeParent', item, index, item.selected);
            this.$emit('nodeClick', item);
        },
        changeParent(v, index, flag) {
            for (let i = 0; i < this.treeData.length; i++) {
                let element = this.treeData[i];
                if (element.id === v.parentId) {
                    if (flag) {
                        if (element.children.every(item => item.selected === flag)) {
                            element.selected = flag;
                            this.$emit('changeParent', element, i, flag);
                        }
                    } else {
                        if (element.children.some(item => item.selected === flag)) {
                            element.selected = flag;
                            this.$emit('changeParent', element, i, flag);
                        }
                    }
                }
            }
        },
        transfromArr(arr, flag) {
            arr.forEach(element => {
                element.selected = flag;
                if (element.children && element.children.length) {
                    this.transfromArr(element.children, flag);
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
    .arrow {
        cursor: pointer;
    }
    .select-box {
        display: inline-block;
        .arrow;
    }
    .tree {
        .parent-node {
            position: relative;
            vertical-align: middle;
            height: 20px;
            img {
                display: inline-block;
                vertical-align: middle;
                width: 16px;
                height: 15px;
            }
            .outer {
                position: absolute;
                left: 7px;
                display: inline-block;
                width: 14px;
                height: 20px;
                box-sizing: border-box;
                border-left: 1px dashed #ccc;
                .inner {
                    display: inline-block;
                    width: 10px;
                    height: 0;
                    box-sizing: border-box;
                    border-bottom: 1px dashed #ccc;
                    position: relative;
                    top: -3px;
                }
            }
            .outer-sub {
                position: absolute;
                left: 7px;
                display: inline-block;
                width: 14px;
                height: 10px;
                box-sizing: border-box;
                border-left: 1px dashed #ccc;
                .inner-sub {
                    display: inline-block;
                    width: 10px;
                    height: 0;
                    box-sizing: border-box;
                    border-bottom: 1px dashed #ccc;
                    position: relative;
                    top: -3px;
                }
            }
        }
        .sub-content {
            padding-left: 10px;
            margin-left: 7px;
        }
    }
    .add-border {
        border-left: 1px dashed #ccc;
    }
</style>

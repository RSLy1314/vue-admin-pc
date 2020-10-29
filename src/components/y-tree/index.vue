<template>
    <div>
        <y-tree
            :tree-data='treeData'
            :level=0
            @nodeClick='nodeClick'
        >
        </y-tree>
    </div>
</template>

<script>
import { addOption } from './utils/index.js';
import yTree from './tree.vue';
export default {
    name: 'y-tree-container',
    data() {
        return {
            treeData: [
                {
                    id: '1',
                    name: '一级1',
                    children: [
                        {
                            id: '1-1',
                            name: '一级1-1'
                        },
                        {
                            id: '1-2',
                            name: '一级1-2',
                            children: [
                                {
                                    id: '1-2-1',
                                    name: '一级1-2-1',
                                    children: [
                                        {
                                            id: '1-2-1-1',
                                            name: '一级1-2-1-1',
                                            children: [
                                                {
                                                    id: '1-2-1-1-1',
                                                    name: '一级1-2-1-1-1'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: '1-3',
                            name: '一级1-3'
                        }
                    ]
                },
                {
                    id: '2',
                    name: '二级2',
                    children: [
                        {
                            id: '2-1',
                            name: '二级2-1'
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        nodeClick(v) {
            console.log(v);
        }
    },
    created() {
        this.treeData = addOption(this.treeData, this, [], 0);
        console.log(this.treeData);
    },
    components: {
        yTree
    }
};
</script>

<style>

</style>

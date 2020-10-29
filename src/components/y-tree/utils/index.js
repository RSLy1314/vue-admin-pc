export  const addOption = (arr, vm, list = [], level) => {
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        let parentId = element.id;
        element.level = level;
        vm.$set(arr[i], 'selected', false);
        vm.$set(arr[i], 'last',  false);
        if (i === arr.length - 1) {
            vm.$set(arr[i], 'last', true);
        }
        if (element.children && element.children.length) {
            vm.$set(element, 'expand', true);
            element.children.forEach((ele, i) => {
                vm.$set(ele, 'parentId', parentId);
            });
            addOption(element.children, vm, list, level + 1);
        }
    }
    return arr;
};

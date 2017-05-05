export default class Heap {
    constructor() {
        this.heap = [];
        this.inlist = [];
        this.outlist = [];
        this.pushtimes = 0;
        this.poptimes = 0;
        this.length = 0;
        this.isMaxHeap = true;
        this.keys = []; //魔改key
        this.keyIndex = 1; //魔改key
    }

    isLeaf(position) {
        return (position > Math.floor(this.length / 2) - 1) && (position < this.length);
    }

    getLength() {
        return this.length;
    }

    leftChild(position) {
        return 2 * position + 1;
    }

    rightChild(position) {
        return 2 * position + 2;
    }

    parent(position) {
        return Math.floor((position - 1) / 2);
    }

    swap(index1, index2) {
        var temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;

        var temp2 = this.keys[index1]; //魔改key
        this.keys[index1] = this.keys[index2]; //魔改key
        this.keys[index2] = temp2;  //魔改key
    }

    compareAccordingToHeapType(num1, num2) {
        if (this.isMaxHeap) {
            if (num1 > num2)
                return true;
            return false;
        } else {
            if (num1 < num2)
                return true;
            return false;
        }
    }

    siftdown(position) {
        while (!this.isLeaf(position)) {
            var require = this.leftChild(position);
            var rc = this.rightChild(position);
            if ((rc < this.length) && (this.compareAccordingToHeapType(this.heap[rc], this.heap[require])))
                require = rc;
            if (this.compareAccordingToHeapType(this.heap[position], this.heap[require]))
                return;
            this.swap(position, require);
            position = require;
        }
    }

    getHeapType() {
        if (this.isMaxHeap)
            return "MaxHeap";
        return "MinHeap";
    }

    buildHeap() {
        for (var i = Math.floor(this.length / 2) - 1; i > -1; i--)
            this.siftdown(i);
    }

    buildHeapWithArray(array) {
        for (var i = 0; i < array.length; i++) {
            this.inlist[this.pushtimes++] = array[i];
            this.heap[i] = array[i];
            this.keys[i] = this.keyIndex++; // 魔改key
        }
        this.length = array.length;
        this.buildHeap();
    }

    append(elem) {
        this.inlist[this.pushtimes++] = elem;
        var current = this.length++;
        this.heap[current] = elem;
        this.keys[current] = this.keyIndex++; // 魔改key
        while ((current !== 0) && (this.compareAccordingToHeapType(this.heap[current], this.heap[this.parent(current)]))) {
            this.swap(current, this.parent(current));
            current = this.parent(current);
        }
    }

    insert(position, elem) {
        if ((position > this.length) || (position < 0)) {
            console.log("位置超出范围");
            return;
        }
        this.inlist[this.pushtimes++] = elem;
        /* 该方法暂时不用*/
        for (var i = this.length; i > position; i--)
            this.heap[i] = this.heap[i - 1];
        this.heap[position] = elem;
        this.length++;

        this.keys[position] = this.keyIndex++; // 魔改key
        this.buildHeap();
    }

    removeTop() {
        if (!this.length) {
            console.log("位置超出范围");
            return false;
        }
        this.outlist[this.poptimes++] = this.heap[0];
        this.swap(0, --this.length);
        if (this.length)
            this.siftdown(0);
        return this.heap[this.length];
    }

    delete(position) {
        if ((position < 0) && (position > this.length - 1)) {
            console.log("位置超出范围");
            return false;
        }

        this.outlist[this.poptimes++] = this.heap[position]
        this.swap(position, --this.length);
        if (position === this.length)
            return Heap[this.length];
        while ((position !== 0) && (this.compareAccordingToHeapType(position, this.parent(position)))) {
            this.swap(position, this.parent(position));
            position = this.parent(position);
        }
        if (this.length) {
            this.siftdown(position);
        }
        return Heap[this.length];
    }

    toggleMaxOrMinHeap() {
        if (this.isMaxHeap)
            this.isMaxHeap = false;
        else
            this.isMaxHeap = true;
        this.buildHeap();
    }

    getRandomInteger(max, min) {
        return Math.round(Math.random() * (max - min) + min);
    }

    generateHeap(length) {
        var array = [];
        for (var i = 0; i < length; i++)
            array[i] = this.getRandomInteger(9, 0);
        this.buildHeapWithArray(array);
        console.log("随机生成的堆：")
        this.print();
    }
    print() {
        var result = "[";
        for (var i = 0; i < this.length - 1; i++)
            result += this.heap[i] + ",";
        result += this.heap[this.length - 1] + "]";
        console.log(result);
    }

    printinlist() {
        var result = "[";
        if (this.pushtimes === 0) return '[null]';
        for (var i = 0; i < this.pushtimes - 1; ++i) {
            result += this.inlist[i] + ',';
        }
        result += this.inlist[this.pushtimes - 1] + ']';
        return result;
    }

    printoutlist() {
        var result = "[";
        if (this.poptimes === 0) return '[null]';
        for (var i = 0; i < this.poptimes - 1; ++i) {
            result += this.outlist[i] + ',';
        }
        result += this.outlist[this.poptimes - 1] + ']';
        return result;
    }
    // ----------因需要而增添的功能-------------------

    // 获取位置为i的元素的值
    get(i) {
        return this.heap[i];
    }

    // 获取位置为i的元素的Key
    getKey(i) {
        if (i < this.length) {
            return this.keys[i];
        } else {
            return i - 1000;
        }

    }

    // 与delete同功能的remove函数
    remove(position) {
        this.delete(position);
    }

    // 随机增添一个数
    randomAdd() {
        this.append(this.getRandomInteger(9, 0));
    }
}




// WEBPACK FOOTER //
// ./src/heap/Heap.js
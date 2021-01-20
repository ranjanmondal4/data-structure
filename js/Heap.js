class MaxHeap {
    constructor(){
        this.list = [];
        this.length = 0
    }

    isEmpty(){
        return this.length == 0;
    }

    insert(val){
        this.list[++this.length] = val;

        this.restoreUp();
        return true;
    }

    restoreUp(){
        let child = this.length;
        let val = this.list[child];
        let parent = Math.floor(child/2);
        while(parent >= 1 && this.list[parent] < val){
            this.list[child] = this.list[parent];
            child = parent;
            parent = Math.floor(child/2);
        }
        this.list[child] = val;
    }

    remove(){
        if(this.isEmpty())
            throw new Error(`Can't remove, Heap is empty`);

        let deleted = this.list[1];
        this.list[1] = this.list[this.length--];

        this.restoreDown();
        return deleted;
    }

    restoreDown(){
        if(this.isEmpty())
            return;

        let parent = 1;
        let left = parent*2;
        let right = left + 1;

        let maxChild;
        while(right <= this.length){
           maxChild = this.list[left] < this.list[right] ? right : left;
           if(this.list[parent] < this.list[maxChild]){
               [this.list[parent], this.list[maxChild]]
                    = [this.list[maxChild], this.list[parent]];
           }else {
               break
           }
           parent = maxChild;
           left = parent*2;
           right = left + 1;
        }

        if(left <= this.length && this.list[parent] < this.list[left]){
            [this.list[parent], this.list[left]]
                    = [this.list[left], this.list[parent]];
        }

    }

}

let heap = new MaxHeap();
heap.insert(50);
heap.insert(70);
heap.insert(80);
heap.insert(40);

// heap.remove();
/*
array
insert    O(log n)
restoreUp
remove
restoreDown
 
[1,2,3,4,5]

        1
     2     3
 4     5


*/

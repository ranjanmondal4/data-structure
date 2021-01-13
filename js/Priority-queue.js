class Node {
    constructor(val){
        this.val = val;
        this.next = undefined;
    }

    getVal(){
        return this.val;
    }
}

class PriorityQueue {
    constructor(){
        this.front = this.rear = undefined;
    }


    isEmpty(){
        return !this.front;
    }

    enqueue(priority){
        if(this.isEmpty()){
            this.front = this.rear = new Node(priority);
            return true;
        }

        let node = new Node(priority);
        let temp = this.front, previous = undefined;
        while(temp){
            if(temp.val < priority){
                break;
            }
            previous = temp;
            temp = temp.next;
        }

        if(!previous){
            node.next = this.front;
            this.front = node;
            return true;
        }

        node.next = previous.next;
        previous.next = node;
        if(!temp)
            this.rear = node;
        return true;
    }

    traversal(){
        if(this.isEmpty())
            return '[]';
        let node = this.front;
        let str = '[';
        while(node){
            str = str + node.val + ' -> ';
            node = node.next;
        }
        return str.substring(0, str.lastIndexOf(' -> ')) + ']';
    }

    dequeue(){
        if(this.isEmpty())
            throw new Error(`The queue is empty`);
        
        let node = this.front;
        this.front = this.front.next;
        if(!this.front)
            this.rear = undefined;
        node.next = undefined;
        return node;
    }
}

// let priorityQueue = new PriorityQueue();
// priorityQueue.enqueue(40);
// priorityQueue.enqueue(20);
// // priorityQueue.enqueue(50);
// // priorityQueue.enqueue(30);
// // priorityQueue.enqueue(10);
// priorityQueue.traversal();

class ArrayQueue {
    constructor(size){
        this.queue = [];
//         this.queue.length = size;
        this.length = size;
        this.front = this.rear = -1;
    }

    isEmpty(){
        return this.front == -1;
    }

    enqueue(val){
        if(this.isEmpty()){
            this.queue[++this.front] = val;
            this.rear++;
            return true;
        }

        if(this.rear+1 >= this.length){
//             throw new Error(`Can't enqueue, size is full`);
            if(this.front === 0)
                throw new Error(`Can't enqueue, size is full`);

            let displacement = this.front - 0;
            for(let i=this.front; i<=this.rear; i++){
                this.queue[i-displacement] = this.queue[i];
            }
            this.front = 0, this.rear -= displacement;
        }

        this.queue[++this.rear] = val;
        return true;
    }

    dequeue(){
        if(this.isEmpty())
            throw new Error(`Can't dequeue, Queue is empty`);

        if(this.front === this.rear){
            let val = this.queue[this.front];
            this.front = this.rear = -1;
            return val;
        }

        return this.queue[this.front++];
    }

    traversal(){
        if(this.isEmpty())
            return '[]';

        let str = '[';
        for(let i=this.front; i<=this.rear; i++){
            str = str + this.queue[i] + ' -> ';        }
        return str.substring(0, str.lastIndexOf(' -> ')) + ']';
    }
}

let queue = new ArrayQueue(5);
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
queue.enqueue(40);
queue.traversal();
/* 
   [null,null,3,4,5]
*/

class Node {
    constructor(val){
        this.val = val;
        this.next = undefined;
    }

    getVal(){
        return this.val;
    }
}

class Stack {
    constructor(){
        this.top = undefined;
    }

    push(val){
        let node = new Node(val);
        node.next = this.top;
        this.top = node;
        return true;
    }

    pop(){
        if(this.isEmpty())
            throw new Error(`The stack is empty`);
        let node = this.top;
        this.top = this.top.next;
        node.next = undefined;
        return node.val;
    }

    isEmpty(){
        return !this.top;
    }

    peek(){
        if(this.isEmpty())
            throw new Error(`The stack is empty`);
        return this.top.val;
    }

    traversal(){
        if(this.isEmpty())
            return '[]';
        let node = this.top;
        let str = '[';
        while(node){
            str = str + node.val + ' -> ';
            node = node.next;
        }
        return str.substring(0, str.lastIndexOf(' -> ')) + ']';
    }

    clear(){
        let temp = this.top;
        let node;
        while(temp){
            node = temp;
            temp = temp.next;
            node.next = undefined;
        }
        this.top = undefined;
        return true;
    }

    getMin(){
        if(this.isEmpty())
            throw new Error(`Can't find min value, Stack is empty`);
            
        return (function inner(node, min){
            if(!node)
                return min;
            if(min > node.val)
                return inner(node.next, node.val);
            else
                return inner(node.next, min);
        })(this.top.next, this.top.val);
    }

}

// let stack = new Stack();
// stack.push(10);
// stack.push(20);
// stack.push(30);
// stack.traversal();

class PrimeFactorization {
    constructor(){
        this.stack = new Stack();
    }

    getPrimeFactor(num){
       let n = num;
       let prime = 2;
       while(n>1){
          if(n % prime === 0){
              this.stack.push(prime);
              n /= prime;
          }else {
              prime++;
          }
       }

       let str = num + ' = ';
       while(!this.stack.isEmpty()){
           str = str + this.stack.pop() + ' * ';
       }
       return str.substring(0, str.lastIndexOf(' * '));
    }
}

let prime = new PrimeFactorization();

class ExpressionChecker {
    constructor(){
        this.stack = new Stack();
        this.opening = ['(', '{', '['];
        this.closing = [')', '}', ']'];
    }

    getClosing(opening){
        switch(opening){
            case '(': return ')';
            case '{': return '}';
            case '[': return ']';
            default: return '';
        }
    }

    isOpening(symbol){
        return this.opening.includes(symbol);
    }

    isClosing(symbol){
        return this.closing.includes(symbol);
    }

    isExpressionValid(expression){
        this.stack.clear();

        for(let c of expression){
            if(this.isOpening(c)){
                this.stack.push(c);
            }else if(this.isClosing(c)){
                if(this.stack.isEmpty())
                    return false;
                let closing = this.getClosing(this.stack.pop());
                if(closing !== c)
                    return false;
            }
        }

        return this.stack.isEmpty();
    }
}

// let checker = new ExpressionChecker();

class ReverseStackArray {
    constructor(size){
        this.length = size;
        this.stack = [];
        this.top = size;
    }

    isEmpty(){
        return this.top == this.length;
    }

    isFull(){
        return this.top == 0;
    }

    push(val){
        if(this.isFull())
            throw new Error(`Can't push, The stack is full`);
        
        this.stack[--this.top] = val;
        return true;
    }

    pop(){
        if(this.isEmpty())
            throw new Error(`Can't pop, The stack is empty`);

        return this.stack[this.top++];
    }

    traversal(){
        if(this.isEmpty())
            return '[]';

        let str = '[';
        for(let i=this.top; i<this.length; i++){
            str = str + this.stack[i] + ' -> ';
        }
        return str.substring(0, str.lastIndexOf(' -> ')) + ']';
    }
}


class DualStackArray {
    constructor(size){
        this.length = size;
        this.stack = [];
        this.topA = -1;
        this.topB = size;
    }

    isEmpty(){
        return this.topA + 1 !== this.topB
    }

    isEmptyFromLeft(){
        return this.topA == -1;
    }

    isEmptyFromRight(){
        return this.topB == this.length;
    }

    pushFromLeft(val){
        if(!this.isEmpty())
            throw new Error(`Can't push, Stack is full`);

        this.stack[++this.topA] = val;
        return true;
    }

    pushFromRight(val){
        if(!this.isEmpty())
            throw new Error(`Can't push, Stack is full`);

        this.stack[--this.topB] = val;
        return true;
    }

    traversal(){
        let strA = '[';
        if(this.topA != -1){
            for(let i=0; i<=this.topA; i++){
            strA = strA + this.stack[i] + ' <- ';
            }
            strA = strA.substring(0, strA.lastIndexOf(' <- ')) + ']';    
        }else {
            strA += ']';
        }
        
        let strB = '[';
        if(this.topB != this.length){
            for(let i=this.topB; i<this.length; i++){
            strB = strB + this.stack[i] + ' -> ';
            }
            strB = strB.substring(0, strB.lastIndexOf(' -> ')) + ']';    
        }else {
            strB += ']';
        }
        
        return strA + ' | ' + strB;
    }

    popFromLeft(){
        if(this.isEmptyFromLeft())
            throw new Error(`Can't pop, Left Stack is Empty`);

        return this.stack[this.topA--];
    }

    popFromRight(){
        if(this.isEmptyFromRight())
            throw new Error(`Can't pop, Right Stack is Empty`);

        return this.stack[this.topB++];
    }

}

class StackArray {
    constructor(size){
        this.maxLength = size;
        this.stack = [];
        this.top = -1;
    }

    isEmpty(){
        return this.top == -1;
    }

    isFull(){
        return this.top == this.maxLength-1;
    }

    push(val){
        if(this.isFull())
            throw new Error(`Can't push, Stack is full`);
        this.stack[++this.top] = val;
        return true;
    }

    pop(){
        if(this.isEmpty())
            throw new Error(`Can't pop, Stack is empty`);
        return this.stack[this.top--];
    }
} 

class QueueUsingDualStack {
    constructor(size){
        this.inbox = new StackArray(size);
        this.outbox = new StackArray(size);
    }

    enqueue(val){
        if(this.inbox.isFull())
            throw new Error(`Can't enqueue, Queue is Full`);    
        return this.inbox.push(val);
    }

    dequeue(){
        if(!this.outbox.isEmpty())
            return this.outbox.pop();
        
        if(!this.inbox.isEmpty()){
            while(!this.inbox.isEmpty()){
                this.outbox.push(this.inbox.pop());
            }
            return this.outbox.pop();
        }

        throw new Error(`Can't dequeue, Queue is Empty`);
    }
}

class QueueArray {
    constructor(size){
        this.length = size;
        this.queue = [];
        this.front = this.rear = -1;
    }
    
    isEmpty(){
        return this.front == -1;
    }

    isFull(){
        return this.rear == this.length-1; 
    }

    enqueue(val){
        if(this.isFull())
            throw new Error(`Can't enqueue, Queue is full`);

        if(this.isEmpty()){
            this.queue[++this.rear] = val;
            this.front = 0;
            return true;
        }

        this.queue[++this.rear] = val;
        return true;
    }

    dequeue(){
        if(this.isEmpty())
            throw new Error(`Can't dequeue, Queue is empty`);

        let val = this.queue[this.front++];
        if(this.front > this.rear){
            this.front = this.rear = -1;
        }
        return val;
    }

    traversal(){
        if(this.isEmpty())
            return '[]';
        
        let str = '[';
        for(let i=this.front; i<=this.rear; i++){
            str = str + this.queue[i] + ' <- ';
        }
        return str.substring(0, str.lastIndexOf(' <- ')) + ']';
    }

    enqueueAsStack(val){
        if(this.isFull())
            throw new Error(`Can't enqueue, Queue is full`);

        if(this.isEmpty()){
            this.queue[++this.rear] = val;
            this.front = 0;
            return true;
        }

        this.queue[++this.rear] = val;

        let noOfPreviousElements = this.rear - this.front;
        for(let i=1; i<=noOfPreviousElements; i++){
            let dequeueVal = this.queue[this.front];
            for(let j=this.front+1; j<=this.rear; j++){
                this.queue[j-1] = this.queue[j];
            }
            this.queue[this.rear] = dequeueVal;
        }
        return true;
    }
}

// let queue = new QueueArray(5);

// for(let i of [1,2,3,4,5])
//    queue.enqueue(i);

class StackUsingSingleQueue {
    constructor(size){
        this.queue = new QueueArray(size);
    }

    isEmpty(){
        return this.queue.isEmpty();
    }

    isFull(){
        return this.queue.isFull();
    }

    push(val){
        return this.queue.enqueueAsStack(val);
    }

    pop(){
        return this.queue.dequeue();
    }
}

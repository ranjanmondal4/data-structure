class Node {
    constructor(val){
        this.val = val;
        this.left = this.right = undefined
        this.balance = 0;
    }
}

class Stack {

    constructor(){
        this.list = [];
        this.top = -1
    }

    isEmpty(){
        return this.top == -1;
    }

    push(node){
        if(!node) throw new Error(`Can't push, empty node`);

        this.list[++this.top] = node;
        return true;
    }

    pop(){
       if(this.isEmpty())
            throw new Error(`Can't pop, Empty stack`);
       return this.list[this.top--];
    }

    peek(){
        if(this.isEmpty())
            throw new Error(`Can't pop, Empty stack`);
       return this.list[this.top];
    }

    clear() {
       while(!this.isEmpty())
            this.pop();
    }
}

class AVL {
    constructor(){
        this.root = undefined;
    }

    isEmpty(){
        return !this.root;
    }

    addNode(val){
        let node = new Node(val);
        if(!this.root){
            this.root = node;
            return true;
        }

        let temp = this.root, parent = undefined;
        let stack = new Stack();
        while(temp){
            if(temp.val > val){
                parent = temp;
                temp = temp.left
            }else if(temp.val < val){
                parent = temp;
                temp = temp.right;
            }else {
                throw new Error(`Can't insert, val already present`);
            }
            stack.push(parent);
        }
        if(parent.val > val){
            parent.left = node;
        }else {
            parent.right = node;
        }
        //  code for checking balance factor and reshifting
        this.shiftingNodes(stack, node);        

        //
        return true;
    }

    shiftingNodes(stack, insertedNode){
        while(!stack.isEmpty()){
            let node = stack.pop();
            let balance = node.balance;
            this.setBalanceFactor(node);
            if(balance == 0 && (node.balance == 1 || node.balance == -1)){
                // we need to check parent, do nothing here
                console.log(`Check parent's balance`);
            }else if(balance != 0 && node.balance == 0){
                // clear the stack
                console.log(`Do nothing and return`);
                stack.clear();
                return;
            } else {
                console.log(`Need reshuffling`);
                let parent;
                try {
                      parent = stack.peek();
                }catch(err) {
                      parent = undefined;
                }
                if(node.balance == 2){ // right rotation
                    this.rightRotationAroundPivot(parent, node, node.left);
                }else { // left rotation
                    this.leftRotationAroundPivot(parent, node, node.right);
                }
                stack.push(node);
            }
        }
    }

    preorder(){
        if(this.isEmpty())
            return '[]';
        
        let stack = new Stack();
        stack.push(this.root);
        let text = '[';

        while(!stack.isEmpty()){
            let node = stack.pop();
            text += node.val + ' -> ';
            if(node.right)
                stack.push(node.right);
            if(node.left)
                stack.push(node.left);
        }

        return text.substring(0, text.lastIndexOf(' -> ')) + ']';
    }

    rightRotationAroundPivot(parent, pivot, child){
        pivot.left = child.right;
        child.right = pivot;
        if(parent){    
            if(parent.left == pivot)
                parent.left = child;
            else 
                parent.right = child;
        }else {
            this.root = child
        }

        return true;
    }

    leftRotationAroundPivot(parent, pivot, child){
        pivot.right = child.left;
        child.left = pivot;

        if(parent){
            if(parent.left == pivot)
                parent.left = child;
            else 
                parent.right = child
        }else{
            this.root = child;
        }

        return true;
    }

    findNodeByVal(val){
        if(this.isEmpty())
            throw new Error(`Can't find, Tree is empty`);
        
        let node = this.root;
        while(node){
            if(node.val == val){
                return node;
            }
            if(node.val > val)
                node = node.left;
            else 
                node = node.right
        }

        throw new Error(`Can't find, Node with val is not available`);
    }

    setBalanceFactor(node){
        if(!node)
            return 0;
        
        let left = this.setBalanceFactor(node.left);
        let right = this.setBalanceFactor(node.right);
        node.balance = left - right;
        if(left > right)
            return 1 + left;
        else
            return 1 + right;
    }
}

let avl = new AVL();
avl.addNode(72);
avl.addNode(56);
avl.addNode(80);
avl.addNode(48);
avl.addNode(62);
// avl.addNode(66);
// avl.addNode(82);
// avl.addNode(29);
// avl.addNode(45);
// avl.addNode(60);
// avl.addNode(89);
// avl.addNode(77);
// avl.preorder();
// let parent = avl.findNodeByVal(62);
// let pivot = avl.findNodeByVal(76);
// let child = avl.findNodeByVal(82);
// let result = avl.leftRotationAroundPivot(parent, pivot, child);
// console.log(`The result is ${result}`);
// avl.preorder();

// let node = avl.findNodeByVal(62);
// avl.getBalanceFactor(node);
class Node {
    constructor(val){
        this.val = val;
        this.left = this.right = undefined;
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
}

class Queue {
    constructor(){
        this.list = [];
        this.front = this.rear = -1;   
    }

    isEmpty(){
        return this.front == -1;
    }

    enqueue(node){
        if(this.isEmpty()){
            this.list[++this.rear] = node;
            this.front++;
            return true;
        }

        this.list[++this.rear] = node;
        return true;
    }

    dequeue(){
        if(this.isEmpty())
            throw new Error(`Can't dequeue, Queue is empty`);

        let node = this.list[this.front++];
        if(this.front > this.rear){
            this.front = this.rear = -1;
        }
        return node;
    }
}

class BST {
    constructor(){
        this.root = undefined;
    }

    isEmpty(){
        return !this.root;
    }

    addNode(val){
        let node = new Node(val);
        if(this.isEmpty()){
            this.root = node;
            return true;
        }

        let temp = this.root;
        let previous = undefined;

        while(temp){
            if(temp.val > val){
                previous = temp;
                temp = temp.left;
            }else if(temp.val < val){
                previous = temp;
                temp = temp.right;
            }else {
                throw new Error(`The value already exists in the tree`);
            }
        }

        if(previous.val > val)
            previous.left = node;
        else
            previous.right = node;
        
        return true;
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

    inorder(){
        if(this.isEmpty())
            return '[]';
        
        let stack = new Stack();
        let node = this.root;
        let text = '[';
        let stop = false;
        while(true){
            while(node.left)
                stack.push(node);
            
            while(!node.right){
                text += node.val + ' -> ';
                if(stack.isEmpty()){
//                     stop = true;
                    return text.substring(0, text.lastIndexOf(' -> ')) + ']';
                }
                node = stack.pop();
            }
            text += node.val + ' -> ';
            node = node.right;
        }
        
    }

    levelOrder(){
        if(this.isEmpty())
            return '[]';
         
        let queue = new Queue();
        queue.enqueue(this.root);
        let text = '[';
        while(!queue.isEmpty()){
            let node = queue.dequeue();
            text += node.val + ' -> ';

            if(node.left)
                queue.enqueue(node.left);
            if(node.right)
                queue.enqueue(node.right);
        }
        return text.substring(0, text.lastIndexOf(' -> ')) + ']';
    }

    getHeight(){
        return (function inner(node){
            if(!node)
                return 0;
            let left = inner(node.left);
            let right = inner(node.right);
            if(left < right)
                return 1 + right;
            else 
                return 1 + left;
        })(this.root);
    }

    searchIteratively(val){
        let node = this.root;
        while(node){
            if(node.val === val)
                return true;
            else if(node.val > val)
                node = node.left;
            else
                node = node.right;
        }
        return false;
    }

    searchRecursively(val){
        return (function inner(node){
           if(!node)
                return false;
           if(node.val === val)
                return true;
           else if(node.val > val)
                return inner(node.left);
           else 
                return inner(node.right); 
        })(this.root);
    }

    minByIteratively(){
        if(this.isEmpty())
            throw new Error(`Can't find min, Tree is empty`);
        
        let node = this.root;
        while(node.left){
            node = node.left;
        }
        return node.val;
    }

    minByRecursively(){
        if(this.isEmpty())
            throw new Error(`Can't find min, Tree is empty`);
        
        return (function inner(node){
           if(!node.left)
                return node.val;
           return inner(node.left);
        })(this.root);
    }

    maxByIteratively(){
        if(this.isEmpty())
            throw new Error(`Can't find max, Tree is empty`);
        
        let node = this.root;
        while(node.right){
            node = node.right;
        }
        return node.val;
    }

    addNodeRecursively(val){
        let node = new Node(val);
        let object = this;
        return (function inner(temp){
            // root initialization
            if(!temp){
                object.root = node;
                return true;
            }

            if(temp.val > val){
                if(temp.left)
                    return inner(temp.left);
                else {
                    temp.left = node;
                    return true;
                }
            }else if(temp.val < val) {
                if(temp.right)
                    return inner(temp.right);
                else {
                    temp.right = node;
                    return true;
                }
            } else {
                return false;
            }
        })(this.root);
    }

    deleteByValue(val){
        let node = this.root;
        let parent = undefined;
        while(node){
            if(node.val === val)
                break;
            if(node.val > val){
                parent = node;
                node = node.left;
            }else {
                parent = node;
                node = node.right;
            }
        }

       if(!node)
            throw new Error(`Can't delete, node not found`);
           
       if(node.left && node.right){
            // 2 children
          return this.deleteNodeWithTwoChildren(node);
       }else if(node.left || node.right){
            // 1 children
          return this.deleteNodeWithOneChild(parent, node);
       } else {
           // leaf node
          return this.deleteLeafNode(parent, node);
       }
    }

    deleteLeafNode(parent, node){
       if(!parent){
            this.root = undefined;
            return true;
       }
      
       if(parent.left === node)
            parent.left = undefined;
       else 
            parent.right = undefined;

       return true;
    }

    deleteNodeWithOneChild(parent, node){
        let child = node.left ? node.left : node.right;
        if(!parent){ // node to be deleted is root
            node.left = node.right = undefined;
            this.root = child;
            return true;
        } 

        if(parent.left == node){
            parent.left = child;
        }else {
            parent.right = child;
        }
        node.left = node.right = undefined;
        return true;
    }

    deleteNodeWithTwoChildren(node){
        let successor = this.getInorderSuccessorByNode(node);

        if(this.deleteByValue(successor.val)){
            node.val = successor.val;
            return true;
        }
        return false;
    }

    getInorderSuccessorByNode(node){
       if(!node.left)
            throw new Error(`Can't find inorder successor node`);
       let successor = node.left;
       while(successor.right){
           successor = successor.right;
       } 
       return successor;
    }


    /*
             10                          5
          5     15          ,,,              6
       2    7
    1    3
           4
    */
}

let tree = new BST();
tree.addNode(10);
tree.addNode(15);
tree.addNode(5);
tree.addNode(7);
tree.addNode(2);
tree.addNode(1);
tree.addNode(3);
tree.addNode(4);
tree.preorder();
// tree.minByIteratively();
// tree.searchIteratively(5);
// tree.getHeight();
// tree.levelOrder();

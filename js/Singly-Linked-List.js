class Node {
    constructor(val){
        this.val = val;
        this.next = undefined;
    }

    getVal(){
        return this.val;
    }
}

class List {
    constructor(){
        this.head = undefined;
        this.length = 0;
    }

    traverse(){
        if(this.isEmpty()){
            return '[]';
        }
        
        let node = this.head;
        let str = '[';
        while(node){
            str = str + node.getVal() + ',';
            node = node.next;
        }
        return str.slice(0, str.lastIndexOf(',')) + ']';
    }

    traverseByRecursion(){
        return '[' + (function inner(node){
            if(!node)
                return ']';
            return node.val + ',' + inner(node.next);
        })(this.head);
    }

    isEmpty(){
        return !this.head;
    }

    addAtBeginning(val){
        let node = new Node(val);
        node.next = this.head;
        this.head = node;
        this.length++;
        return true;
    }

    addAtEnd(val){
        let node = new Node(val);
        if(this.isEmpty()){
            this.addAtBeginning(val);
            return true;
        }

        let last = this.getLastNode();
        last.next = node;
        this.length++;
        return true;
    }

    getLastNode(){
        let node = this.head;
        while(node.next){
            node = node.next;
        }
        return node;
    }

    addAtIndex(val, index){
        if(index < 0)
            throw new Error(`Invalid index is ${index}`);

        if(index === 0){
            this.addAtBeginning(val);
            return true;
        }

        if(index === this.length){
            this.addAtEnd(val);
            return true;
        }

        let previousNode = this.getNodeByIndex(index-1);
        if(!previousNode)
            throw new Error(`Invalid index ${index}, can add node here`);
        
        let node = new Node(val);
        node.next = previousNode.next;
        previousNode.next = node;
        this.length++;
        return true;
    }

    getNodeByIndex(index){
        let position = 0;
        let node = this.head;
        while(node){
            if(index == position){
                return node;
            }
            node = node.next;
            position++;
        }
        return undefined;
    }

    deleteAtBeginning(){
        if(this.isEmpty())
            throw new Error(`Can't delete node, The list is empty`);

        let first = this.head;
        this.head = this.head.next;
        first.next = undefined;
        this.length--;
        return first;
    }

    deleteAtEnd(){
        if(this.isEmpty())
            throw new Error(`Can't delete node, The list is empty`);

        if(!this.head.next){
            return this.deleteAtBeginning();
        }

        let secondLastNode = this.getNodeByIndex(this.length-2);
        let lastNode = secondLastNode.next;
        secondLastNode.next = undefined;
        this.length--;
        return lastNode;
    }

    deleteByIndex(index){
        if(this.isEmpty())
            throw new Error(`Can't delete node, The list is empty`);
        if(index < 0 || index > this.length-1)
            throw new Error(`Can't delete node, Index out of bound exception`);
        if(index === 0){
           return this.deleteAtBeginning();
        }

        let previousNode = this.getNodeByIndex(index-1);
        let nodeToBeDeleted = previousNode.next;
        previousNode.next = nodeToBeDeleted.next;
        nodeToBeDeleted.next = undefined;
        this.length--;
        return nodeToBeDeleted;
    }

    reverse(){
        if(this.isEmpty())
            throw new Error(`Can't reverse it, The list is empty`);
        let previous = undefined;
        let temp = this.head;

        while(this.head.next){
            this.head = this.head.next;
            temp.next = previous;
            previous = temp;
            temp = this.head;
        }
        this.head.next = previous;
        return true;
    }

    getMidNode(){
        if(this.isEmpty())
            throw new Error(`Can't find midnode, The list is empty`);

        if(!this.head.next)
            return this.head;

        let single = this.head;
        let double = this.head.next;

        while(double.next && double.next.next){
            single = single.next;
            double = double.next.next
        }

        while(double.next){
            single = single.next;
            double = double.next;
        }
        return single;
    }

    getOccurancesOfValue(val){
        if(this.isEmpty())
            throw new Error(`The list is empty`);

        let count = 0;
        let temp = this.head;
        while(temp){
            if(temp.val === val)
                count++;
            temp = temp.next;
        }
        return count;
    }

    getMinAndMax(){
        if(this.isEmpty())
            throw new Error(`The list is empty`);

        let min = this.head.val;
        let max = this.head.val;
        let temp = this.head.next;
        while(temp){
            if(min > temp.val)
                min = temp.val;
            if(max < temp.val)
                max = temp.val;
            temp = temp.next;
        }
        return [min, max];
    }

    isEqual(anotherList){
        let tempFirst = this.head;
        let tempSecond = anotherList.head;

        while(tempFirst && tempSecond){
            if(tempFirst.val !== tempSecond.val)
                return false;
            
            tempFirst = tempFirst.next;
            tempSecond = tempSecond.next;
        }

        if(tempFirst || tempSecond)
          return false;

        return true;
    }

    getCopyOf(){
        let another = new List();
        let temp = this.head;
        while(temp){
            another.addAtEnd(temp.val);
            temp = temp.next;
        }
        return another;
    }

    getReverseCopyOf(){
        let another = new List();
        let temp = this.head;
        while(temp){
            another.addAtBeginning(temp.val);
            temp = temp.next;
        }
        return another;
    }

    swap2neighbours(){
        if(this.isEmpty())
            throw new Error(`Can't swap. The list is empty`);
        let first = this.head;
        let second = first.next;
        let previousOfFirst = undefined;

        while(first && second){
                
            if(this.head === first){
                first.next = second.next;
                second.next = first;
                this.head = second;
                previousOfFirst = first;
            } else {
                first.next = second.next;
                second.next = first;
                previousOfFirst.next = second;
                previousOfFirst = first;
            }

            let temp = first;

            first = temp.next ? temp.next : undefined;
            second = temp.next ? (temp.next.next ? temp.next.next: undefined): undefined;
        }
        return true;
    }

    setMaxAtEnd(){
        if(this.isEmpty())
            throw new Error(`Can't swap. The list is empty`);

        let previousNode = undefined, previousMaxNode = undefined, temp = this.head;
        let max = -Infinity;
        while(temp){
            if(temp.val > max){
                previousMaxNode = previousNode;
                max = temp.val;
            }
            previousNode = temp;
            temp = temp.next;
        }

       if(!previousMaxNode){
           let node = this.deleteAtBeginning();
           return this.addAtEnd(node.val);
       }

       let node = previousMaxNode.next;
       previousMaxNode.next = node.next;
       node.next = undefined;
       return this.addAtEnd(node.val);
    }

    clear(){
        let temp = this.head;
        let node = undefined;
        while(temp){
            node = temp;
            temp = temp.next;
            node.next = undefined;
        }
        node = undefined;
        this.head = undefined;
        this.length = 0;
        return true;
    }

    deleteFromBeginningAndAddAtEnd(){
        if(this.isEmpty())
            throw new Error(`Can't swap. The list is empty`);

        if(!this.head.next)
            return true;

        let node = this.head;
        
        this.head = this.head.next;
        let temp = this.head;
        while(temp.next){
            temp = temp.next;
        }
        
        node.next = temp.next
        temp.next = node;
        return true;
    }
}






/*
[100, 50, 60, 70, 80]

[]

*/

let list = new List();
list.addAtBeginning(50);
list.addAtBeginning(30);
list.addAtEnd(60);
list.addAtEnd(70);
list.traverse();

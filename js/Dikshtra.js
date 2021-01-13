class WeightedGraph {
    constructor(){
        this.list = {};
    }

    addVertex(vertex){
        if(this.list[vertex])
            throw new Error(`${vertex} is already added`);
        this.list[vertex] = [];
        return true;
    }

    addEdge(vertex1, vertex2, weight){
        if(!this.list[vertex1])
            throw new Error(`${vertex1} is not present`);
        if(!this.list[vertex2])
            throw new Error(`${vertex2} is not present`);

        if(this.list[vertex1].filter(neighbour => neighbour.node == vertex2).length){
            throw new Error(`${vertex1} - ${vertex2} is already added`);
        }

        this.list[vertex1].push({node: vertex2, weight});
        this.list[vertex2].push({node: vertex1, weight});
        return true;
    }

    dijkstra(start, finish){
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};

        // initial setup
        for(let vertex in this.list){
            if(vertex === start){
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            }else {
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
            }
            previous[vertex] = null;
        }
    }
}

class PriorityQueue {
    constructor(){
        this.queue = [];
    }

    enqueue(value, priority){
        value = value.toLowerCase();
        this.queue.push({value, priority});
        this.sort();
    }
    sort(){
        this.queue.sort((a, b) => b.priority - a.priority);
    }
    dequeue(){
//         this.queue.shift();
       return this.queue.pop();
    }
}


let graph = new WeightedGraph();
graph.addVertex('a');
graph.addVertex('b');
graph.addVertex('c');
graph.addVertex('d');
graph.addVertex('e');
graph.addVertex('f');


graph.addEdge('a', 'b', 4);
graph.addEdge('a', 'c', 2);
graph.addEdge('b', 'e', 3);
graph.addEdge('c', 'd', 2);
graph.addEdge('c', 'f', 4);
graph.addEdge('d', 'e', 3);
graph.addEdge('d', 'f', 1);
graph.addEdge('e', 'f', 1);

graph.dijkstra('a', 'e');


// let priority = new PriorityQueue();
// priority.enqueue('a', 0);
// priority.enqueue('b', 20);
// priority.enqueue('c', 10);
// priority.enqueue('d', 40);
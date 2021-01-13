class Graph {
    constructor(){
        this.list = {};
    }

    addVertex(vertex){
        vertex = vertex.toLowerCase();
        if(!this.list[vertex]){
            this.list[vertex] = [];
            return true;
        }
        throw new Error(`${vertex} already added`);
    }

    addEdge(vertex1, vertex2){
        vertex1 = vertex1.toLowerCase();
        vertex2 = vertex2.toLowerCase();
        if(this.list[vertex1] && this.list[vertex2]){
            let edgeExists = this.list[vertex1].filter(vertex => vertex === vertex2);
            if(edgeExists.length === 0){
                this.list[vertex1].push(vertex2);
                this.list[vertex2].push(vertex1);
                return true;
            }
            throw new Error(`Edge for ${vertex1} - ${vertex2} is added already`);
        }
        if(!this.list[vertex1])
            throw new Error(`${vertex1} not added`);
        else 
            throw new Error(`${vertex2} not added`);
    }

    removeEdge(vertex1, vertex2){
        vertex1 = vertex1.toLowerCase();
        vertex2 = vertex2.toLowerCase();
        if(this.list[vertex1] && this.list[vertex2]){
            let index = this.list[vertex1].indexOf(vertex2);
            if(index !== -1){
                this.list[vertex1].splice(index, 1);
                this.list[vertex2].splice(this.list[vertex2].indexOf(vertex1), 1);
                return true;
            }
            throw new Error(`Edge for ${vertex1} - ${vertex2} is deleted already`);
        }
        if(!this.list[vertex1])
            throw new Error(`${vertex1} not found`);
        else 
            throw new Error(`${vertex2} not found`);
    }

    removeVertex(vertex){
        vertex = vertex.toLowerCase();
        if(this.list[vertex]){
           while(this.list[vertex].length){
               let vertex2 = this.list[vertex][this.list[vertex].length-1];
               this.removeEdge(vertex, vertex2);
           }
           delete this.list[vertex]; 
           return true;
        }
        if(!this.list[vertex])
            throw new Error(`${vertex} not found`);
    }

    dfsRecursively(start){
        let visitedList = [];
        let visited = {};
        let copyList = this.list;

        (function dfs(point) {
          if(!point) return;
          
          
          visited[point] = true;
          visitedList.push(point);

          for(let neighbour of copyList[point]){
              if(!visited[neighbour])
                 dfs(neighbour);
          }
        })(start);

        return visitedList;
    }

    dfsIteratively(start){
        const visitedList = [];
        const visited = {};
        const stack = [];
        stack.push(start);

        while(stack.length !== 0){
            let vertex = stack.pop();
            if(!visited[vertex]){
                visitedList.push(vertex);
                visited[vertex] = true;    
                this.list[vertex].forEach(neighbour => {
                    if(!visited[neighbour])
                        stack.push(neighbour);
                });
            }
        }

        return visitedList;
    }

    bfsIteratively(start){
        const visitedList = [];
        const visited = {};
        const queue = [];
        queue.push(start);
        
        while(queue.length !== 0){
           let vertex = queue.shift();
           if(!visited[vertex]){
               visited[vertex] = true;
               visitedList.push(vertex);
               this.list[vertex].slice().reverse().forEach(neighbour => {
                  if(!visited[neighbour]) 
                    queue.push(neighbour);
               });
           }
        }

       return visitedList;
    }
}


let graph = new Graph();
graph.addVertex('a');
graph.addVertex('b');
graph.addVertex('c');
graph.addVertex('d');
graph.addVertex('e');
graph.addVertex('f');

graph.addEdge('a', 'b');
graph.addEdge('a', 'c');
graph.addEdge('b', 'd');
graph.addEdge('c', 'e');
graph.addEdge('d', 'e');
graph.addEdge('d', 'f');
graph.addEdge('e', 'f');

// graph.dfsRecursively('a');
// graph.dfsIteratively('a');
graph.bfsIteratively('a');


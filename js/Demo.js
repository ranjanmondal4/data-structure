class File {
    constructor(name, time){
        this.name = name;
        this.time = time;
    }

    toString(){
        console.log(`Name ${this.name} - ${this.time},  ${this.version}`);
    }
}

let first = new File('Ranjan-Will', 1);
let second = new File('Ranjan-Will', 2);
let third = new File('Ranjan-Will', 3);

let trust_first = new File('Ranjan-Trust', 4);

let files = [];
files.push(first);
files.push(second);
files.push(third);
files.push(trust_first);
let counters = {};
let instance;
let counter;
for(let index in files){

    instance = counters[files[index]];
    counter = instance ? instance.count : 0;
    if(counter === 0){
        counters[files[index]] = {};
        counters[files[index]].count = 1;
        counters[files[index]].index = index;    
    }else if(counter === 1){
         let firstIndex = counters[files[index]].index;
         files[firstIndex].version = 'Arc-1';
         files[index].version = 'Arc-2';
         counters[files[index]].count = 2;
    }else {
         files[index].version = 'Arc-'+ (counter+1);
         counters[files[index]].count = (counter+1);
    }
}

// for(let index in files){
//     files[index].toString();   
// }
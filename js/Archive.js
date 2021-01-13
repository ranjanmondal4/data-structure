class File {
    constructor(name, time){
        this.name = name;
        this.time = time;
    }

    print(){
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
let fileName;
for(let index in files){
    fileName = files[index].name;
    instance = counters[fileName];
    counter = instance ? instance.count : 0;
    if(counter === 0){
        counters[fileName] = {count: 1, index: index};
    }else if(counter === 1){
         let firstIndex = counters[fileName].index;
         files[firstIndex].version = 'Arc-1';
         files[index].version = 'Arc-2';
         counters[fileName].count = 2;
    }else {
         files[index].version = 'Arc-'+ (counter+1);
         counters[fileName].count = (counter+1);
    }
}

console.log(JSON.stringify(counters));
for(let index in files){
    files[index].print();   
}
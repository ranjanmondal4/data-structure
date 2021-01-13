function radixSort(array){
    let queue = getEmptyQueue();
  
    let highestSignificant = 3;
  
    for(let i=0; i<highestSignificant; i++){
      // enqueing queue with array elements
      for(let ele of array){
        queue[getDigit(highestSignificant, i, ele)].push(ele);
      }
  
      // emptying the array
      array.length=0;
  
      // dequeing the queue and filling array again
      for(let j=0; j<10; j++){
        while(queue[j].length){
          array.push(queue[j].shift());
        }
      }
    }
  
    return array;
  }
  
  function getEmptyQueue(){
    let queue = {};
    for(let i=0; i<10; i++){
      queue[i] = [];
    }
    return queue;
  }
  
  function getDigit(highestSignificant, i, num){
    return (+(''+num)[highestSignificant-1-i]);
  }
  
  // let unsorted = [992, 203, 100, 345, 456];
  // let sorted = radixSort(unsorted);
  // console.log(`The sorted is ${sorted}`);
  
  // 0-> 3-1-0=2, 1 -> 3-1-1=1, 2-> 3-1-2=0
  /**
  input: 9, 10, 23, 345, 456
  0  9, 10, 23
  1  
  2  
  3  345
  4  456
  5 
  6 
  7
  8
  9
  */
  
  /**
  2, 5, 7, 3, 9, 10,1, 4
  */
  
  function shellsort(array){
  
    let displacment = Math.floor(array.length/2);
    for(let i = displacment; i > 0; i--){
      for(let j=i; j<array.length; j = j + i){
        if(array[j-i] > array[j]){
          [array[j-i], array[j]] = [array[j], array[j-i]];
        }
      }
    }
    return array;
  }
  
  let sorted = shellsort([2, 5, 7, 3, 9, 10,1, 4])
  console.log(`The sorted is ${sorted}`);
  
  
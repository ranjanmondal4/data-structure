class Recursion {
    reverseArray(array){ // [1,2,3,4] ==> [4,3,2,1]
        (function inner(){
            if(array.length == 0){
               return; 
            }

            let val = array.shift();
            inner();
            array.push(val);
        })();

        return array;
    }

    reverseNumber(num){
        let sum = 0;
        (function inner(n){
            if(n == 0)
                return;
            sum = sum * 10 + (n % 10);
            inner(Math.floor(n/10));
        })(num);
        return sum;
    }

    divide(dividend, divisor){
        return (function inner(a, b){
            if(a - b == 0)
                return 1;
            if(a - b < 0)
                throw new Error(`Can't divide`);
            
            return 1 + inner(a-b, b);
        })(dividend, divisor);
    }

    multipleByRussianPeasant(num, num2){
        return (function inner(a, b){
            if(a == 1)
                return b;
            return (a%2 != 0 ? b : 0) + inner(Math.floor(a/2), b*2);

        })(num, num2);
    }

    binomialCofficient(n, r){
       if(r == 0 || n == r)
            return 1;
       return this.binomialCofficient(n-1, r-1) + this.binomialCofficient(n-1, r);
    }

    log2(num){
        if(num == 1)
            return 0;
        return 1 + this.log2(num/2);
    }

    findVowel(word){
        if(word.length == 0)
            return 0;
        return (['a', 'e', 'i', 'o', 'u'].includes(word[0].toLowerCase()) ? 1 : 0) + this.findVowel(word.substring(1));
    }

    // not working
    replaceOneCharWithAnother(word, x, y){
        (function inner(index){
            if(index == word.length)
                return;
            if(word[index] == x)
                word.replaceAt(index,y);
            inner(index+1); 
        })(0);

        return word;
    }


    reverseString(word){
        if(!word || word.length == 0)
            return '';
        return this.reverseString(word.substring(1)) + word[0];
    }

    indexOf(word, char){
        return (function inner(index){
            if(word.length == index)
                return -1;
            if(word[index].toLowerCase() == char.toLowerCase())
                return index;
            return inner(index + 1);
        })(0);
    }

    lastIndexOf(word, char){
        return (function inner(index){
            if(index == -1)
                return -1;
            if(word[index].toLowerCase() == char.toLowerCase())
                return index;
            return inner(index - 1);
        })(word.length-1);
    }

    isPalindrome(word){
        return (function inner(left, right){
            if(left >= right)
                return true;
            if(word[left].toLowerCase() !== word[right].toLowerCase())
                return false;
            return inner(left+1, right-1);
        })(0, word.length-1);
    }

    isPalindromeViaSmartChecker(word){
        let specialCharacters = [' ', '!'];
        return (function inner(left, right){
            if(left >= right)
                return true;

            // ignoring special characters
            if(specialCharacters.includes(word[left]))
                return inner(left+1, right);
            if(specialCharacters.includes(word[right]))
                return inner(left, right-1);
                    
            if(word[left].toLowerCase() !== word[right].toLowerCase())
                return false;
            return inner(left+1, right-1);
        })(0, word.length-1);
    }

    convertNumberToString(num){
        if(!num)
            return '';
        return this.convertNumberToString(Math.floor(num/10)) + (num%10);
    }

    convertStringToNumber(word){
        let sum = 0;
        (function inner(index){
            if(index == word.length)
                return;
            sum = sum * 10 + (+word[index]);
            inner(index+1);
        })(0);
        return sum;
    }

    numericDesignIst(num){
        let text='';
        (function inner(index){
            if(index > num)
                return;
            let text='';
            for(let i=1; i<=index; i++)
                text += i;
            console.log(text);
            inner(index+1);
        })(1);
    }

    numericDesign2nd(num){
        if(num == 0)
            return;

        let text = '';
        for(let i=1; i<=num; i++)
            text += i;
        console.log(text);
        this.numericDesign2nd(num-1);
    }

    numericDesign3rd(num){
        if(num == 0)
            return;

        let text = '';
        for(let i=1; i<=num; i++)
            text = i + text;
        console.log(text);
        this.numericDesign3rd(num-1);
    }

    numericTringle(num){
        let spaces = num - 1;
        (function inner(index){
            if(index > num)
                return;
            let text = '';
            for(let i=1; i<=spaces; i++)
                text += ' ';
            for(let i=1; i<=index; i++)
                text += i + ' ';
            console.log(text);
            spaces--;
            inner(index+1);
        })(1);
    }

    is2ArraysEqual(array1, array2){

        return (function inner(index){
            if(array1.length == index && array2.length == index)
                return true;
            if(array1.length == index || array2.length == index)
                return false;
            if(array1[index] == array2[index])
                return inner(index+1);
            else
                return false;
        })(0);
    }

    printAlternateIndexInArray(array){
        let text = '[';
        (function inner(index){
            if(array.length == index)
                return;
            if(index%2==0)
                text += array[index] + ',';
            inner(index + 1);
        })(0);
        return text.substring(0, text.lastIndexOf(',')) + ']';
    }

}

let recursion = new Recursion();

 
/*

*/
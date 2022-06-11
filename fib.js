/**
  MEMOIZATION

  STEPS: 
  1. Make it work.
    - Visualize prob as a tree.
    - Implement tree using recursion
    - test it
  2. Make it efficient.
    - Use a hash table (memo) to store results
    - Add base case to return memo value (if arg in memo, just return)
    - Store return values into memo, where original values returned


  Hash for js is object. Keys are args, value is return value
 */

// Find fibinacci numbers
// Time: O2^n, Space: On 
const fib = (n) => {
  if (n <= 2) return 1;
  return fib(n - 1) + fib(n - 2);
}

// Time: On, Space: On
const fibMemo = (n, memo = {}) => {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}

// console.log(fib(50));
// console.log(fibMemo(50));


// ===========================================

// Find number of ways to travel from top left to bottom right
//  Time: O2^n+m, Space: On*m
const gridTraveler = (m, n) => {
  if (m === 0 || n === 0) return 0;
  if (m ===1 && n === 1) return 1;
  return gridTraveler(m - 1, n) + gridTraveler(m, n - 1);
}


// Time: On*m, Space: On*m
const gridTravelerMemo = (m, n, memo = {}) => {
  const key = m + ',' + n;

  if (key in memo) return memo[key]; 
  if (m === 0 || n === 0) return 0;
  if (m ===1 && n === 1) return 1;
  memo[key] = gridTravelerMemo(m - 1, n, memo) + gridTravelerMemo(m, n - 1, memo);
  console.log(key)
  return memo[key];
  
}

// console.log(gridTraveler(32, 34));
// console.log(gridTravelerMemo(32, 5));

// ===========================================
// canSum

const canSum = (arr, target) => {
  if (target === 0) return true;
  if (target < 0) return false;

  for (let num of arr) {
    const remainder = target - num;
    if (canSum(arr, remainder) === true) return true;
  }
  return false
}

const canSumMemo = (arr, target, memo = {}) => {
  if (target in memo) return memo[target];
  if (target === 0) return true;
  if (target < 0) return false;

  for (let num of arr) {
    const remainder = target - num;
    if (canSum(arr, remainder, memo) === true) {
      memo[target] = true
      
      return true;
    }
  }
  memo[target] = false
  return false
}

// console.log(canSum([2,5,3,9], 20))
// console.log(canSum([6,7], 400))

// ==========================================
// m = target sum
// n = numbers.length

// time: O(n^m)
// space: O(m)

const howSum = (targetSum, numbers) => {
  if (targetSum === 0) return [];
  if (targetSum < 0) return null

  for (let num of numbers) {
    // if (targetSum % num === 0) {
    //   const arr = [];
    //   for (let i = 0; i < (targetSum / num); i++) {
    //     arr.push(num)
    //   }
    //   return arr
    // }
    const remainder = targetSum - num
    const remainderResult = howSum(remainder, numbers)
    if (remainderResult !== null) {
      return [...remainderResult, num ];
    }
  }
  return null


  
}

const howSumMemo = (targetSum, numbers, memo = {}) => {
  if (targetSum in memo) return memo[targetSum]
  if (targetSum === 0) return [];
  if (targetSum < 0) return null

  for (let num of numbers) {
    let remainder = targetSum - num
    const remainderResult = howSum(remainder, numbers, memo)
    if (remainderResult !== null) {
      memo[targetSum] = [...remainderResult, num ];
      return memo[targetSum]
    }
  }
  memo[targetSum] = null
  return null
  
}


console.log(howSumMemo(300, [7, 14]))


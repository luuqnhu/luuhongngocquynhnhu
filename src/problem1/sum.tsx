// Time O(n), space O(1)
var sum_to_n_a = function(n) {
    if (n > Number.MAX_SAFE_INTEGER) {
        return
    }

    let sum = 1;
    for(let i = 2; i <= n; i++) {
        sum += i
    }
    return sum
};

// Time O(n), space O(n)
var sum_to_n_b = function(n) {
    if (n > Number.MAX_SAFE_INTEGER) {
        return
    }
    const arr = Array.from({ length: n }, (_, i) => i + 1);
    return arr.reduce((sum, i) => sum + i)
};

// Time O(1), space O(1)
var sum_to_n_c = function(n) {
    if (n > Number.MAX_SAFE_INTEGER) {
        return
    }
    
    return (n * (n+1))/2
};

console.log(sum_to_n_a(5))
console.log(sum_to_n_b(5))
console.log(sum_to_n_c(5))
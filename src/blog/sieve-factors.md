---
title: "sieve + factors"
slug: "sieve-factors"
date: "02/09/2025 11:30"
---
[3447. Assign Elements to Groups with Constraints](https://leetcode.com/problems/assign-elements-to-groups-with-constraints/)

If you aren't familiar with the [Sieve of Erastosthenes](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes), you may not know where to start with this problem. 

![Sieve of Erastosthenes](https://upload.wikimedia.org/wikipedia/commons/9/94/Animation_Sieve_of_Eratosth.gif)

In short, you can use the Sieve to find all prime numbers from `2` to `n` with `O(n*log(log(n))` time complexity (given that updates are `O(1)`). We can do this by creating an array of length `n+1` and starting our iterations with the first prime number, `2`. Continue marking all multiples of `2` in our array until we are out of bounds, then move on to the next _unmarked_ index, which we can call `i`. Because of the way we are marking numbers we know that `i` is not a multiple of any of its predecessors, and therefore only has factors `1` and `i`, making `i` a prime number. Keep track of `i` and repeat the process until you have found all primes up to and including `n`.

Now, on to the problem at hand. You might be saying, _"this problem has nothing to do with prime numbers"_, and you would be right. However, we can apply a similar technique to efficiently find multiples of each number in `elements`. We do so by marking multiples of numbers in `elements` in an array `f` of length `max(groups)`, with all indices initialized to `-1`.

We should do our marking iteratively, starting from `elements[0]` to `elements[len(elements)-1]`, because of the constraint which states: 

_If there are multiple elements that can be assigned, assign the element with the smallest index `j`._

For the same reason, we should also never overwrite an index `i` if `f[i] != -1`. Once marking is complete for all numbers in `elements`, the final answer array `a` can be easily constructed by iterating through `groups` and assigning `a[i] = f[groups[i]]`.

My [accepted solution](https://leetcode.com/submissions/detail/1537151026/) can be found below.

```py
class Solution:
    def assignElements(self, groups: List[int], elements: List[int]) -> List[int]:
        mx = max(groups) + 1
        f = [-1] * mx

        for i, e in enumerate(elements):
            if e >= mx or f[e] != -1:
                continue
            c = e
            while c < mx:
                if f[c] == -1:
                    f[c] = i
                c += e

        return [f[g] for g in groups]
```

---
title: "super small special substrings"
date: "2/17/2025 16:20"
---
[3458. Select K Disjoint Special Substrings](https://leetcode.com/problems/select-k-disjoint-special-substrings/description/)

This problem was hard. I've not spent enough time working on interval problems to immediately recognize the pattern required to solve the problem. Because of this, I wanted to write an article about this problem to solidify my understanding of the techniques needed to solve it, and others like it. Maybe someone else could find it useful as well.

**Some observations that are important for solving the problem include:**
1. We always want to use the smallest substring possible
2. We always want to use the substring starting at the minimum possible index

Both of these stem from the constraint that the **special substrings** are _disjoint_, so if we want to form as many **special substrings** as possible, there is no situation where taking a larger substring makes sense.

The first thing that we can do is find the first and last occurrences of every unique character in `s`. This is useful because each character contained within a **special substring** must have its first and last occurrence within the range of the substring.

_Note: this does **not** mean that **special substrings** must start and end with the same character._

Ex. `s = "acdcdb"` has 3 **special substrings**: `["a", "cdcd", "b"]`.

Once we have a map with key-value pairs of characters in `s` and their `[first, last]` occurrences, we can start to form and store the intervals which represent the **special substrings** within `s` in a list `intervals`. To do so, we can interate through all values within our character-indices map, and for each index `i` in the range `first occurrence <= i <= last occurrence` expand this interval to the right if needed based on the `last occurrence` of the character at `s[i]`. We can ignore the current interval if we are forced to expand to the left, because this interval would have _already_ been added to `intervals`.

With all of the **special substrings** of `s` in `intervals` with the form `[start, end]`, we can sort by `end` ascending, meaning that we will get the shortest intervals, which begin earliest, first (remember `1.` and `2.`?). Because the specail substrings must be disjoint, we also need to keep track of the end of the previous **special substring** to ensure that we don't overlap. Given all of this information, we can iterate through `intervals`, count the **special substrings**, and return whether the count is greater than or equal to `k`.

My [accepted solution](https://leetcode.com/submissions/detail/1546693623/) can be found below.

```py
class Solution:
    def maxSubstringLength(self, s: str, k: int) -> bool:
        
        ranges = {}
        
        for i, c in enumerate(s):
            ranges.setdefault(c, [i, i])
            ranges[c][1] = i
        
        intervals = []

        for start, end in ranges.values():
            i = start
            while i <= end:
                inner_start, inner_end = ranges[s[i]]
                if inner_end > end:
                    end = inner_end
                if inner_start < start:
                    break
                i += 1
            else:
                if start or end != len(s)-1:
                    intervals.append((start, end))

        special = 0
        prev_end = -1
        intervals.sort(key=lambda x: x[1])

        for start, end in intervals:
            if start > prev_end:
                prev_end = end
                special += 1
            
        
        return special >= k
```

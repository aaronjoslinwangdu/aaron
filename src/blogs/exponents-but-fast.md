---
title: "exponents, but fast"
date: "4/13/2025 13:20"
---

[1922. Count Good Numbers](https://leetcode.com/problems/count-good-numbers/description/)

It's been quite a while since I wrote anything here. I had gotten a bit tired of doing LeetCode, but I'm feeling ready to get back into it lately. Let's give it a go!

This problem seems pretty simple at first glance. We are given `n` indices for which we have a choice of `x` digits based on whether the index is even or odd. So easy! Then we see the constraint `1 <= n <= 10**15`, and realize we will have to do better than `O(n)` time complexity for this problem.

Before optimizing, let's get some of the foundational pieces of this problem out of the way. Our goal is to find the **total** number of digit strings where **even** indices contain even digits and **odd** indices contain prime digits. We know that for a 0-indexed string of length `n`, we will have `n//2` odd indices and `(n//2) + (n%2)` even indices. The `n%2` is there because in the case that `n` is odd, we will have an additional odd-numbered index.

Next, let's think about the choices available for different parities. There are `5` even digits (`{0,2,4,6,8}`) and `4` odd prime digits (`{2,3,5,7}`). With this information, we can construct a naive answer to the problem and optimize further.

If we let `e = (n//2) + (n%2)` and `o = n//2`, our naive answer to the problem could be `total = (5**e) * (4**o)`. If you would like more info on why this is the case, see [Permutations with repetition (wiki)](https://en.wikipedia.org/wiki/Permutation#Permutations_with_repetition) for a basic explanation. This isn't what this article is focused on, so I will omit the details.

This answer will not work for a couple reasons:

1. `x**y` will perform `x*x*...*x` `y` times, and `O(n)` is too slow for the constraints of this problem
2. The problem asks us to return the `total % 10**9 + 7`. Let `mod = 10**9 + 7` for the rest of this article

Python has a builtin function [`pow(base, exp, mod=None)`](https://docs.python.org/3/library/functions.html#pow) that we could use and be done with the problem, but that is no fun. For learning purposes, we will write our own version of `pow` and see why it is faster than `x**y`.

Given the expression `base**exp=res`, we can actually compute `res` in `O(log(exp))` time by using a technique called [binary exponentiation](https://cp-algorithms.com/algebra/binary-exp.html). We can go over a basic example for understanding.

Because of the [associativity of multiplication](https://en.wikipedia.org/wiki/Associative_property), we know that `x**(a+b)` is equal to `(x**a) * (x**b)`. For a more concrete example, let's look at `2**13`. We also know that every positive integer can be represented in binary, so let's do that now: `13 = [1011] -> 2**13 = (2**8) * (2**4) * (2**1)`. AnotherGeneralizing this, our algorithm will go as follows:

1. Start the algorithm with inputs `base`, `exp`, and `mod`
2. Initialize `res = 1` to store our final result
3. Look at the `i`th bit of the binary representation of `exp`
4. If the `i`th bit is set, multiply by the `i`th power of `base % mod`
5. Multiply `base` by `base % mod` (so we can use in following iterations)
6. Right-shift `exp` by `1`
7. Repeat steps `3.` through `6.` while `exp` is not `0` (`O(log(n))` time complexity)
8. Return `res`, the answer for `(base**exp) % mod`

This is a simple version of what is happening when you call the builtin `pow`, and you can view the current ([cpython implementation here](https://github.com/python/cpython/blob/109fc2792a490ee5cd8a423e17d415fbdedec5c8/Objects/longobject.c#L4246)).

Combining everything up to this point, we are able to solve the problem with `O(log(n))` time complexity and `O(1)` space complexity.

My [accepted solution](https://leetcode.com/submissions/detail/1605816374/) can be found below.

```py
class Solution:
    def countGoodNumbers(self, n: int) -> int:

        mod = 1_000_000_007
        even = n//2 + n%2
        odd = n//2

        def binexp(base, exp):
            base %= mod
            res = 1
            while exp:
                if exp&1:
                    res *= base%mod
                base *= base%mod
                exp >>= 1
            return res

        return binexp(5, even) * binexp(4, odd) % mod
```

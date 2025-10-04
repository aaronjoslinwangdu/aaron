---
title: "a linked list by any other name"
slug: "a-linked-list-by-any-other-name"
date: "02/11/2025 22:01"
---
[2360: Longest Cycle in a Graph](https://leetcode.com/problems/longest-cycle-in-a-graph/)

The first thing you should notice about this problem is that the all of the `edges` given to us make up `1` to `n` singly-linked lists. This is because each of the `n` nodes have _at most one_ outgoing node. This is also very convenient for us, and we can use a simple depth-first search to solve the problem.

All we need to do to detect a cycle within the graph is follow the path `i -> edges[i]` until we either:

1. Can't go any further, i.e. `edges[i] == -1`
2. Reach a node that we have already visited during this traversal

In order to know _how long_ that cycle is, there are a few extra things we need to keep track of during our traversals.

3. What nodes we have already visited (all time, not only during the current traversal)
4. The distance from the "root" node of the current traversal
5. The nodes that we have visited during the current traversal

You might be thinking that `3` and `5` seem redundant, but they actually have different uses. We can overwrite the values in `edges` to achieve `3` in order to avoid traversing the same set of nodes twice (greatly improving performance). For `4` and `5`, we can lump these operations together using a hash-map to keep track of both, which will be used to actually calculate the length of any cycle that we encounter.

While traversing the graph starting at a node `i`, we will go until cases `1` or `2` are satisfied, keeping track of `3`, `4`, and `5`. If we end up with case `2`, then the length of the current cycle will be `distance from root - distance from root at encountered node`. Logically, this is the same thing as the distance _starting_ from the repeated node _back_ to the repeated node. 

![Example](https://assets.leetcode.com/uploads/2022/06/08/graph4drawio-5.png)

From this example, you can see that if we started at node `1`, that the first time that we reached node `3` the number of edges traversed is `1`. Then we continue to `4`, `2`, and finally back to `3`. By the second time, we have traversed `4` edges, and you can see that the distances subtracted from each other will equal `4 - 1 = 3`, the length of the cycle. 

Keep track of the maximum length of any given cycle within the graph, making sure to update all nodes that we visit in `edges` to avoid repeated traversals and return that as our final answer.

My [accepted solution](https://leetcode.com/submissions/detail/1539961509/) can be found below.

```py
class Solution:
    def longestCycle(self, edges: List[int]) -> int:

        l = -1

        for i in range(len(edges)):
            u = {}
            n = i
            c = 0
            while edges[n] != -1:
                c += 1
                u[n] = c
                m = edges[n]
                edges[n] = -1
                n = m
            if n in u:
                l = max(l, c-u[n]+1)

        return l
```

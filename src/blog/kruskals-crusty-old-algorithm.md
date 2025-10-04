---
title: "kruskal's crusty old algorithm"
slug: "kruskals-crusty-old-algorithm"
date: "10/4/2025 17:10"
---
[1135: Connecting Cities with Minimum Cost](https://leetcode.com/problems/connecting-cities-with-minimum-cost)

Once again, it's been a while. Graph theory was my favorite course during college, so let's talk about minimum spanning trees, disjoint sets, and Kruskal's algorithm.

Let's start with the problem statement. Our first input is an integer `N`, which represents the total number of cities. We can think of these cities as vertices in a graph, and I'll refer to them as such for the rest of this article. The second input is a `list` `connections`, containing tuples of the form `(u, v, c)`, which represents a connection between vertices `u` and `v` with a cost of `c`. Our goal is to find the minimum cost to connect the `N` vertices, or return `-1` if this is not possible.

If you are familiar with minimum spanning trees (MST), this goal should sound familiar. If not, a MST can be defined as _a subset of the edges of a connected, edge-weighted undirected graph that connects all the vertices together, without any cycles and with the minimum possible total edge weight_, and is pretty much what this problem is asking for. 

There are a few classic algorithms for finding a MST, but I will be using Kruskal's today. Kruskal's algorithm for our problem will consist of the following steps:
1. Create a set of `N` single-vertex trees
2. Sort `connections` in ascending order by cost `c`, because we want to minimize the cost sum
3. Iterate through `connections`, adding an edge between `u` and `v` if they don't already belong to the same tree, adding `c` to a running sum
4. That's it! If we managed to connect all `N` vertices, it is guaranteed to be a MST

But why does this work? If you are dumb like me and don't want to write _or_ read a formal proof, here is the basic idea. All of the edges added by Kruskal's algorithm will have the minimum weight possible at the time (because we sorted), and will _not_ create a cycle. If we manage to create a tree which spans all `N` vertices, it should always have the minimum total weight! Hopefully that is convincing enough. A formal proof is left as an exercise to the reader.

![Kruskal's algorithm](https://upload.wikimedia.org/wikipedia/commons/b/bb/KruskalDemo.gif)

Now, we have to deal with efficiently keeping track of and connecting these trees as we iterate through `connections`. That is where a _disjoint set_ comes into play. I implemented a `DisjointSet` `class` which uses union by rank and path compression to achieve a time complexity of `O(α(N))`, where `α` is the [inverse Ackermann function](https://en.wikipedia.org/wiki/Ackermann_function#Inverse), and can be treated as `O(1)` for all intents and purposes. I'm too stupid now, but I may attempt to explain this in further detail in the future. 

```py
class DisjointSet:
    def __init__(self, N: int) -> None:
        self.parent = list(range(N))
        self.rank = [0] * N

    def find(self, x: int) -> int:
        if x != self.parent[x]:
            self.parent[x] = self.find(self.parent[x]) # path compression
        return self.parent[x]

    # Return bool to signify if the vertices were actually joined
    def union(self, x: int, y: int) -> bool: 
        root_x, root_y = self.find(x), self.find(y)
        if root_x == root_y:
            return False
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_x] = root_y
            self.rank[root_y] += 1 # increase the rank!
        return True
```

This `class` allows us to start with a set of `N` disjoint trees (step 1 above), check whether two vertices are already part of the same tree (step 3 above), and join two trees together if they are not (also step 3 above). With the steps of Kruskal's algorithm outlined and the `DisjointSet` `class` in place, the only discussion point left is the overall time and space complexities.

The time complexity of Kruskal's algorithm using a disjoint set will be dominated by the sort operation, which will be `O(E * log(E))`, with `E` equal to the edge count in `connections`.

The space complexity here will be `O(N)`, as we only store `N` vertices in our `DisjointSet`.

My [accepted submission](https://leetcode.com/submissions/detail/1791528468/) can be found below.

```py
class DisjointSet:
    ... # implementation shown above

class Solution:
    def minimumCost(self, N: int, connections: List[List[int]]) -> int:
        dsu = DisjointSet(N)
        cost = edges = 0
        connections.sort(key=lambda x: x[2])

        for u, v, c in connections:
            if dsu.union(u-1, v-1):
                cost += c
                edges += 1

        # A tree with N vertices has N-1 edges
        return cost if edges == N-1 else -1
```

Side note: I want to start competing in LeetCode contests again. It's fun!

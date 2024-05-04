# Water-Jug
In this exercise, backend candidates will design a solution for the classic Water Jug Riddle. The task is to create an API that can compute the steps required to measure exactly Z gallons using two jugs of capacities X and Y gallons. The backend should process this problem efficiently and return the solution steps in JSON format through a RESTful API.

## Requirements
  - NodeJS: v20.12.2+

## Setup
  - `git clone`
  - `cd Water-Jug`
  - `npm install`
  - To run tests: `npm test`
  - To start server: `npm run dev`

## Design
For this project, the Express library was used to work as a server to receive the requests. The functionality was divided into routes, controller and service. The routes only define which endpoints are available and point them to methods on controller. The controller is only responsible for an initial validation on the required parameters and its types and calls 
the service. The service contain all business logic needed to process the request. Also a domain driven design (DDD) approach was used to group the files from the same domain. Even though the only domain present right now would be the buckets involved in the riddle, there is a possibility to expand this project and continue using this design.

The solution for the riddle used here was an application of the Breadth-first search (BFS) algorithm, since it's a commonly used approach to search for the "shortest path". In the context of this assessement, the shortest path would be the solution to the riddle for its given inputs with the least possible amount of steps. The algorithm begins with the initial state of both buckets being empty (0, 0) as the root node, and from there all possible changes of the current state are applied in it:
  - Fill X
  - Fill Y
  - Transfer from X to Y
  - Transfer from Y to X
  - Empty X
  - Empty Y
    
All these interactions are potentially a new node that would be adjacent to the current one. Before enqueueing them though, the algorithm checks individually if the state has already been achieved before, if so, it's discarted since even if this state is one necessary step to the solution, since it has been achieved before, the shortest path would be the one that
achievied this state first; Otherwhise, the new state is enqueued and the process of applying all possible changes to this state is repeated until a solution is found or until no more states are enqueued because all the generated states have already been visited.

Here's a pseudocode implementation of the logic applied:
```
 1  procedure BFS(G, root) is
 2      let Q be a queue
 3      label root as explored
 4      Q.enqueue(root)
 5      while Q is not empty do
 6          v := Q.dequeue()
 7          if v is the goal then
 8              return v
 9          for all edges from v to w in G.adjacentEdges(v) do
10              if w is not labeled as explored then
11                  label w as explored
12                  w.parent := v
13                  Q.enqueue(w)
```

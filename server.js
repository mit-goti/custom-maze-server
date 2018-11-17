const express = require('express');
const bodyParser = require('body-parser');
const Heap = require('heap');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/get_best_algo', (req, res) => {
    foo(req , res).then((ans) => {res.send(ans); console.log(ans);});
});

async function foo(req , res) {
    var matrix = req.body.matrix;
    var start = req.body.start;
    var end = req.body.end;
    var ans_algo = "dfs";
    var ans_steps = 100000000;

    //*****************DFS***********************//
    //*****************DFS***********************//
    //*****************DFS***********************//

    var counter = 0; 
    var stack = [];
    stack.push(start);
    var visited = {};
    for(var i = 0 ; i < 100 ; i++) {
        for(var j = 0 ; j < 100 ; j++) 
            visited[i+"_"+j] = 0;
    }
    while(true) {
        counter++;
        if(stack.length == 0)
            return {success : false};
        var temp = stack[stack.length-1];
        stack.pop();
        if(temp.x == end.x && temp.y == end.y) {
            break;
        }
        visited[temp.x + "_" + temp.y] = 1;
        x = temp.x;
        y = temp.y;
        if(matrix[x+1][y] == 0 && visited[(x+1)+"_"+y] == 0) {
            stack.push({x:x+1 , y:y});
        }
        if(matrix[x-1][y] == 0 && visited[(x-1)+"_"+y] == 0) {
            stack.push({x:x-1 , y:y});
        }
        if(matrix[x][y+1] == 0 && visited[(x)+"_"+(y+1)] == 0) {
            stack.push({x:x , y:y+1});
        }
        if(matrix[x][y-1] == 0 && visited[(x)+"_"+(y-1)] == 0) {
            stack.push({x:x , y:y-1});
        }
    }
    var dfs_count = counter;
    if(dfs_count < ans_steps) {
        ans_algo = "DFS";
        ans_steps = dfs_count;
    }

    //*****************A_Euclid***********************//
    //*****************A_Euclid***********************//
    //*****************A_Euclid***********************//
    counter = 0;
    var heap = new Heap(function(a,b) {
        return a.cost - b.cost;
    }); 
    var cost=((start.x-end.x)*(start.x-end.x))+((start.y-end.y)*(start.y-end.y));
    heap.push({cost: cost , x : start.x , y : start.y});
    var visited = {};
    for(var i = 0 ; i < 100 ; i++) {
        for(var j = 0 ; j < 100 ; j++) 
            visited[i+"_"+j] = 0;
    }
    while(true) {
        counter++;
        if(visited[end.x + "_" + end.y] == 1)   break;
        if(heap.nodes.length == 0)    return {success : false};
        var temp = heap.pop();
        if(visited[temp.x+"_"+temp.y] == 1) continue;
        if(temp.x == end.x && temp.y == end.y)   { 
            break
        };
        visited[temp.x+"_"+temp.y] = 1;
        var x = temp.x , y = temp.y;
        if(matrix[x+1][y] == 0 && visited[(x+1)+"_"+y] == 0) {
            heap.push({cost:((x+1-end.x)*(x+1-end.x) + (y-end.y)*(y-end.y)), x:x+1 , y:y});
        }
        if(matrix[x-1][y] == 0 && visited[(x-1)+"_"+y] == 0) {
            heap.push({cost:((x-1-end.x)*(x-1-end.x) + (y-end.y)*(y-end.y)), x:x-1 , y:y});
        }
        if(matrix[x][y+1] == 0 && visited[(x)+"_"+(y+1)] == 0) {
            heap.push({cost:((x-end.x)*(x-end.x) + (y+1-end.y)*(y+1-end.y)), x:x , y:y+1});
        }
        if(matrix[x][y-1] == 0 && visited[(x)+"_"+(y-1)] == 0) {
            heap.push({cost:((x-end.x)*(x-end.x) + (y-1-end.y)*(y-1-end.y)), x:x , y:y-1});
        }
    }
    var eu = counter;
    if(counter < ans_steps) {
        ans_algo = "A*-Euclid";
        ans_steps = counter;
    }

    //*****************A_Manhatten***********************//
    //*****************A_Manhatten***********************//
    //*****************A_Manhatten***********************//
    counter = 0;
    var heap = new Heap(function(a,b) {
        return a.cost - b.cost;
    }); 
    var cost=Math.abs(start.x-end.x)+Math.abs(start.y-end.y);
    heap.push({cost: cost , x : start.x , y : start.y});
    var visited = {};
    for(var i = 0 ; i < 100 ; i++) {
        for(var j = 0 ; j < 100 ; j++) 
            visited[i+"_"+j] = 0;
    }
    while(true) {
        counter++;
        if(heap.nodes.length == 0)    break;
        var temp = heap.pop();
        if(visited[temp.x+"_"+temp.y] == 1) continue;
        if(temp.x == end.x && temp.y == end.y)   { 
            break
        };
        visited[temp.x+"_"+temp.y] = 1;
        var x = temp.x , y = temp.y;
        if(matrix[x+1][y] == 0 && visited[(x+1)+"_"+y] == 0) {
            heap.push({cost: Math.abs(x+1-end.x) + Math.abs(y-end.y) ,x:x+1 , y:y});
        }
        if(matrix[x-1][y] == 0 && visited[(x-1)+"_"+y] == 0) {
            heap.push({cost: Math.abs(x-1-end.x) + Math.abs(y-end.y) ,x:x-1 , y:y});
        }
        if(matrix[x][y+1] == 0 && visited[(x)+"_"+(y+1)] == 0) {
            heap.push({cost: Math.abs(x-end.x) + Math.abs(y+1-end.y) ,x:x , y:y+1});
        }
        if(matrix[x][y-1] == 0 && visited[(x)+"_"+(y-1)] == 0) {
            heap.push({cost: Math.abs(x-end.x) + Math.abs(y-1-end.y) ,x:x , y:y-1});
        }
    }
    var man = counter;
    if(counter < ans_steps) {
        ans_algo = "A*-Manhatten";
        ans_steps = counter;
    }

    //*****************Dijikstra***********************//
    //*****************Dijikstra***********************//
    //*****************Dijikstra***********************//

    counter = 0;
    stack = [];
    stack.push(start);
    for(var i = 0 ; i < 100 ; i++) {
        for(var j = 0 ; j < 100 ; j++) 
            visited[i+"_"+j] = 0;
    }
    while(true) {
        var temp_array = [];
        while(stack.length != 0) {
            counter++;
            var temp = stack.pop();
            var x = temp.x , y = temp.y;
            visited[x + "_" + y] = 1;
            if(x == end.x && y == end.y)
                break;
            if(matrix[x+1][y] == 0 && visited[(x+1)+"_"+y] === 0) 
                temp_array.push({x:x+1 , y:y});
            if(matrix[x-1][y] == 0 && visited[(x-1)+"_"+y] === 0) 
                temp_array.push({x:x-1 , y:y});
            if(matrix[x][y+1] == 0 && visited[(x)+"_"+(y+1)] === 0) 
                temp_array.push({x:x , y:y+1});
            if(matrix[x][y-1] == 0 && visited[(x)+"_"+(y-1)] === 0) 
                temp_array.push({x:x , y:y-1});
        }
        stack = temp_array;
        if(visited[end.x + "_" + end.y] == 1)
            break;
    }
    var Dijikstra = counter;
    if(counter < ans_steps) {
        ans_algo = "Dijikstra";
        ans_steps = counter;
    }



    return {dfs: dfs_count , euclid: eu , Dijikstra: Dijikstra , manhatten: man ,ans: ans_algo , count: ans_steps};
}

app.listen(port, () => console.log(`Listening on port ${port}`));
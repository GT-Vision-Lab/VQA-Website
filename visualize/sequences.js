// Dimensions of sunburst.
var width = 1000;
var height = 700;
var radius = Math.min(width, height) / 3;

// Breadcrumb dimensions: width, height, spacing, width of tip/tail.
var b = {
w: 75, h: 30, s: 3, t: 10
};

var temp;
var json;
var str = [];

var Prefix = ['1', '2', '3', '4',
                '5', '6', '7', '8',
                '9', '10', '11', '12',
                '13', '14', '15', '16',
                '17', '18'
                ];

d3.json('ngram.json',
        function(error, d) {
        if (error) return console.warn(error);
        json = d;
       // window.alert(json["what"]["topAns"][0][0]);
        });


// Mapping of step names to colors.
var colors = {
    "the":"#aed",
    "is":"#13a",
    "what":"#a58",
    "are":"#fcb",
    "this":"#28d",
    "in":"#f9c",
    "on":"#8a6",
    "a":"#4c4",
    "of":"#384",
    "how":"#331",
    "many":"#b06",
    "color":"#61b",
    "there":"#494",
    "does":"#294",
    "man":"#e4d",
    "people":"#beb",
    "to":"#fce",
    "picture":"#894",
    "wearing":"#fcb",
    "it":"#cf2",
    "these":"#3ca",
    "where":"#d87",
    "have":"#9d8",
    "kind":"#381",
    "or":"#02e",
    "person":"#d50",
    "photo":"#e97",
    "do":"#87a",
    "you":"#7a0",
    "doing":"#fb8",
    "type":"#afa",
    "animal":"#3ab",
    "woman":"#975",
    "they":"#a9a",
    "room":"#766",
    "be":"#0ed",
    "holding":"#611",
    "animals":"#2f0",
    "for":"#994",
    "can":"#d9c",
    "dog":"#a85",
    "at":"#d0d",
    "cat":"#10c",
    "train":"#b0d",
    "that":"#672",
    "his":"#a6d",
    "sign":"#058",
    "he":"#a0e",
    "which":"#65f",
    "water":"#813",
    "any":"#e92",
    "shirt":"#75c",
    "food":"#2bb",
    "bus":"#a52",
    "why":"#a73",
    "an":"#6db",
    "see":"#355",
    "made":"#fe4",
    "playing":"#adc",
    "sitting":"#cc0",
    "with":"#703",
    "mans":"#a50",
    "plane":"#ed7",
    "plate":"#382",
    "sport":"#1d4",
    "shown":"#009",
    "time":"#2cf",
    "table":"#67b",
    "right":"#927",
    "taken":"#c42",
    "left":"#ae2",
    "was":"#88b",
    "white":"#dca",
    "number":"#45b",
    "background":"#b72",
    "standing":"#aef",
    "pizza":"#74b",
    "who":"#219",
    "being":"#f2f",
    "look":"#42c",
    "from":"#38b",
    "has":"#c3a",
    "boy":"#13a",
    "her":"#a05",
    "all":"#18a",
    "and":"#1eb",
    "wall":"#594",
    "ground":"#293",
    "girl":"#7a3",
    "she":"#ccb",
    "street":"#294",
    "sky":"#0b0",
    "say":"#cf8",
    "hand":"#249",
    "red":"#3b2",
    "top":"#cb3",
    "day":"#ebb",
    "eating":"#5e6",
    "clock":"#7c2",
    "would":"#f6b",
    "looking":"#5ca",
    "like":"#652",
    "visible":"#ebd",
    "men":"#7fb",
    "building":"#c19",
    "bear":"#620",
    "truck":"#cdd",
    "here":"#019",
    "up":"#595",
    "game":"#599",
    "image":"#61d",
    "front":"#f0b",
    "name":"#39f",
    "going":"#7b2",
    "toilet":"#2c4",
    "same":"#d2d",
    "out":"#d53",
    "bird":"#41e",
    "one":"#998",
    "behind":"#091",
    "fruit":"#023",
    "car":"#83a",
    "green":"#0c9",
    "riding":"#c1b",
    "child":"#e25",
    "light":"#e64",
    "horse":"#8e8",
    "trees":"#00b",
    "black":"#8ae",
    "seen":"#bb2",
    "two":"#495",
    "scene":"#b73",
    "bed":"#e1c",
    "their":"#a10",
    "brand":"#aa8",
    "object":"#a53",
    "cake":"#4f6",
    "hat":"#f8f",
    "ball":"#5bc",
    "blue":"#c5b",
    "flowers":"#ff1",
    "hair":"#1e9",
    "colors":"#3b3",
    "did":"#4f2",
    "vehicle":"#1bd",
    "giraffe":"#875",
    "elephant":"#5c7",
    "side":"#056",
    "pictured":"#926",
    "could":"#6f3",
    "end":"#fff"

}

function getRandomColor() {
    var letters = '789ABCD'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 6)];
    }
    return color;
}

function getColor(colors, name) {
    if (colors[name] != undefined) return colors[name];
    else {
        a = getRandomColor();
        return a;
    }
}


doit();

function hello(){
    str = []
    d3.select("#chart").selectAll("svg").remove();
    d3.select("#trail").style("visibility", "hidden");
    d3.select("#list").style("visibility", "hidden");
    doit();
}

function doit(){
    
    // Total size of all segments; we set this later, after loading the data.
    var totalSize = 0;
    var totalquest = 248349;
    
    var vis = d3.select("#chart").append("svg:svg")
    .attr("width", width)
    .attr("height", height)
    .append("svg:g")
    .attr("id", "container")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
    var partition = d3.layout.partition()
    .size([2 * Math.PI, radius * radius])
    .value(function(d) { return d.size; });
    
    var arc = d3.svg.arc()
    .startAngle(function(d) { return d.x; })
    .endAngle(function(d) { return d.x + d.dx + 0.01; })
    .innerRadius(function(d) { return Math.sqrt(d.y)*1.5 })
    .outerRadius(function(d) { return Math.sqrt(d.y + d.dy)*1.5 });
    
    // Use d3.text and d3.csv.parseRows so that we do not need to have a header
    // row, and can receive the csv as an array of arrays.
    d3.text("visit-sequences.csv", function(text) {
                       var csv = d3.csv.parseRows(text);
                       var json = buildHierarchy(csv);
                       createVisualization(json);
                       });
    
    // Main function to draw and set up the visualization, once we have the data.
    function createVisualization(json) {
        
        // Basic setup of page elements.
        initializeBreadcrumbTrail();
        //drawLegend();
        //drawwans();
//        d3.select("#toggleanswer").on("click", showans);
        
        // Bounding circle underneath the sunburst, to make it easier to detect
        // when the mouse leaves the parent g.
        vis.append("svg:circle")
        .attr("r", radius)
        .style("opacity", 0);
        
        // For efficiency, filter nodes to keep only those large enough to see.
        var nodes = partition.nodes(json)
        .filter(function(d) {
                return (d.dx > 0.001); // 0.005 radians = 0.29 degrees
                });
        
        var path = vis.data([json]).selectAll("path")
        .data(nodes)
        .enter().append("svg:path")
        .attr("display", function(d) { return d.depth ? null : "none"; })
        .attr("d", arc)
        .attr("fill-rule", "evenodd")
        .style("fill", function(d) {  return getColor(colors, d.name);})
        .style("opacity", 0.5)
        .on("mouseover", mouseover)
        .on("click", click);
        
        // Add the mouseleave handler to the bounding circle.
        d3.select("#container").on("mouseleave", mouseleave);
        
        // Get total size of the tree = value of root node from partition.
        totalSize = path.node().__data__.value;
    };
    
    // Fade all but the current sequence, and show it in the breadcrumb trail.
    function mouseover(d) {
        
        var ques = d.value
        var totalp = (100 * d.value / 248349).toPrecision(3);
        var percentage = (100 * d.value / totalSize).toPrecision(3);
        var percentageString = percentage + "%";
        if (percentage < 0.1) {
            percentageString = "< 0.1%";
        }
        var totalpstring = "/248349 = " + totalp + "%";
        
        d3.select("#percentage")
        .text(percentageString);
        
        d3.select("#explanation")
        .style("visibility", "");
        
        var sequenceArray = getAncestors(d);
        str = []
        for (var i = 0; i < sequenceArray.length; i++) {
            str.push(sequenceArray[i].name);
        }
        
        updateBreadcrumbs(sequenceArray, percentageString, ques, totalpstring);
        
        var d = d3.select("#list");
        
        var ans = d3.select("#anss");
        var freq = "";
        for(var i = 0; i<json[str.join(' ')]['topAns'].length; i++){
            freq = freq + json[str.join(' ')]['topAns'][i][1] + "<br>";
        }
        ans.html(freq);
        
        var ans2 = d3.select("#anss2");
        var word = "";
        for(var i = 0; i<json[str.join(' ')]['topAns'].length; i++){
            word = word + json[str.join(' ')]['topAns'][i][0] + "<br>";
        }
        ans2.html(word);
        
        d.style("visibility", "");
        
        // Fade all the segments.
        d3.selectAll("path")
        .style("opacity", 0.3);
        
        // Then highlight only those that are an ancestor of the current segment.
        vis.selectAll("path")
        .filter(function(node) {
                return (sequenceArray.indexOf(node) >= 0);
                })
        .style("opacity", 1);
    }
    
    // Restore everything to full opacity when moving off the visualization.
    function mouseleave(d) {
        
        // Hide the breadcrumb trail
        d3.select("#trail")
        .style("visibility", "hidden");
        
        // Deactivate all segments during transition.
        d3.selectAll("path").on("mouseover", null);
        
        d3.select("#list").style("visibility", "hidden");
        
        // Transition each segment to full opacity and then reactivate it.
        d3.selectAll("path")
        .transition()
        .duration(1000)
        .style("opacity", 0.5)
        .each("end", function() {
              d3.select(this).on("mouseover", mouseover);
              });
        
        d3.select("#explanation")
        .transition()
        .duration(1000)
        .style("visibility", "hidden");
    }
    
    // Given a node in a partition layout, return an array of all of its ancestor
    // nodes, highest first, but excluding the root.
    function getAncestors(node) {
        var path = [];
        var current = node;
        while (current.parent) {
            path.unshift(current);
            current = current.parent;
        }
        return path;
    }
    
    function initializeBreadcrumbTrail() {
        // Add the svg area.
        var trail = d3.select("#sequence").append("svg:svg")
        .attr("width", 1500)
        .attr("height", 50)
        .attr("id", "trail");
        // Add the label at the end, for the percentage.
        trail.append("svg:text")
        .attr("id", "endlabel")
        .style("fill", "#000");
    }
    
    // Generate a string that describes the points of a breadcrumb polygon.
    function breadcrumbPoints(d, i) {
        var points = [];
        points.push("0,0");
        points.push(b.w + ",0");
        points.push(b.w + b.t + "," + (b.h / 2));
        points.push(b.w + "," + b.h);
        points.push("0," + b.h);
        if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
            points.push(b.t + "," + (b.h / 2));
        }
        return points.join(" ");
    }
    
    // Update the breadcrumb trail to show the current sequence and percentage.
    function updateBreadcrumbs(nodeArray, percentageString, ques, totalpstring) {
        
        // Data join; key function combines name and depth (= position in sequence).
        var g = d3.select("#trail")
        .selectAll("g")
        .data(nodeArray, function(d) { return d.name + d.depth;});
        
        // Add breadcrumb and label for entering nodes.
        var entering = g.enter().append("svg:g");
        
        entering.append("svg:polygon")
        .attr("points", breadcrumbPoints)
        .style("fill", function(d) { return getColor(colors, d.name); });
        
        entering.append("svg:text")
        .attr("x", (b.w + b.t) / 2)
        .attr("y", b.h / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(function(d) {
              return d.name; });
        
        // Set position for entering and updating nodes.
        g.attr("transform", function(d, i) {
               return "translate(" + i * (b.w + b.s) + ", 0)";
               });
        
        // Remove exiting nodes.
        g.exit().remove();
        
        // Now move and update the percentage at the end.
        d3.select("#trail").select("#endlabel")
        .attr("x", (nodeArray.length + 1.2) * (b.w + b.s))
        .attr("y", b.h / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(ques + totalpstring);
        
        // Make the breadcrumb trail visible, if it's hidden.
        d3.select("#trail")
        .style("visibility", "");
        
    }
    
    // Restore everything to full opacity when moving off the visualization.
    function mouseleaveclick(d) {
        var ques = temp.value
        var totalp = (100 * temp.value / 248349).toPrecision(3);
        var percentage = (100 * temp.value / totalSize).toPrecision(3);
        var percentageString = percentage + "%";
        if (percentage < 0.1) {
            percentageString = "< 0.1%";
        }
        var totalpstring = "/248349 = " + totalp + "%";
        
        d3.select("#percentage")
        .text(percentageString);
        
        d3.select("#explanation")
        .style("visibility", "");
        
        d3.select("#list").style("visibility", "");
        
        var sequenceArray = getAncestors(temp);
        str = []
        for (var i = 0; i < sequenceArray.length; i++) {
            str.push(sequenceArray[i].name);
        }
        
        updateBreadcrumbs(sequenceArray, percentageString, ques, totalpstring);
        
        var ans = d3.select("#anss");
        var freq = "";
        for(var i = 0; i<json[str.join(' ')]['topAns'].length; i++){
            freq = freq + json[str.join(' ')]['topAns'][i][1] + "<br>";
        }
        ans.html(freq);
        
        var ans2 = d3.select("#anss2");
        var word = "";
        for(var i = 0; i<json[str.join(' ')]['topAns'].length; i++){
            word = word + json[str.join(' ')]['topAns'][i][0] + "<br>";
        }
        ans2.html(word);

        // Hide the breadcrumb trail
        d3.select("#trail")
        .style("visibility", "");
        
        // Deactivate all segments during transition.
        d3.selectAll("path").on("mouseover", null);
        
        // Transition each segment to full opacity and then reactivate it.
        d3.selectAll("path")
        .transition()
        .duration(1000)
        .style("opacity", 0.5)
        .each("end", function() {
              d3.select(this).on("mouseover", mouseover);
              });
        
        d3.select("#explanation")
        .transition()
        .duration(1000)
        .style("visibility", "hidden");
    }
    
    function click(d)
    {
        temp = d;
        
        d3.select("#container").selectAll("path").remove();
        
        var nodes = partition.nodes(d)
        .filter(function(d) {
                return (d.dx > 0.001); // 0.005 radians = 0.29 degrees
                }) ;
        
        var path = vis.data([d]).selectAll("path")
        .data(nodes)
        .enter().append("svg:path")
        .attr("display", function(d) { return d.depth ? null : "none"; })
        .attr("d", arc)
        .attr("fill-rule", "evenodd")
        .style("fill", function(d) { return getColor(colors, d.name); })
        //.style("stroke", "#D6CACA")
        .style("opacity", 0.5)
        .on("mouseover", mouseover)
        .on("click", click);
        
        // Add the mouseleave handler to the bounding circle.
        d3.select("#container").on("mouseleave", mouseleaveclick);
        
        // Get total size of the tree = value of root node from partition.
        totalSize = path.node().__data__.value;
        //console.log(totalSize);
    }

    // Take a 2-column CSV and transform it into a hierarchical structure suitable
    // for a partition layout. The first column is a sequence of step names, from
    // root to leaf, separated by hyphens. The second column is a count of how
    // often that sequence occurred.
    function buildHierarchy(csv) {
        var root = {"name": "root", "children": []};
        for (var i = 0; i < csv.length; i++) {
            var sequence = csv[i][0];
            var size = +csv[i][1];
            if (isNaN(size)) { // e.g. if this is a header row
                continue;
            }
            var parts = sequence.split("-");
            var currentNode = root;
            for (var j = 0; j < parts.length; j++) {
                var children = currentNode["children"];
                var nodeName = parts[j];
                var childNode;
                if (j + 1 < parts.length) {
                    // Not yet at the end of the sequence; move down the tree.
                    var foundChild = false;
                    for (var k = 0; k < children.length; k++) {
                        if (children[k]["name"] == nodeName) {
                            childNode = children[k];
                            foundChild = true;
                            break;
                        }
                    }
                    // If we don't already have a child node for this branch, create it.
                    if (!foundChild) {
                        childNode = {"name": nodeName, "children": []};
                        children.push(childNode);
                    }
                    currentNode = childNode;
                } else {
                    // Reached the end of the sequence; create a leaf node.
                    childNode = {"name": nodeName, "size": size};
                    children.push(childNode);
                }
            }
        }
        return root;
    };
    
    function arcTween(a){
        var i = d3.interpolate({x: a.x0, dx: a.dx0}, a);
        return function(t) {
            var b = i(t);
            a.x0 = b.x;
            a.dx0 = b.dx;
            return arc(b);
        };
    };
    
    function stash(d) {
        d.x0 = 0; // d.x;
        d.dx0 = 0; //d.dx;
    };
}

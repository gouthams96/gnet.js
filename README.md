# Gnet.js

![Demo](https://media.giphy.com/media/mkEFX5z6a1tbFI5fjZ/giphy.gif)

**Gnet** is a JavaScript library for network graph visualization, developed by [Goutham][1].

First I want to thank [D3.js][2] developers for creating such an amazing data visualization library. **Gnet** is build on top of [D3.js][2] for graph visualization and interaction. Even though it's build on [D3.js][2] it's very lightweight javascript library compared to [D3.js][2]. Also, **Gnet** is making use [canvas][3] feature of [D3.js][2] instead of traditional [SVG][4]. The **big advantage of canvas over** SVG is that you can create thousands of separate elements without it really affecting the performance.

**This project is beta so I'm not recommending for production use.**

Things I used.

<p>
<img alt="d3js" src="https://img.shields.io/badge/-D3.js-F9A03C?logo=d3.js&logoColor=white&style=flat-square" />
<img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=flat-square" />
<img alt="Webpack" src="https://img.shields.io/badge/-Webpack-8DD6F9?logo=webpack&logoColor=white&style=flat-square" /> 
<img alt="npm" src="https://img.shields.io/badge/-npm-CB3837?logo=npm&logoColor=white&style=flat-square" />
</p>

## Example

A basic example of loading the network graph is shown below using **Gnet**.

#### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Gnet</title>
  </head>
  <body>
    <div id="container"></div>
  </body>
  <script src="gnet.min.js"></script>
  <script src="main.js"></script>
</html>
```

#### main.js

```JavaScript
function main(){
    const data = {
        nodes : [
            {id: "A", group: 1},
            {id: "B", group: 2}
        ],
        links :  [{
            source : "A",
            target : "B",
            value  : 1
        }]
    };
    const graph = new Gnet('#container',{
        width : '500',
        height : '500',
        nodeStyle : {
            radius : 5,
            color  : '#48C9B0',
        }
    });
    graph.addData(data);
    graph.run();
}
main();

```

that's it, simple right :sunglasses:

## Build

To build the library from source, clone the project from github.

```
$ git clone https://github.com/gouthams96/gnet.js.git
```

To install all the dependencies and build the library, run following commands in the root of the project.

```
$ cd gnet.js
$ npm install
```

Then, the project can be build running:

```
$ npm run build
```

## Contribute

Contributions to the **Gnet.js** is are very welcome!.

[1]: https://github.com/gouthams96
[2]: https://d3js.org/
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
[4]: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg

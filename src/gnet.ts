import {GraphOptions, NodeStyle} from './graph.config';
import {Node, Link} from './graph.config';
import {GraphData} from './graph.config';
import {select} from 'd3-selection';
import {forceCenter, forceLink, forceManyBody, forceSimulation} from 'd3-force';

export class Gnet{

    selector : string;
    width    : number;
    height   : number;
    nodes    : any[];
    links    : any[];
    nodeStyle : NodeStyle = {
        color  : 'red',
        radius : 5,
    };

    canvasContext : CanvasRenderingContext2D;

    constructor(selector:string,options:GraphOptions){
        console.log({options});
        console.log(options.nodeStyle);
        console.log(options.nodeStyle.color);
        this.selector = selector;
        this.width    = options.width;
        this.height   = options.height;
        this.nodeStyle.color = options.nodeStyle.color
        this.nodeStyle.radius = options.nodeStyle.radius;
        this.init();
    }

    init(){

        this.canvasContext = this.getCanvasContext(this.selector,this.width,this.height);
    }

    addData(graphData:GraphData){
        this.nodes = graphData.nodes.map(d => Object.create(d));
        this.links = graphData.links.map(d => Object.create(d));
    }

    run(){
         forceSimulation(this.nodes)
        .force('link',forceLink(this.links).id((d:any) => d.id))
        .force('charge',forceManyBody())
        .force('center',forceCenter(this.width / 2, this.height / 2))
        .on('tick',() => this.ticked());
    }

    ticked () {

        this.canvasContext.clearRect(0, 0, this.width, this.height);
        
        this.canvasContext.beginPath();
        this.links.forEach((d) => this.drawLink(d));
        this.canvasContext.strokeStyle = "#aaa";
        this.canvasContext.stroke();
        
        this.canvasContext.strokeStyle = "#fff";
        for (const node of this.nodes) {
            this.canvasContext.beginPath();
            this.drawNode(node) 
            this.canvasContext.fillStyle = this.nodeStyle.color;
            this.canvasContext.fill();
            this.canvasContext.stroke();
        }
    }

    drawLink(d:any){
        this.canvasContext.moveTo(d.source.x, d.source.y);
        this.canvasContext.lineTo(d.target.x, d.target.y);
    }

    drawNode(d:any){
        this.canvasContext.moveTo(d.x + 3, d.y);
        this.canvasContext.arc(d.x, d.y, this.nodeStyle.radius, 0, 2 * Math.PI);
    }

    getCanvasContext(selector:string,width:number,height:number): CanvasRenderingContext2D{
        const canvas =  select(selector).append('canvas').attr('width',width).attr('height',height);
        const context:CanvasRenderingContext2D = canvas.node().getContext('2d');
        return context;
    }
}
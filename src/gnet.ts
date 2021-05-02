import { GraphOptions, NodeStyle, LinkStyle } from "./graph.config";
import { Node, Link } from "./graph.config";
import { GraphData } from "./graph.config";
import { select } from "d3-selection";
import {
  forceCenter,
  forceLink,
  forceManyBody,
  forceSimulation,
} from "d3-force";

export class Gnet {
  selector: string;
  width: number;
  height: number;
  nodes: any[];
  links: any[];
  nodeStyle: NodeStyle = {
    color: "#48C9B0",
    radius: 3,
    borderColor: "#fff",
  };
  linkStyle: LinkStyle = {
    color: "#aaa",
  };

  canvasContext: CanvasRenderingContext2D;

  constructor(selector: string, options: GraphOptions) {
    this.selector = selector;
    this.width = options.width;
    this.height = options.height;

    this.nodeStyle = { ...this.nodeStyle, ...options.nodeStyle };
    this.linkStyle = { ...this.linkStyle, ...options.linkStyle };

    this.init();
  }

  init() {
    this.canvasContext = this.getCanvasContext(
      this.selector,
      this.width,
      this.height
    );
  }

  addData(graphData: GraphData) {
    this.nodes = graphData.nodes.map((d) => Object.create(d));
    this.links = graphData.links.map((d) => Object.create(d));
  }

  run() {
    forceSimulation(this.nodes)
      .force(
        "link",
        forceLink(this.links).id((d: any) => d.id)
      )
      .force("charge", forceManyBody())
      .force("center", forceCenter(this.width / 2, this.height / 2))
      .on("tick", () => this.ticked());
  }

  ticked() {
    this.canvasContext.clearRect(0, 0, this.width, this.height);
    this.canvasContext.beginPath();
    this.links.forEach((d) => this.drawLink(d));
    this.canvasContext.strokeStyle = this.linkStyle.color;
    this.canvasContext.stroke();
    this.canvasContext.strokeStyle = this.nodeStyle.borderColor;
    for (const node of this.nodes) {
      this.canvasContext.beginPath();
      this.drawNode(node);
      this.canvasContext.fillStyle = this.nodeStyle.color;
      this.canvasContext.fill();
      this.canvasContext.stroke();
    }
  }

  drawLink(d: any) {
    this.canvasContext.moveTo(d.source.x, d.source.y);
    this.canvasContext.lineTo(d.target.x, d.target.y);
  }

  drawNode(d: any) {
    this.canvasContext.moveTo(d.x + this.nodeStyle.radius, d.y);
    this.canvasContext.arc(d.x, d.y, this.nodeStyle.radius, 0, 2 * Math.PI);
  }

  getCanvasContext(
    selector: string,
    width: number,
    height: number
  ): CanvasRenderingContext2D {
    const dpr: number = devicePixelRatio || 1;
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = dpr * width;
    canvas.height = dpr * height;
    canvas.style.width = `${width}px`;
    const context: CanvasRenderingContext2D = canvas.getContext("2d");
    context.scale(dpr, dpr);
    document.querySelector(selector).appendChild(canvas);
    return context;
  }
}

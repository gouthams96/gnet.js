export interface GraphOptions {
  width: number;
  height: number;
  nodeStyle: NodeStyle;
  linkStyle: LinkStyle;
}

export interface NodeStyle {
  color: string;
  radius: number;
  borderColor: string;
}
export interface Node {
  id: string;
  group: number;
}

export interface Link {
  source: string;
  target: string;
  value: number;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}

export interface LinkStyle {
  color: string;
}

export interface GraphOptions{
    width : number;
    height: number;
    nodeStyle : NodeStyle;
}

export interface NodeStyle{
    color : string;
    radius : number;
    
}
export interface Node{
    id : string;
    group : number;
}

export interface Link{
    source: string;
    target: string;
    value: number;
}

export interface GraphData{
    nodes : Node[];
    links : Link[];
}
namespace t {
    export class Node {
        constructor() {
            this._children = [];
            this._alpha = 1;
            this._worldAlpha = 1;
            this._visible = true;
            this._worldVisible = true;
        }
    }
    export interface Node extends NodeAlpha, NodeVisible, Container {
        parent: Node;
        children: Node[];
    }
    applyMixins(Node, [NodeAlpha, NodeVisible, Container]);
}

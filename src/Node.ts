namespace t {

    export class Node {
        constructor() {
            this._alpha = 1;
            this._worldAlpha = 1;
            this._children = [];
        }
    }

    export interface Node extends NodeAlpha, Container { }
    applyMixins(Node, [NodeAlpha, Container]);
}

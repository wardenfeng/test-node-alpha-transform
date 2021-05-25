namespace t {
    export class Container {
        get parent() {
            return this._parent;
        }
        set parent(v) {
            if (this._parent === v) {
                return;
            }
            this._parent = v;
            this._parentChanged();
        }
        protected _parent?: Container;

        protected _parentChanged() {
        }

        get children() {
            return this._children;
        }
        set children(v) {
            if (this._children) {
                for (let i = 0; i < this._children.length; i++) {
                    this._children[i].parent = undefined;
                }
            }
            this._children = v;
            if (this._children) {
                for (let i = 0; i < this._children.length; i++) {
                    this._children[i].parent = this;
                }
            }
            this._childrenChanged();
        }
        protected _children?: Container[];

        protected _childrenChanged() {

        }
    }
}

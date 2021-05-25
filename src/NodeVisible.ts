namespace t {
    export class NodeVisible {
        parent?: NodeVisible;
        children: NodeVisible[] = [];
        get visible() {
            return this._visible;
        }
        set visible(v) {
            if (this._visible === v) {
                return;
            }
            this._visible = v;
            this._updateVisibleChanged();
        }
        protected _visible: boolean = true;

        protected _updateVisibleChanged() {
            this._updateWorldVisible();
        }

        get worldVisible() {
            return this._worldVisible;
        }
        protected _worldVisible: boolean = true;

        protected _updateWorldVisible(updateChildren = true) {
            this._worldVisible = this._visible && (this.parent ? this.parent._worldVisible : true);
            if (updateChildren && this.children) {
                for (let i = 0; i < this.children.length; i++) {
                    this.children[i]._updateWorldVisible();
                }
            }
        }
    }
}
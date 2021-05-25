namespace t {
    export class NodeAlpha {
        parent?: NodeAlpha;
        children: NodeAlpha[] = [];

        get alpha() {
            return this._alpha;
        }
        set alpha(v) {
            if (this._alpha === v) {
                return;
            }
            this._alpha = v;
            this._updateAlphaChanged();
        }
        protected _alpha: number = 1;

        protected _updateAlphaChanged() {
            this._updateWorldAlpha();
        }

        get worldAlpha() {
            return this._worldAlpha;
        }
        protected _worldAlpha: number = 1;

        protected _updateWorldAlpha(updateChildren = true) {
            this._worldAlpha = this._alpha * (this.parent ? this.parent._alpha : 1);
            if (updateChildren && this.children) {
                for (let i = 0; i < this.children.length; i++) {
                    this.children[i]._updateWorldAlpha();
                }
            }
        }
    }
}
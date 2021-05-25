"use strict";
var t;
(function (t) {
    function applyMixins(derivedCtor, baseCtors) {
        baseCtors.forEach(function (baseCtor) {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
            });
        });
    }
    t.applyMixins = applyMixins;
})(t || (t = {}));
var t;
(function (t) {
    var Container = /** @class */ (function () {
        function Container() {
        }
        Object.defineProperty(Container.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            set: function (v) {
                if (this._parent === v) {
                    return;
                }
                this._parent = v;
                this._parentChanged();
            },
            enumerable: false,
            configurable: true
        });
        Container.prototype._parentChanged = function () {
        };
        Object.defineProperty(Container.prototype, "children", {
            get: function () {
                return this._children;
            },
            set: function (v) {
                if (this._children) {
                    for (var i = 0; i < this._children.length; i++) {
                        this._children[i].parent = undefined;
                    }
                }
                this._children = v;
                if (this._children) {
                    for (var i = 0; i < this._children.length; i++) {
                        this._children[i].parent = this;
                    }
                }
                this._childrenChanged();
            },
            enumerable: false,
            configurable: true
        });
        Container.prototype._childrenChanged = function () {
        };
        return Container;
    }());
    t.Container = Container;
})(t || (t = {}));
var t;
(function (t) {
    var NodeAlpha = /** @class */ (function () {
        function NodeAlpha() {
            this.children = [];
            this._alpha = 1;
            this._worldAlpha = 1;
        }
        Object.defineProperty(NodeAlpha.prototype, "alpha", {
            get: function () {
                return this._alpha;
            },
            set: function (v) {
                if (this._alpha === v) {
                    return;
                }
                this._alpha = v;
                this._updateAlphaChanged();
            },
            enumerable: false,
            configurable: true
        });
        NodeAlpha.prototype._updateAlphaChanged = function () {
            this._updateWorldAlpha();
        };
        Object.defineProperty(NodeAlpha.prototype, "worldAlpha", {
            get: function () {
                return this._worldAlpha;
            },
            enumerable: false,
            configurable: true
        });
        NodeAlpha.prototype._updateWorldAlpha = function (updateChildren) {
            if (updateChildren === void 0) { updateChildren = true; }
            this._worldAlpha = this._alpha * (this.parent ? this.parent._worldAlpha : 1);
            if (updateChildren && this.children) {
                for (var i = 0; i < this.children.length; i++) {
                    this.children[i]._updateWorldAlpha();
                }
            }
        };
        return NodeAlpha;
    }());
    t.NodeAlpha = NodeAlpha;
})(t || (t = {}));
var t;
(function (t) {
    var NodeVisible = /** @class */ (function () {
        function NodeVisible() {
            this.children = [];
            this._visible = true;
            this._worldVisible = true;
        }
        Object.defineProperty(NodeVisible.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (v) {
                if (this._visible === v) {
                    return;
                }
                this._visible = v;
                this._updateVisibleChanged();
            },
            enumerable: false,
            configurable: true
        });
        NodeVisible.prototype._updateVisibleChanged = function () {
            this._updateWorldVisible();
        };
        Object.defineProperty(NodeVisible.prototype, "worldVisible", {
            get: function () {
                return this._worldVisible;
            },
            enumerable: false,
            configurable: true
        });
        NodeVisible.prototype._updateWorldVisible = function (updateChildren) {
            if (updateChildren === void 0) { updateChildren = true; }
            this._worldVisible = this._visible && (this.parent ? this.parent._worldVisible : true);
            if (updateChildren && this.children) {
                for (var i = 0; i < this.children.length; i++) {
                    this.children[i]._updateWorldVisible();
                }
            }
        };
        return NodeVisible;
    }());
    t.NodeVisible = NodeVisible;
})(t || (t = {}));
var t;
(function (t) {
    var Node = /** @class */ (function () {
        function Node() {
            this._children = [];
            this._alpha = 1;
            this._worldAlpha = 1;
            this._visible = true;
            this._worldVisible = true;
        }
        return Node;
    }());
    t.Node = Node;
    t.applyMixins(Node, [t.NodeAlpha, t.NodeVisible, t.Container]);
})(t || (t = {}));
var t;
(function (t) {
    var node = new t.Node();
    node.children = [new t.Node(), new t.Node()];
    node.alpha = 0.5;
    node.children[0].alpha = 0.5;
    console.assert(node.children[0].worldAlpha === 0.25);
    console.assert(node.children[1].worldAlpha === 0.5);
    node.visible = false;
    console.assert(node.children[0].worldVisible === false);
    console.assert(node.children[1].worldVisible === false);
})(t || (t = {}));
//# sourceMappingURL=index.js.map
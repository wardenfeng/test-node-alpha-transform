namespace t {
    let node = new Node();

    node.children.push(new Node(), new Node());
    node.alpha = 0.5;

    console.log(node.children[0].worldAlpha, node.children[1].worldAlpha)
}
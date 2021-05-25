namespace t {
    let node = new Node();

    node.children = [new Node(), new Node()];
    node.alpha = 0.5;
    node.children[0].alpha = 0.5;

    console.assert(node.children[0].worldAlpha === 0.25);
    console.assert(node.children[1].worldAlpha === 0.5);
    
    node.visible = false;
    console.assert(node.children[0].worldVisible === false);
    console.assert(node.children[1].worldVisible === false);

}
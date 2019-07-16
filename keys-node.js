module.exports = function(RED) {
  function ZencodeDataNode(config) {
    this.source = config.source;
    this.name = config.name;
    RED.nodes.createNode(this, config);
    var node = this;

    node.on("input", function(msg) {
      const script = node.source;
      msg.payload = msg.payload || script;
      node.send(msg);
    });
  }

  RED.nodes.registerType("KEYS", ZencodeDataNode);
};

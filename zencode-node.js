module.exports = function(RED) {
  function ZencodeNode(config) {
    this.source = config.source;
    this.name = config.name;
    const zenroom = require("zenroom").default;
    RED.nodes.createNode(this, config);
    var node = this;

    node.on("input", function(msg) {
      const script = node.source;
      let result = "";
      let error = "";

      zenroom
        .script(script)
        .print(o => { result = o; })
        .success(() => {
          node.send({ payload: result });
          setSuccess(node);
        })
        .error(() => {
          node.error(error, msg);
          setFailure(node);
        })
        .zenroom_exec();
    });
  }

  function setSuccess(node) {
    node.status({
      fill: "green",
      shape: "dot",
      text: "executed"
    });
  }

  function setFailure(node) {
    node.status({
      fill: "red",
      shape: "ring",
      text: "errors on execution"
    });
  }

  RED.nodes.registerType("zencode", ZencodeNode);
};

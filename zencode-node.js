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
      var ctx = this.context();
      
      if (!ctx.get('data'))
        ctx.set('data', msg.zenroom_data || null)
      
      if (!ctx.get('keys'))
        ctx.set('keys', msg.zenroom_keys || null)
      
      const Z = zenroom
        .script(script)
        .print(o => { result = o; })
        .data(ctx.get('data'))
        .keys(ctx.get('keys'))
        .success(() => {
          node.send({ payload: result });
          setSuccess(node);
        })
        .error(() => {
          node.error(error, msg);
          setFailure(node);
        })
      
      if (config.format === 'text')
        Z.zencode_exec()
      else
        Z.zenroom_exec()
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

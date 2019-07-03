module.exports = function(RED) {
    function ZencodeNode(config) {
		const zenroom = require('zenroom')
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
			zenroom.default.script(msg.payload).zenroom_exec()
            node.send(msg);
        });
    }
    RED.nodes.registerType("zencode", ZencodeNode);
}

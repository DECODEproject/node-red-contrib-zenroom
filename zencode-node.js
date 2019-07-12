module.exports = function(RED) {
    function ZencodeNode(config) {
        const zenroom = require('zenroom')
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            const script = msg.payload
            let result = ''
            zenroom.default.script(script).print((o) => { result = o }).zenroom_exec()
            msg = {payload: result}
            node.send(msg);
            node.log("Zenroom node executed")
            node.status({fill:"green",shape:"dot",text:"executed"});
        });
    }
    RED.nodes.registerType("zencode", ZencodeNode);
}

module.exports = function(RED) {
    function ZencodeNode(config) {
        const zenroom = require('zenroom')
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            const script = msg.payload
            let result = ''
            zenroom.default.script(script)
                           .print(o => { result = o })
                           .success(() => {
                                msg = {payload: result}
                                node.send(msg);
                                node.log("Zenroom node executed")
                                node.status({fill:"green",shape:"dot",text:"executed"});
                           })
                           .error(() => {
                                node.log("Zenroom node executed with error")
                                node.status({fill:"red",shape:"ring",text:"errors on execution"});
                                node.error(result, msg)
                           })
                           .zenroom_exec()

        });
    }
    RED.nodes.registerType("zencode", ZencodeNode);
}

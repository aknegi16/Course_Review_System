const bunyan = require('bunyan')
const bunyantcp = require('bunyan-logstash-tcp');

exports.loggerInstance = bunyan.createLogger({
    name: 'transaction-notifier',
    serializers: {
        req: require('bunyan-express-serializer'),
        res: bunyan.stdSerializers.res,
        err: bunyan.stdSerializers.err
    },
    level: 'info',
    streams: [
        {
            path: './foo.log'
        },
        {
            stream: process.stdout
        },
        {

            stream: bunyantcp.createStream({
                host: '127.0.0.1',
                port: 9000})
        }


    ]


});

exports.logResponse = function (user, body, msg) {
    var log = this.loggerInstance.child({
     
        body: body,
        msg: msg
    }, true)
    log.info(msg)
}
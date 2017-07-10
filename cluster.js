var cluster = require('cluster')
  , cpus = require('os').cpus()
;
if (cluster.isMaster) {
    cpus.forEach(function(cps) {
        cluster.fork();
    });
    cluster.on('listening', function(worker) {
        console.log("Cluster %d conectado", worker.process.pid);
    });
    cluster.on("disconnect", function(worker) {
        console.log("Cluster %d esta desconectado.", worker.process.pid);
    });
} else {
    require('./app');
}
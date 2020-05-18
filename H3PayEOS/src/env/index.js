var dev = require('./env_dev');
var prod = require('./env_prod');

var envConfig = undefined;
if(process.env.NODE_ENV == 'production'){
    envConfig = prod
}else{
    envConfig = dev
}

module.exports = envConfig;     // export default 는 안먹힘
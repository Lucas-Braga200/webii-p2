const { serverHttp } = require('./http.js');
require('./websocket.js');

serverHttp.listen(3000);

module.exports = {
  allowedHosts: ['localhost', '.cfc.local', 'task.blue0073.cfc.local'],
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': '*'
  },
  host: 'localhost',
  port: 80,
  hot: true,
  historyApiFallback: true,
  client: {
    webSocketURL: 'auto://0.0.0.0:80/ws'
  }
};

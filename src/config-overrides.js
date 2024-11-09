const { override } = require('react-app-rewired');

module.exports = override(
  (config) => {
    // Modify the webpack dev server options
    if (config.devServer) {
      config.devServer = {
        ...config.devServer,
        host: '0.0.0.0',
        port: 80,
        allowedHosts: [
          'task.blue0073.cfc.local',
          'localhost',
          '0.0.0.0',
          '.cfc.local'  // Allows all subdomains of cfc.local
        ],
        client: {
          webSocketURL: {
            hostname: 'task.blue0073.cfc.local',
            pathname: '/ws',
            port: 80,
            protocol: 'ws',
          },
        },
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      };
    }

    return config;
  }
);

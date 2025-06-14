// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env',     // c’est le nom que tu importeras
        path: '.env',           // chemin relatif vers ton .env
        allowUndefined: true,
      }],
    ],
  };
};


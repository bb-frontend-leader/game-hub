// Copy to ecosystem.config.js and adjust the values for your environment:
//   cp ecosystem.config.template.js ecosystem.config.js
//   pm2 start ecosystem.config.js
module.exports = {
  apps: [
    {
      // Unique PM2 process name (e.g., game-hub)
      name: "game-hub",
      script: "./.output/server/index.mjs",
      // Absolute path to this project on the server. Must be the folder that
      // contains the .env file, since dotenv loads it from the working directory.
      cwd: "/media/azadmin/data/www/public/demos/game-hub",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 4003,
      },
    },
  ],
};

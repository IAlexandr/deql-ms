// eslint-disable-next-line
module.exports = {
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          modules: "./deql-ms-server/modules",
          tools: "./deql-ms-server/tools",
          project_server: "./server",
          project_modules: "./modules",
        }
      }
    ]
  ]
};

// eslint-disable-next-line
module.exports = {
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          modules: "./server/deql-ms-server/modules",
          tools: "./server/deql-ms-server/tools",
          project_server: "./server",
          project_modules: "./server/modules",
        }
      }
    ]
  ]
};

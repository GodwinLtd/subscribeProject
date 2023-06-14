const startupDebugger = require("debug")("app:startup");

const port = process.env.PORT || 8000;
module.exports = function (app) {
  app.listen(port, () => {
    startupDebugger(`listening to ${port}`);
  });
};

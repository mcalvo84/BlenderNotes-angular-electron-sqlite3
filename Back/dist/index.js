"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)(); // Settings

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
  console.log('Server on port', app.get('port'));
});
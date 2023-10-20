const { RESPONSE_TEXT, STATUS_CODES } = require("../utils/response");

exports.undefinedRoute = (req, res) => {
  console.log("Invalid Route accessed", req.originalUrl);
  res.status(STATUS_CODES.NOT_FOUND).json({
    statusCode: STATUS_CODES.NOT_FOUND,
    statusText: RESPONSE_TEXT.FAIL,
    errors: [
      { msg: `OOP! ${req.ip} you visited an invalid route or endpoint` },
    ],
  });
};

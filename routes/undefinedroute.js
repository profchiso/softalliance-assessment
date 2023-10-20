const { Router } = require("express");
const undefinedrouter = Router();
const { undefinedRoute } = require("../controllers/undefinedroute");

undefinedrouter.all("*", undefinedRoute);
module.exports = { undefinedrouter };

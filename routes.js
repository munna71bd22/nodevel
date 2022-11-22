const HomeController = require('./HomeController')
const Route = require('./RouteHandaler')

var routes = [
    Route.get("/", HomeController, "index"),
    Route.get("/about", HomeController, "about"),
    Route.get("/500", HomeController, "about2"),
    Route.post("/send-email", HomeController, "sendEmail"),
    Route.get("/get-email", HomeController, "getEmail"),
]
module.exports = {routes, HomeController}
class RouteHandaler {
    static get(name, controller, action) {
        return {
            "name": name,
            "method": "GET",
            "action": action,
            "controller": controller,
        }
    }


    static post(name, controller,action) {
        return {
            "name": name,
            "method": "POST",
            "action": action,
            "controller": controller,
        }
    }
    static put(name, controller,action) {
        return {
            "name": name,
            "method": "POST",
            "action": action,
            "controller": controller,
        }
    }
    static delete(name, controller,action) {
        return {
            "name": name,
            "method": "POST",
            "action": action,
            "controller": controller,
        }
    }
}

module.exports = RouteHandaler
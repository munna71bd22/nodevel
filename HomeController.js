const EmailModel = require('./EmailModel')
const PostMan = require('./PostMan')
const User = require('./User')

class HomeController {
    index() {
        return './index.html'
    }

    about() {
        return './about.html'
    }

    sendEmail(req, callback) {

        //PostMan.sendEmail(req)
        User.find(2, function (result) {
            let msg = "Email has been sent."
            let status = "sucess"
            return callback(result, {'status': status, 'message': msg})
        })
    }
}

module.exports = HomeController
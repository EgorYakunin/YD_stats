const { Mongo } = require('../../controllers/Db_controller')

class UsersSession{
    constructor(user_ip, url) {
        this.user_ip = user_ip
        this.url = url

        this.start_time = null
        this.end_time = null
        this.session_time = null

        this.cnv_array = []
        this.utm_array = []
        this.collectionName = 'yd-stats-test'
    }

    async add_user_to_DB(){
        const model = {
            user_ip: this.user_ip,
            start_time: this.start_time,
            end_time: this.end_time,
            session_time: this.session_time,
            cnv_array: this.cnv_array,
            utm_array: this.utm_array
        }
        await Mongo.write_one(this.collectionName, model)
    }

    async update_user_to_DB(){
        const filter = {end_time: null, user_ip: this.user_ip}
        let object = {}

        if (this.end_time){
            object.push(this.end_time)
        }
        if (this.session_time) {
            object.push(this.session_time)
        }
        if (this.cnv_array) {
            object.push(this.cnv_array)
        }
        if (this.utm_array) {
            object.push(this.utm_array)
        }

        await Mongo.update_one(this.collectionName, filter, object)
    }

    set_start_time() {
        this.start_time = Math.round(new Date() / 1000)
    }

    set_end_time() {
        this.end_time = Math.round(new Date() / 1000)
        this.session_time = this.end_time - this.start_time
    }
}

module.exports = UsersSession
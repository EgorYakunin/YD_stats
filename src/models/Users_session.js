class UsersSession{
    constructor() {
        this.user_ip = ''

        this.start_time = null
        this.end_time = null
        this.session_time = null

        this.cnv_array = []
        this.utm_array = []
    }


    set_start_time() {
        this.start_time = Math.round(new Date() / 1000)
    }

    set_end_time() {
        this.end_time = Math.round(new Date() / 1000)
        this.session_time = this.end_time - this.start_time
    }

    set_user_ip(user_ip) {
        this.user_ip = user_ip
    }
}

module.exports = UsersSession
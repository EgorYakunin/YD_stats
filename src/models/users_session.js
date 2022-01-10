function UsersSession(){
    this.id = new Date()
    this.start_time = null
    this.user_ip = null
    this.end_time = null
    this.session_time = null

    this.set_start_time = () => {
        this.start_time = new Date()
    }

    this.set_end_time = () => {
        this.end_time = new Date()
        this.session_time = this.end_time - this.start_time
    }

    this.set_user_ip = (user_ip) => {
        this.user_ip = user_ip
    }
}

module.exports = UsersSession
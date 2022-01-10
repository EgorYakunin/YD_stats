// factory function
createCircle = (radius) => {
    return {
        radius,
        draw: () => {
            console.log('draw')
        }
    }
}

const circle = createCircle(1)
// circle.draw()
// console.log(circle.radius)

// constructor function
function Circle(radius) {
    this.radius = radius
    this.draw = () => {
        console.log('draw')
    }
}

const another = new Circle(1)

function StopWatch() {
    let isWorking = false
    let duration = 0
    let startTime = 0

    this.start = () => {
        if (isWorking){
           throw new Error('StopWatch is already working :)')
        }
        isWorking = true

        startTime = new Date()
    }

    this.stop = () => {
        if (!isWorking){
            throw new Error('StopWatch is not started :)')
        }
        isWorking = false

        duration = new Date() - startTime
    }

    this.reset = () => {
        duration = 0
    }

    Object.defineProperty(this, 'duration', {
        get: function(){
            return duration
        }
    })
}

const sw = new StopWatch()

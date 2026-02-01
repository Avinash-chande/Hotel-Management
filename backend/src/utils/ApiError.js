class ApiErrors extends Error {
    constructor(
        statusCode,
        message ='something went wrong',
        errors = [],
        stack = ''
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if (stack) this.stack = stack;
        else {
            Error.captureStackTrace(this, this.constructor)
        }
        //where error happened
        // which file
        // which line
        // which function  we knew bu using stack

    }
}

export default ApiErrors
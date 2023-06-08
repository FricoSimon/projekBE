// Description: Response format for all API
const responseGet = (page, size, statuscode, message, data, res) => {
    res.status(statuscode).json({
        payload: {
            page: page,
            size: size,
            statuscode: statuscode,
            message: message,
            data: data
        },
    })
}

const responsePost = (statuscode, data, message, res) => {
    res.status(statuscode).json({
        payload: {
            statuscode: statuscode,
            data: data,
            message: message
        },
    })
}

module.exports = { responseGet, responsePost };
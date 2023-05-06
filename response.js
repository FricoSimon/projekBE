// Description: Response format for all API
const response = (statuscode, data, message, res) => {
    res.status(statuscode).json({
        payload: {
            statuscode: statuscode,
            data: data,
            message: message
        },
    })
}

module.exports = response;
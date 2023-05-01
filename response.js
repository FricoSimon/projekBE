// Description: Response format for all API
const response = (statuscode, datas, message, res) => {
    res.status(statuscode).json({
        payload: {
            statuscode: statuscode,
            datas: datas,
            message: message
        },
        pagination: {
            prev: "",
            next: "",
            max: ""
        },
    }
    )
}

module.exports = response;
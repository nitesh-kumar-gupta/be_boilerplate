'use strict';

module.exports = (res, err) => {
    return res.status(404).send({
        success: false,
        error: {
            code: err.code,
            trace: null,
            message: err.message
        }
    });
};

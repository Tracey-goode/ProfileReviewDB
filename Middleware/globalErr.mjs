export const globalError = (err, req, res, next) => {

    res.status(500 || err.status).json({
        message: err.message || "Something went wrong",
    });
};
export const globalError = (err, req, res, next) => {
    const status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

    res.status(status).json({
        message: err.message || "Something went wrong",
    });
};
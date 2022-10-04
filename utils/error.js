const catchAsync = func => {
	return async (req, res, next) => {
        try {
            await func(req, res)
        }
        catch(error){
            next(error);
        }
    }
}

const globalErrorHandler = (err, req, res, next) => {
	console.error(err.stack)

	err.statusCode = err.statusCode || 500;

	res.status(err.statusCode).json({ message: err.message })
}


module.exports = { catchAsync, globalErrorHandler }
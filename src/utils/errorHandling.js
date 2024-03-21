
export const asyncHandler = (API) => {
    return (req,res,next) => {
        return API(req,res,next).catch(error => {
            return next(error);
        })
    }
} 

export const globalErrorHandling = (error, req, res, next) => {
    return res.json({msgError :error.message, stack:error.stack})
}
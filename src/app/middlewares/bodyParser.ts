import AppError from '../errors/AppError'
import catchAsync from '../utils/catchAsync'

export const parseBody = catchAsync(async (req, res, next) => {
  if (!req.body.data) {
    throw new AppError(400, 'Please provide data in the body under data key')
  }

  // Parse JSON from form-data
  try {
    req.body = JSON.parse(req.body.data)
  } catch (error) {
    throw new AppError(400, 'Invalid JSON format in the data key')
  }

  next()
})

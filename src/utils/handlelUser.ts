import { Response } from 'express'
export const HttpError = (res: Response, error: string, status: number) => {
  res.status(status).json({ status, data: null, message: error })
}

const createErrorFactory = function (name: string) {
  return class BussinessError extends Error {
    constructor (message: string) {
      super(message)
      this.name = name
    }
  }
}

export const ValidateDataError = createErrorFactory('ValidationDataError')
export const ConnectionError = createErrorFactory('ConnectionError')

class ResponseHandler {
  constructor(statusCode, message, data, url) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.url = url;
  }

  sendResponse(res) {
    return res.status(this.statusCode).json({
      meta: {
        status: this.statusCode,
        total: this.data.length,
        url: this.url
      },
      message: this.message,
      data: this.data,
    });
  }
}

module.exports = ResponseHandler;
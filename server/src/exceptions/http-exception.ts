export class HttpException extends Error {
  status: number;
  furtherInformation: { [key: string]: any };

  constructor(status: number, message: string, furtherInformation: { [key: string]: any } = {}) {
    super(message);
    this.status = status;
    this.furtherInformation = furtherInformation;
  }
}

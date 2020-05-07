export class GeneralError extends Error {
  constructor(public code: number, public message: string,public name: string) {
    super();
  }
}

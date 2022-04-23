export class NotRemaningInstallmentsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotRemaningInstallmentsError';
  }
}

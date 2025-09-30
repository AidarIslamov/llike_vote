export function isSequelizeError(error: unknown): error is { name: string } {
  return error !== null && typeof error === 'object' && 'name' in error;
}
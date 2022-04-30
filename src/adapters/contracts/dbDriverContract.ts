export interface DBDriverContract<T> {
  getAll(): Promise<T[]>;
  getById(arg: any): Promise<T>;
  create(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
}

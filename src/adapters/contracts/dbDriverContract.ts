export interface DBDriverContract {
  getAll(): Promise<any[]>;
  getById(arg: any): Promise<any>;
  create(entity: any): Promise<any>;
  update(id: number, entity: any): Promise<any>;
}

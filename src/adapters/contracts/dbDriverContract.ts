export interface DBDriverContract<Serialize, Model> {
  getAll(): Promise<Serialize[]>;
  get(filter: object): Promise<Serialize>;
  create(entity: object): Promise<Serialize>;
  update(filter: object, entity: object): Promise<Serialize>;
}

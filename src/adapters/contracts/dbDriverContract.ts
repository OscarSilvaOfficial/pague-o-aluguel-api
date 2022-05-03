export interface DBDriverContract<Serialize, Model> {
  getAll(args: object | undefined): Promise<Serialize[]>;
  get(filter: object): Promise<Serialize>;
  create(entity: object, args: object | undefined): Promise<Serialize>;
  update(filter: object, entity: object): Promise<Serialize>;
}

import { DBDriverContract } from '@/adapters/contracts/dbDriverContract';

interface DBMethods {
  findMany: (args: object) => Promise<any[]>;
  findUnique: (filter: object) => Promise<any>;
  create: (entity: any) => Promise<any>;
  update: (args: object) => Promise<any>;
}

export class PrismaDB<Serilize, Model extends DBMethods>
  implements DBDriverContract<Serilize, Model>
{
  constructor(private readonly model: Model) {}

  async getAll(args: object = {}): Promise<Serilize[]> {
    return await this.model.findMany({
      ...args,
    });
  }

  async get(filter: object): Promise<Serilize> {
    return await this.model.findUnique({
      where: {
        filter,
      },
    });
  }

  async create(entity: object, args: object): Promise<Serilize> {
    return await this.model.create({
      data: entity,
      ...args,
    });
  }

  async update(filter: object, entity: object): Promise<Serilize> {
    return await this.model.update({
      where: {
        filter,
      },
      data: entity,
    });
  }
}

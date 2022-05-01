import { DBDriverContract } from '@/adapters/contracts/dbDriverContract';
import { PrismaClient } from '@prisma/client';

export class PrismaDB implements DBDriverContract {
  constructor(private readonly db: PrismaClient) {}

  async getAll(): Promise<any[]> {
    return await this.db.billing.findMany();
  }

  async getById(id: number): Promise<any> {
    return await this.db.billing.findUnique({
      where: {
        id,
      },
    });
  }

  create(entity: any): Promise<any> {
    return this.db.billing.create({
      data: entity,
    });
  }

  update(id: number, entity: any): Promise<any> {
    return this.db.billing.update({
      where: {
        id: id,
      },
      data: entity,
    });
  }
}

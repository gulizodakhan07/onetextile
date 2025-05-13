import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RawMaterial } from 'src/modules/raw-material/entities/raw-material.entity';
import { DyedYarn } from 'src/modules/dyed-yarn/entities/dyed-yarn.entity';
import { Receivable } from 'src/modules/receivable/entities/receivable.entity';
import { Payment } from 'src/modules/payment/entities/payment.entity';
import { In, Like, Repository } from 'typeorm';
@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(RawMaterial)
    private readonly rawMaterialRepository: Repository<RawMaterial>,
    @InjectRepository(DyedYarn)
    private readonly dyedYarnRepository: Repository<DyedYarn>,
    @InjectRepository(Receivable)
    private readonly receivableRepository: Repository<Receivable>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  // Barcha mahsulotlarni olish (filtrlar bilan)
  async getAllProducts(type?: string, name?: string, color?: string): Promise<any> {
    if (type === 'dyed') {
      const dyedYarnQB = this.dyedYarnRepository.createQueryBuilder('dyedYarn');
  
      if (color) {
        dyedYarnQB.andWhere('dyedYarn.color LIKE :color', { color: `%${color}%` });
      }
  
      if (name) {
        dyedYarnQB.andWhere('dyedYarn.yarnNumber LIKE :name', { name: `%${name}%` }); 
      }
  
      const dyedYarns = await dyedYarnQB.getMany();
      return { dyedYarns };
    }
  
    if (type === 'raw') {
      const rawMaterialQB = this.rawMaterialRepository.createQueryBuilder('rawMaterial');
  
      if (name) {
        rawMaterialQB.andWhere('rawMaterial.name LIKE :name', { name: `%${name}%` });
      }
  
      const rawMaterials = await rawMaterialQB.getMany();
      return { rawMaterials };
    }
  
    const rawMaterialQB = this.rawMaterialRepository.createQueryBuilder('rawMaterial');
    const dyedYarnQB = this.dyedYarnRepository.createQueryBuilder('dyedYarn');
  
    if (name) {
      rawMaterialQB.andWhere('rawMaterial.name LIKE :name', { name: `%${name}%` });
      dyedYarnQB.andWhere('dyedYarn.yarnNumber LIKE :name', { name: `%${name}%` });
    }
  
    if (color) {
      dyedYarnQB.andWhere('dyedYarn.color LIKE :color', { color: `%${color}%` });
    }
  
    const [rawMaterials, dyedYarns] = await Promise.all([
      rawMaterialQB.getMany(),
      dyedYarnQB.getMany(),
    ]);
  
    const rawMaterialFromDyedYarn = dyedYarns.map((dyedYarn) => dyedYarn.rawMaterials);
  
    return {
      rawMaterials,
      dyedYarns,
      rawMaterialFromDyedYarn,
    };
  }
  
  // Mahsulotning kirim-chiqim tarixini olish
  async getProductMovement(supplier: string): Promise<any> {
    const receivables = await this.receivableRepository.find({
      where: { supplier: supplier },
    });

    const payments = await this.paymentRepository.find({
      where: { transactionId: In(receivables.map((receivable) => receivable.supplier)) },
    });

    return {
      receivables,
      payments,
    };
  }
}

//   // Mahsulotning kirim-chiqim tarixini olish
//   async getProductMovement(supplier: string): Promise<any> {
//     // Receivable entitizida supplierni izlash
//     const receivables = await this.receivableRepository.find({
//       where: { supplier: supplier },
//     });

//     // Payment entitizida supplierni izlash (agar kerak bo'lsa)
//     const payments = await this.paymentRepository.find({
//       where: { transactionId: In(receivables.map((receivable) => receivable.supplier)) },
//     });

//     return {
//       receivables,
//       payments,
//     };
//   }
// }





// async getProductMovement(supplier: string): Promise<any> {
//     // Receivable entitizida supplierni izlash
//     const receivables = await this.receivableRepository.find({
//       where: { supplier: supplier },
//     });

//     // Payment entitizida supplierni izlash (agar kerak bo'lsa)
//     const payments = await this.paymentRepository.find({
//       where: { transactionId: In(receivables.map((receivable) => receivable.supplier)) },
//     });

//     return {
//       receivables,
//       payments,
//     };
//   }
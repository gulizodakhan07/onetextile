// invoice-item.entity.ts
import { DyedYarn } from 'src/modules/dyed-yarn/entities/dyed-yarn.entity';
import { Invoice } from 'src/modules/invoice/entities/invoice.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InvoiceItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.invoiceItemsId, { onDelete: 'CASCADE',nullable: true })
  @JoinColumn({ name: 'invoiceId' })
  invoice: Invoice;

  @ManyToOne(() => DyedYarn, {onDelete: 'CASCADE',cascade:true, eager: true })
  @JoinColumn({ name: 'dyedYarnId' })
  dyedYarn: DyedYarn;

  @Column('float')
  quantity: number;

  @Column('float')
  unitPrice: number;

  @Column('float')
  totalPrice: number;
}

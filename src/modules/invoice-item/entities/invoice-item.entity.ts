// invoice-item.entity.ts
import { DyedYarn } from 'src/modules/dyed-yarn/entities/dyed-yarn.entity';
import { Invoice } from 'src/modules/invoice/entities/invoice.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InvoiceItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.invoiceItemsId, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'invoiceId' })
  invoiceId: Invoice;

  @ManyToOne(() => DyedYarn, { eager: true })
  @JoinColumn({ name: 'dyedYarnId' })
  dyedYarnId: DyedYarn;

  @Column('float')
  quantity: number;

  @Column('float')
  unitPrice: number;

  @Column('float')
  totalPrice: number;
}

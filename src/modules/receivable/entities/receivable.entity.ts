import { PaymentStatus } from 'src/modules/invoice/entities/invoice.entity';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'receivable' })
export class Receivable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar',name:'supplier' })
  supplier: string; 

  @Column({ type: 'text',name: 'description' })
  description: string; 

  @Column({ type: 'decimal',name: 'amount',precision: 14,scale:2})
  amount: number;

  @Column({ type: 'date',name: 'dueDate' })
  dueDate: Date; 

  @Column({ type: 'date', nullable: true,name: 'paymentDate' })
  paymentDate: Date; 

  @Column({ type: 'enum',enum: PaymentStatus,name: 'paymentStatus'})
  paymentStatus: PaymentStatus;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

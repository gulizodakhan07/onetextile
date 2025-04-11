import { Currency } from 'src/modules/currency/entities/currency.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'exchange_rate' })
export class ExchangeRate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Currency, (currency) => currency.history, { onDelete: 'CASCADE' })
  currency: Currency;

  @Column('decimal', { precision: 10, scale: 4 })
  rate: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}

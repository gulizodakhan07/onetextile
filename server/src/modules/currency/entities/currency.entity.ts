import { ExchangeRate } from 'src/modules/exchange-rate/entities/exchange-rate.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
export enum CurrencyType {
    UZS = 'UZS',
    USD = 'USD',
    RUB = 'RUB',
  }
  @Entity({ name: 'currency' })
  export class Currency {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ 
      type: "enum",
      enum: CurrencyType,
      name: "code",
      default: CurrencyType.UZS
    })
    code: CurrencyType;
  
    @Column({ 
      type: 'decimal', 
      name: 'decimal', 
      precision: 10, 
      scale: 4 
    })
    currentRate: number;
  
    @Column({ 
      type: 'timestamp', 
      name: 'updatedAt', 
      default: () => 'CURRENT_TIMESTAMP(6)', 
      onUpdate: 'CURRENT_TIMESTAMP(6)' 
    })
    updatedAt: Date;
  
    @OneToMany(() => ExchangeRate, (rate) => rate.currency, { cascade: true })
    history: ExchangeRate[];
  }
  
import { Currency } from "src/modules/currency/entities/currency.entity";
import { PaymentMethodStatus } from "src/utils/paymentMethod.enum";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'payment' })
export class Payment {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'date', name: 'paymentDate' })
    paymentDate: Date

    @Column({ type: 'decimal', name: 'amount', precision: 12, scale: 2 })
    amount: number

    @Column({ type: 'enum', enum: PaymentMethodStatus, name: 'paymentMethod', default: PaymentMethodStatus.NAQD })
    paymentMethod: PaymentMethodStatus

    @Column({ type: 'varchar', name: 'transactionId' })
    transactionId: string

    @Column({ type: 'varchar', name: 'notes' })
    notes: string

    @ManyToOne(() => Currency, (currency) => currency.history)  // Linking Payment to Currency
    currency: Currency;

    @Column({ type: 'decimal', name: 'exchangeRateAtPayment', precision: 10, scale: 4, default: 0 })
    exchangeRateAtPayment: number; // To'lov vaqtida kurs

    @CreateDateColumn({
        type: 'timestamp',
        name: 'createdAt',
        default: () => 'CURRENT_TIMESTAMP(6)'
    })
    createdAt: Date

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updatedAt',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)'
    })
    updatedAt: Date
}

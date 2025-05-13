import { Client } from "src/modules/client/entities/client.entity";
import { InvoiceItem } from "src/modules/invoice-item/entities/invoice-item.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum StatusEnum {
    NEW = "Yangi",
    APPROVED = "Tasdiqlangan",
    CANCELED = "Bekor qilingan"
}

export enum PaymentStatus {
    PAID = "Tolangan",
    UNPAID = "Tolanmagan",
    PARTIALLY_PAID = "Qisman tolangan"
}
@Entity({ name: 'invoice' })
export class Invoice {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", name: "invoiceNumber" })
    invoiceNumber: string

    @Column({ type: "date", name: "invoiceDate" })
    invoiceDate: Date

    @Column({ type: "int", name: "totalAmount",nullable:true })
    totalAmount: number

    @Column({ type: "float", name: "discount",default:0 })
    discount: number

    @Column({ type: 'enum', enum: ['amount', 'percent'], default: 'amount' })
    discountType: 'amount' | 'percent';

    @Column({ type: "float", name: "finalAmount",nullable:true })
    finalAmount: number

    @Column({ type: "float", name: "paidAmount",default:0 })
    paidAmount: number

    @Column({ type: "float", name: "remainingDebt",nullable:true })
    remainingDebt: number

    @Column({ type: "enum", enum: StatusEnum, name: "status", default: StatusEnum.NEW })
    status: StatusEnum

    @Column({ type: "enum", enum: PaymentStatus, name: "paymentStatus", default: PaymentStatus.UNPAID })
    paymentStatus: PaymentStatus

    @CreateDateColumn({
        type: "timestamp",
        name: "createdAt",
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    createdAt: Date

    @UpdateDateColumn({
        type: "timestamp",
        name: "updatedAt",
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    updatedAt: Date



    @OneToMany(() => InvoiceItem, (item) => item.invoice, { cascade: true, eager: true })
    invoiceItemsId: InvoiceItem[];

    @ManyToOne(() => Client)
    clientId: Client;
}
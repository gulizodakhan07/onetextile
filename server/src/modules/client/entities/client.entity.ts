import { Invoice } from "src/modules/invoice/entities/invoice.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'client'})
export class Client {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar',name: 'firstName'})
    firstName: string

    @Column({type: 'varchar',name: 'lastName'})
    lastName: string

    @Column({type: 'varchar',name: 'phoneNumber'})
    phoneNumber: string

    @Column({type: 'varchar',name: 'address'})
    address: string

    @Column({type:'varchar',name: 'companyName',nullable: true})
    companyName: string

    @Column({type: 'varchar',name: 'tin',nullable: true})
    tin: string

    @Column({type: 'varchar',name: 'email'})
    email: string

    @CreateDateColumn({
        type: 'timestamp',
        name: 'createdAt',
        default: ()=> 'CURRENT_TIMESTAMP(6)'
    })
    createdAt: Date

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updatedAt',
        default: ()=> 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)'
    })
    updatedAt: Date

    @OneToMany(() => Invoice, (invoice) => invoice.clientId, { cascade: true, eager: true })
    invoice: Invoice[];

}

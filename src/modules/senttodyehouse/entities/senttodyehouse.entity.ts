import { DyHouse } from "src/modules/dy-house/entities/dy-house.entity";
import { RawMaterial } from "src/modules/raw-material/entities/raw-material.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'SentToDyeHouse'})
export class Senttodyehouse {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:'int',name: 'quantity'})
    quantity: number

    @Column({ type: 'int', name: 'count',nullable:true })
    count: number;

    @Column({type: 'date',name: 'sentDate'})
    sentDate: Date

    @Column({
        type: 'enum',
        name: 'status',
        enum: ['Yuborildi','Jarayonda','Qabul qilindi'],
        default: 'Jarayonda'
    })
    status: ['Yuborildi','Jarayonda','Qabul qilindi']

    @Column({type:'varchar',name: 'notes'})
    notes: string


    @ManyToOne(() => RawMaterial)
    rawMaterials: RawMaterial;
    
    
    @ManyToOne(() => DyHouse)
    dyeHouse: DyHouse;


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
}

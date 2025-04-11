import { DyedYarn } from "src/modules/dyed-yarn/entities/dyed-yarn.entity";
import { Senttodyehouse } from "src/modules/senttodyehouse/entities/senttodyehouse.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'RawMAterial'})
export class RawMaterial {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar',name: 'name'})
    name: string

    @Column({type: 'int',name: 'quantity'})
    quantity: number

    @Column({type:'date',name: 'arrivalDate'})
    arrivalDate: Date

    @Column({type: 'varchar',name:'supplier'})
    supplier: string

    @Column({type: 'varchar',name: 'batchNumber'})
    batchNumber: string


    @OneToMany(() => Senttodyehouse, (item) => item.rawMaterials, { cascade: true, eager: true })
    sentToDyeHouse: Senttodyehouse[];

    
    @OneToMany(() => DyedYarn, (item) => item.rawMaterials, { cascade: true, eager: true })
    dyedYarn: DyedYarn[];
    
    @CreateDateColumn({
        name: 'createdAt',
        type:'timestamp',
        default: ()=> 'CURRENT_TIMESTAMP(6)'
    })
    createdAt: Date

    @UpdateDateColumn({
        name: 'updatedAt',
        type: 'timestamp',
        default: ()=> 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)'
    })
    updatedAt: Date

}

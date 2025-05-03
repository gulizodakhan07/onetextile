import { DyedYarn } from "src/modules/dyed-yarn/entities/dyed-yarn.entity";
import { Senttodyehouse } from "src/modules/senttodyehouse/entities/senttodyehouse.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'dyehouse'})
export class DyHouse {
    @PrimaryGeneratedColumn()
    id: number

    @Column({name: 'name',type:'varchar'})
    name: string

    @Column({type:'varchar',name: 'contactPerson'})
    contactPerson: string

    @Column({type: 'varchar',name: 'phoneNumber'})
    phoneNumber: string

    @Column({type: 'varchar',name: 'address'})
    address: string
    
    @OneToMany(() => Senttodyehouse, (item) => item.dyeHouse, { cascade: true, eager: true })
    sentToDyeHouse: Senttodyehouse[];

    @OneToMany(() => DyedYarn, (item) => item.dyeHouse, { cascade: true, eager: true,onDelete: 'CASCADE' })
    dyedYarn: DyedYarn[];

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
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date
}


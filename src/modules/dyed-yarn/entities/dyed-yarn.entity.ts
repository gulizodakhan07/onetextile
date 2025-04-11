import { DyHouse } from "src/modules/dy-house/entities/dy-house.entity";
import { RawMaterial } from "src/modules/raw-material/entities/raw-material.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'dyedYarn'})
export class DyedYarn {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar',name: 'color' })
    color: string

    @Column({type: 'varchar',name: 'colorCode'})
    colorCode: string

    @Column({type: 'varchar',name: 'yarnNumber'})
    yarnNumber: string

    @Column({type: 'int',name:'packageQuantity'})
    packageQuantity: number

    @Column({type:'float',name: 'weight'})
    weight: number

    @Column({type:'date',name: 'dyingDate'})
    dyingDate: Date

    @Column({type: 'date',name:'returnedDate'})
    returnedDate: Date

    @Column({type: 'boolean',name: 'isactive',default: true})
    isActive: boolean

    @ManyToOne(() => RawMaterial)
    rawMaterials: RawMaterial;
    
    @ManyToOne(() => DyHouse,{onDelete: 'CASCADE'})
    dyeHouse: DyHouse;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'createdAt',
        default:()=> 'CURRENT_TIMESTAMP(6)'
    })
    createdAt: Date

    @UpdateDateColumn({
        type:'timestamp',
        name: 'updatedAt',
        default:()=> 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)'
    })
    updatedAt: Date
}

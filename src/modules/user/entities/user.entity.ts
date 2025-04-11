import { UserRoles } from "src/utils/user-role.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({name: 'username',type: 'varchar',nullable: true})
    username: string

    @Column({name:'password',type: 'varchar',nullable: true,unique: true})
    password: string

    @Column({name: 'email',type: 'varchar',unique: true,nullable: true})
    email: string

    @Column({
        name: 'role',
        type: 'enum',
        enum: UserRoles,
        default: UserRoles.OPERATOR
    })
    role: UserRoles

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        default: ()=> 'CURRENT_TIMESTAMP(6)'
    })
    createdAt: Date 
    
    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: ()=> 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)'
    })
    updatedAt: Date
}

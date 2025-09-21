import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('customer')
export class Customer {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    lastName: string;

    @Column('text')
    middleName: string;

    @Column('text', { unique: true })
    email: string;

    @Column('date')
    birthDate: Date;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column('text')
    password: string;

}

import {
    AllowNull,
    AutoIncrement,
    Column,
    CreatedAt,
    DeletedAt, IsNull,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt
} from "sequelize-typescript";

@Table({tableName: 'users'})
export class Users extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @Column
    name: string

    @AllowNull(true)
    @Column
    email: string

    @Column
    username: string

    @Column
    password: string

    @AllowNull(true)
    @Column
    email_verified_at: Date

    @AllowNull(true)
    @Column
    last_login_at: Date

    @CreatedAt
    created_at: Date

    @UpdatedAt
    updated_at: Date

    @DeletedAt
    deleted_at: Date
}

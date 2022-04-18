import { Sequelize } from "sequelize-typescript";
import { Users } from "../users/users.entity";

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: 'otto.db.elephantsql.com',
                port: 5432,
                username: 'txyjxmge',
                password: 'KKckXyUP1s0PTKJQXsbERDQSHv5QgKxn',
                database: 'txyjxmge',
            });
            sequelize.addModels([
                Users
            ])
            await sequelize.sync()
            return sequelize;
        },
    },
];

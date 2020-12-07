import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'task-management',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
    autoLoadEntities: true,
    retryAttempts: 10,
    retryDelay: 2000,
    cache: {
        duration: 600000, //in ms 10 minutes
    },
    logging: 'all',
};

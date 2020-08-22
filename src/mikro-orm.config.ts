import path from 'path'

import { MikroORM } from '@mikro-orm/core'

import { Post } from "./entities/Post";
import { __prod__ } from "./constants";

export default {
    migrations: {
        path: path.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/
    },
    entities: [Post],
    dbName: 'reddit',   
    type: 'postgresql',
    user: 'postgres',
    password: 'postgres',
    port: 5432,
    debug: !__prod__
} as Parameters<typeof MikroORM.init>[0]
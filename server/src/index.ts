import 'reflect-metadata'

import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

import Redis from 'ioredis'
import session from 'express-session'
import connectRedis from 'connect-redis'

import { __prod__, COOKIE_NAME } from './constants'
import { PostResolver } from './resolvers/post'
import { UserResolver } from './resolvers/user'

import cors from 'cors'
import { createConnection } from 'typeorm'
import { User } from './entities/User'
import { Post } from './entities/Post'

// import { sendEmail } from './utils/sendEmail'

const main = async () => {
    const connection = await createConnection({
        type: 'postgres',
        database: 'reddit2',
        username: 'postgres',
        password: 'postgres',
        logging: true,
        synchronize: true,
        entities: [Post, User]
    })

    const app = express()

    const RedisStore = connectRedis(session)
    const redis = new Redis()

    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }))
    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({
                client: redis,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                secure: __prod__, // if true then cookie only works in https
                sameSite: 'lax',
            },
            saveUninitialized: false,
            secret: 'isjiofgjdogjdif',
            resave: false
        })
    )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver, UserResolver],
            validate: false
        }),
        context: ({ req, res }) => ({ req, res, redis })
    })

    apolloServer.applyMiddleware({
        app,
        cors: false
    })

    app.listen(4000, () => {
        console.log('server started on localhost:4000')
    })
}

main().catch(err => {
    console.error(err)
})

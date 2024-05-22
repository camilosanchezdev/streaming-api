import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient()
async function main() {

    const admin_role = await prisma.role.create({
        data: {
            name: 'Administrador'
        }
    })
    const user_role = await prisma.role.create({
        data: {
            name: 'Usuario Regular'
        }
    })

    try {
        const password = '123'
        const passwordHash = await bcrypt.hash(password, 12);
        await prisma.user.create({
            data: {
                email: 'admin@admin.com',
                password: passwordHash,
                role: {
                    connect: {
                        id: admin_role.id
                    }
                }
            }
        })
    } catch (error) {

    }

    try {
        const password = '123'
        const passwordHash = await bcrypt.hash(password, 12);
        await prisma.user.create({
            data: {
                email: 'user@user.com',
                password: passwordHash,
                role: {
                    connect: {
                        id: user_role.id
                    }
                }
            }
        })
    } catch (error) {

    }
    await prisma.movie.create({
        data: {
            title: 'A New Hope',
            release_date: '1977-05-25',
            producer: 'Gary Kurtz, Rick McCallum',
            url: 'https://swapi.dev/api/films/1/'
        }
    })
    await prisma.movie.create({
        data: {
            title: 'The Empire Strikes Back',
            release_date: '1980-05-17',
            producer: 'Gary Kurtz, Rick McCallum',
            url: 'https://swapi.dev/api/films/2/'
        }
    })
    await prisma.movie.create({
        data: {
            title: 'Return of the Jedi',
            release_date: '1983-05-25',
            producer: 'Howard G. Kazanjian, George Lucas, Rick McCallum',
            url: 'https://swapi.dev/api/films/3/'
        }
    })
    await prisma.movie.create({
        data: {
            title: 'The Phantom Menace',
            release_date: '1999-05-19',
            producer: 'Rick McCallum',
            url: 'https://swapi.dev/api/films/4/'
        }
    })
    await prisma.movie.create({
        data: {
            title: 'Attack of the Clones',
            release_date: '2002-05-16',
            producer: 'Rick McCallum',
            url: 'https://swapi.dev/api/films/5/'
        }
    })
    await prisma.movie.create({
        data: {
            title: 'Revenge of the Sith',
            release_date: '2005-05-19',
            producer: 'Rick McCallum',
            url: 'https://swapi.dev/api/films/6/'
        }
    })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { createpostInput } from "@yj_05/medium-common";

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string
        JWT_SECRET: string
	},
    Variables: {
        userId: string;
    }
}>();

blogRouter.use('/*', async (c, next) => {   
    try{
        const header = c.req.header("Authorization") || "" ;
        const user = await verify(header, c.env.JWT_SECRET);
        if(user){
            c.set("userId", user.id as string);
            await next();
        }else{
        c.status(403);
        return c.json({ error: "unauthorized" })
        }
    }catch(e){
        console.log(e);
    }
  })

  blogRouter.get('/bulk', async (c) => {
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        const post = await prisma.post.findMany({
            select:{
                content: true,
                title: true,
                id: true,
                author:{
                    select:{
                        name: true
                    }
                }
            }
        })
        return c.json({
            post
        })
    }catch(e){
        console.log(e);
        c.status(411);
        return c.json({
            error: "Error while fetching posts. "
        })
    }
  })
  
  blogRouter.get('/:id', async (c) => {
    const bid = c.req.param('id') as string;
    console.log(`Received post id: ${bid}`);

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const post = await prisma.post.findFirst({
            where: {
                id: bid,
            },
            select: {
                id: true,
                content: true,
                title: true,
                author: {
                    select:{name: true}
                }
            }
        });

        if (post) {
            return c.json({ post });
        } else {
            console.log(`No post found with id: ${bid}`);
            c.status(404);
            return c.json({ error: "Post not found" });
        }
    } catch (e) {
        console.error(`Error while finding post with id ${bid}:`, e);
        c.status(500);
        return c.json({ error: "Error while finding post" });
    }
  })
  


blogRouter.post('/', async (c) => {
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        const body = await c.req.json();
        const { success } = createpostInput.safeParse(body);
        if(!success){
            c.status(411);
            return c.json({
                message:"Inputs are not correct. "
            })
        }
        const authorID = c.get("userId")
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorID
            }
        })
        return c.json({
            message: "Post created succesfully.",
            id: post.id
        })
    }catch(e){
        console.log(e);
        c.status(401);
        return c.json({
            error: "Error while posting. "
        })
    }
  })
  
blogRouter.put('/', async (c) => {
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        const body = await c.req.json();
        const { success } = createpostInput.safeParse(body);
        if(!success){
            c.status(411);
            return c.json({
                message:"Inputs are not correct. "
            })
        }
        const post = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
        return c.json({
            message: "Post Updated succesfully.",
            id: post.id
        })
    }catch(e){
        console.log(e);
        c.status(401);
        return c.json({
            error: "Error while updating. "
        })
    }
  })


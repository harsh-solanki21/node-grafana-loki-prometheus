import { Request, Response } from "express";
import { prisma } from "../app";
import logger from "../configs/logger";

export class PostController {
  async listPosts(_: Request, res: Response) {
    try {
      const posts = await prisma.post.findMany({
        include: {
          comments: true,
        },
      });
      res.status(200).json(posts);
    } catch (error: any) {
      logger.error("Error listing posts", { error: error.message });
      throw new Error(error);
    }
  }

  async getPostById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const post = await prisma.post.findUnique({
        where: { id: Number(id) },
        include: { comments: true },
      });
      if (!post) {
        throw new Error("Post not found");
      }
      res.status(200).json(post);
    } catch (error: any) {
      logger.error("Error getting a post", { error: error.message });
      throw new Error(error);
    }
  }

  async createPost(req: Request, res: Response) {
    try {
      const { title, content } = req.body;
      const post = await prisma.post.create({
        data: {
          title,
          content,
        },
      });
      res.status(200).json(post);
    } catch (error: any) {
      logger.error("Error creating post", { error: error.message });
      throw new Error(error);
    }
  }

  async updatePost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const post = await prisma.post.update({
        where: { id: Number(id) },
        data: { title, content },
      });
      res.status(200).json(post);
    } catch (error: any) {
      logger.error("Error updating post", { error: error.message });
      throw new Error(error);
    }
  }

  async likePost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const post = await prisma.post.update({
        where: { id: Number(id) },
        data: {
          likesCount: {
            increment: 1,
          },
        },
      });
      res.status(200).json(post);
    } catch (error: any) {
      logger.error("Error liking a post", { error: error.message });
      throw new Error(error);
    }
  }

  async deletePost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.$transaction([
        prisma.post.delete({
          where: { id: Number(id) },
        }),
        prisma.comment.deleteMany({
          where: { postId: Number(id) },
        }),
      ]);
      res.status(200).json({ message: "Post and comments deleted" });
    } catch (error: any) {
      logger.error("Error deleting post", { error: error.message });
      throw new Error(error);
    }
  }
}

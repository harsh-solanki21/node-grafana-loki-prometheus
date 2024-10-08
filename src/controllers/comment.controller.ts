import { Request, Response } from "express";
import { prisma } from "../app";
import logger from "../configs/logger";

export class CommentController {
  async listComments(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const comments = await prisma.comment.findMany({
        where: postId ? { postId: Number(postId) } : undefined,
        include: { post: true },
      });
      res.status(200).json(comments);
    } catch (error: any) {
      logger.error("Error listing comments", { error: error.message });
      res.status(404).json({ error: "Something went wrong!" });
    }
  }

  async getCommentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const comment = await prisma.comment.findUnique({
        where: { id: Number(id) },
        include: { post: true },
      });
      if (!comment) {
        throw new Error("Comment not found");
      }
      res.status(200).json(comment);
    } catch (error: any) {
      logger.error("Error getting a comment", { error: error.message });
      res.status(404).json({ error: "Something went wrong!" });
    }
  }

  async createComment(req: Request, res: Response) {
    try {
      const { content, postId } = req.body;
      const comment = await prisma.comment.create({
        data: {
          content,
          postId: Number(postId),
        },
      });
      res.status(200).json(comment);
    } catch (error: any) {
      logger.error("Error creating comment", { error: error.message });
      res.status(404).json({ error: "Something went wrong!" });
    }
  }

  async updateComment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const comment = await prisma.comment.update({
        where: { id: Number(id) },
        data: { content },
      });
      res.status(200).json(comment);
    } catch (error: any) {
      logger.error("Error updating comment", { error: error.message });
      res.status(404).json({ error: "Something went wrong!" });
    }
  }

  async deleteComment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.comment.delete({
        where: { id: Number(id) },
      });
      res.status(200).json({ message: "Comment deleted" });
    } catch (error: any) {
      logger.error("Error deleting comment", { error: error.message });
      res.status(404).json({ error: "Something went wrong!" });
    }
  }
}

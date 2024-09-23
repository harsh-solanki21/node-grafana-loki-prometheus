import express from "express";
import { CommentController } from "../controllers/comment.controller";

const router = express.Router();
const commentController = new CommentController();

router.get("/list", commentController.listComments);

router.get("/:id", commentController.getCommentById);

router.post("/create", commentController.createComment);

router.put("/update/:id", commentController.updateComment);

router.delete("/delete/:id", commentController.deleteComment);

export default router;

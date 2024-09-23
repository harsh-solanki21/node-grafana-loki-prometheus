import express from "express";
import { PostController } from "../controllers/post.controller";

const router = express.Router();
const postController = new PostController();

router.get("/list", postController.listPosts);

router.get("/:id", postController.getPostById);

router.post("/create", postController.createPost);

router.put("/update/:id", postController.updatePost);

router.put("/like/:id", postController.likePost);

router.delete("/delete/:id", postController.deletePost);

export default router;

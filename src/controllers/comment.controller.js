const commentModel = require('../models/comment.model');
const response = require('../../helpers/formResponse');
const { v4: uuidv4 } = require('uuid');

const commentController = {
  get: async (req, res) => {
    try {
      const result = await commentModel.get();
      return response(res, 200, result);
    } catch (error) {
      return response(res, 500, error.message);
    }
  },
  getContentComment: async (req, res) => {
    try {
      const result = await commentModel.getContentComment();
      return response(res, 200, result);
    } catch (error) {
      return response(res, 500, error.message);
    }
  },
  getDetail: async (req, res) => {
    try {
      const payload = { id: req.params.id };
      const result = await commentModel.getDetail(payload);
      if (result != null) {
        return response(res, 200, result);
      } else {
        return response(res, 404, 'Sorry data not found please check your input ID');
      }
    } catch (error) {
      return response(res, 500);
    }
  },
  add: async (req, res) => {
    try {
      const payload = {
        id: uuidv4(),
        postId: req.body.postId,
        userId: req.body.userId,
        comment: req.body.comment,
      };
      const result = await commentModel.add(payload);
      return response(res, 201, result);
    } catch (error) {
      return response(res, 500);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { postId, userId, comment } = req.body;

      const prevComment = await commentModel.getDetail({ id });

      // Gunakan nilai yang baru jika tidak falsy (bukan null atau undefined),
      // jika falsy, gunakan nilai yang sebelumnya
      const updatedPostId = postId || prevComment.postid;
      const updatedUserId = userId || prevComment.userid;
      const updatedComment= comment || prevComment.comment;
      // console.log(updatedPostId)
      const result = await commentModel.update({ id, postId: updatedPostId, userId: updatedUserId, comment: updatedComment });
      return response(res, 201, result);
    } catch (error) {
      return response(res, 500);
    }
  },
  remove: async (req, res) => {
    try {
      const payload = {
        id: req.params.id,
      };
      result = await commentModel.remove(payload);
      return response(res, 200, result);
    } catch (error) {
      return response(res, 500);
    }
  },
  // getByContentId: async (req, res) => {
  //   try {
  //     const { contentId } = req.params;
  //     const comments = await commentModel.getByContentId(contentId);
  //     return response(res, 200, comments);
  //   } catch (error) {
  //     return response(res, 500, error.message);
  //   }
  // },
};

module.exports = commentController;

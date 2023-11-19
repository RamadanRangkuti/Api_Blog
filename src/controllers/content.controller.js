const contentModel = require('../models/content.model');
const response = require('../../helpers/formResponse');
const { v4: uuidv4 } = require('uuid');

const contentController = {
  get: async (req, res) => {
    try {
      const result = await contentModel.get();
      return response(res, 200, result);
    } catch (error) {
      return response(res, 500, error.message);
    }
  },
  getDetail: async (req, res) => {
    try {
      const payload = { id: req.params.id };
      const result = await contentModel.getDetail(payload);
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
        title: req.body.title,
        article: req.body.article,
        userId: req.body.userId,
      };
      const result = await contentModel.add(payload);
      return response(res, 201, result);
    } catch (error) {
      return response(res, 500);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, article, userId } = req.body;

      const prevContent = await contentModel.getDetail({ id });
      console.log(prevContent);

      // Gunakan nilai yang baru jika tidak falsy (bukan null atau undefined),
      // jika falsy, gunakan nilai yang sebelumnya
      const updatedTitle = title || prevContent.title;
      const updatedArticle = article || prevContent.article;
      const updateduserId = userId || prevContent.userId;

      const result = await contentModel.update({ id, title: updatedTitle, article: updatedArticle, userId: updateduserId });
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
      result = await contentModel.remove(payload);
      return response(res, 200, result);
    } catch (error) {
      return response(res, 500);
    }
  },
};

module.exports = contentController;

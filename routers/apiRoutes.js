const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const multer = require('multer');

// Cấu hình multer
const storage = multer.diskStorage({
    destination: './views/public/images/',
    filename: (req, file, cb) => {
        cb(null, 'story-' + Date.now() + require('path').extname(file.originalname));
    }
});
const upload = multer({ storage });

const authMiddleware = (req, res, next) => {
    if (!req.session.user) return res.status(401).json({ error: 'Unauthorized' });
    next();
};

// Story routes
router.get('/stories', apiController.getStories);
router.get('/storiesbyuser', authMiddleware, apiController.getAllStoryByUserId);
router.get('/story/:id', apiController.getStory);
router.put('/story/:id', apiController.updateStory);
router.get('/stories/search', apiController.getStoryByTitle);
router.post('/story/new', authMiddleware, upload.single('thumbnail'), apiController.createStory);
router.post('/chapter/new', authMiddleware, apiController.createChapter);
router.get('/chapter/:id', apiController.getChapter);
router.get('/chapters/max', apiController.getMaxPageChapter);
// User routes
router.post('/register', apiController.register);
router.post('/login', apiController.login);
router.post('/logout', authMiddleware, apiController.logout);


module.exports = router;
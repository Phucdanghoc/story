const db = require('../configs/mysqlConnect');
const { get } = require('../routers/htmlRoutes');

const Chapter = {
    getByStoryId: (storyId, callback) => {
        console.log(storyId);
        const sql = `
            SELECT * FROM chapters 
            WHERE story_id = ? 
            ORDER BY chapter_number
            ASC 
        `;
        db.query(sql, [storyId], callback);
    },
    getById: (id, callback) => {
        const sql = `SELECT * FROM chapters
         WHERE id = ?`;
        db.query(sql, [id], callback);
    },
    create: (chapterData, callback) => {
        const sql = `
            INSERT INTO chapters (story_id, title, content, chapter_number) 
            VALUES (?, ?, ?, ?)
        `;
        console.log(chapterData);
        
        db.query(sql, [
            chapterData.storyId,
            chapterData.title,
            chapterData.content,
            chapterData.chapter_number || 1
        ], callback);
    }, 
    getChapterNumber : (storyId, callback) => {
        const sql = `
            SELECT MAX(chapter_number) AS maxChapterNumber 
            FROM chapters 
            WHERE story_id = ?
        `;
        db.query(sql, [storyId], callback);
    }   
};

module.exports = Chapter;
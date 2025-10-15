'use strict'

Object.defineProperty(exports, '__esModule', {
    value: true,
})
exports.createCommentObject = createCommentObject
exports.likeComment = likeComment

var _utils = require('./utils.js')

// Функция для создания объекта комментария
function createCommentObject(name, text) {
    var formattedDate = (0, _utils.formatDate)(new Date())
    return {
        name: (0, _utils.sanitizeHtml)(name),
        date: formattedDate,
        text: (0, _utils.sanitizeHtml)(text),
        likes: 0,
        isLiked: false,
    }
} // Функция лайка комментария

function likeComment(comments, index) {
    if (comments[index].isLiked === false) {
        comments[index].likes++
        comments[index].isLiked = true
    } else {
        comments[index].likes--
        comments[index].isLiked = false
    }
}

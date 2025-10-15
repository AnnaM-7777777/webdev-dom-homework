'use strict'

Object.defineProperty(exports, '__esModule', {
    value: true,
})
exports.renderComments = renderComments

var _utils = require('./utils.js')

function renderComments(comments, commentsList) {
    commentsList.innerHTML = ''
    comments.forEach(function (comment, index) {
        var commentElement = document.createElement('li')
        commentElement.classList.add('comment')
        commentElement.dataset.commentIndex = index
        var commentHeaderDiv = document.createElement('div')
        commentHeaderDiv.classList.add('comment-header')
        commentHeaderDiv.innerHTML = '<div>'
            .concat((0, _utils.sanitizeHtml)(comment.name), '</div><div>')
            .concat(comment.date, '</div>')
        var commentTextDiv = document.createElement('div')
        commentTextDiv.classList.add('comment-text')
        commentTextDiv.textContent = (0, _utils.sanitizeHtml)(comment.text) // Используем textContent

        var commentBodyDiv = document.createElement('div')
        commentBodyDiv.classList.add('comment-body')
        commentBodyDiv.appendChild(commentTextDiv)
        var commentFooterDiv = document.createElement('div')
        commentFooterDiv.classList.add('comment-footer')
        commentFooterDiv.innerHTML =
            '\n                <div class="like">\n                    <span class="like-counter">'
                .concat(
                    comment.likes,
                    '</span>\n                    <button class="like-button '
                )
                .concat(comment.isLiked ? 'liked' : '', '" data-index="')
                .concat(
                    index,
                    '"></button>\n                </div>\n                '
                )
        commentElement.appendChild(commentHeaderDiv)
        commentElement.appendChild(commentBodyDiv)
        commentElement.appendChild(commentFooterDiv)
        commentsList.appendChild(commentElement)
    })
}

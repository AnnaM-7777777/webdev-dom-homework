import { sanitizeHtml } from './utils.js'

export function renderComments(comments, commentsList) {
    commentsList.innerHTML = ''

    comments.forEach((comment, index) => {
        const commentElement = document.createElement('li')
        commentElement.classList.add('comment')
        commentElement.dataset.commentIndex = index

        const commentHeaderDiv = document.createElement('div')

        commentHeaderDiv.classList.add('comment-header')
        commentHeaderDiv.innerHTML = `<div>${sanitizeHtml(comment.name)}</div><div>${comment.date}</div>`

        const commentTextDiv = document.createElement('div')
        commentTextDiv.classList.add('comment-text')
        commentTextDiv.textContent = sanitizeHtml(comment.text) // Используем textContent

        const commentBodyDiv = document.createElement('div')
        commentBodyDiv.classList.add('comment-body')
        commentBodyDiv.appendChild(commentTextDiv)

        const commentFooterDiv = document.createElement('div')
        commentFooterDiv.classList.add('comment-footer')
        commentFooterDiv.innerHTML = `
                <div class="like">
                    <span class="like-counter">${comment.likes}</span>
                    <button class="like-button ${comment.isLiked ? 'liked' : ''}" data-index="${index}"></button>
                </div>
                `

        commentElement.appendChild(commentHeaderDiv)
        commentElement.appendChild(commentBodyDiv)
        commentElement.appendChild(commentFooterDiv)

        commentsList.appendChild(commentElement)
    })
}

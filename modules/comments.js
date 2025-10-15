import { sanitizeHtml } from './utils.js'
import { formatDate } from './utils.js'

// Функция для создания объекта комментария
export function createCommentObject(name, text) {
    const formattedDate = formatDate(new Date())
    return {
        name: sanitizeHtml(name),
        date: formattedDate,
        text: sanitizeHtml(text),
        likes: 0,
        isLiked: false,
    }
}

// Функция лайка комментария
export function likeComment(comments, index) {
    if (comments[index].isLiked === false) {
        comments[index].likes++
        comments[index].isLiked = true
    } else {
        comments[index].likes--
        comments[index].isLiked = false
    }
}

import { comments } from './comments.js'
import { sanitizeHtml } from './sanitizeHtml.js'

export const initLikeListeners = (renderComments) => {
    // счетчик лайков
    const likeButtons = document.querySelectorAll('.like-button')

    for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', (event) => {
            event.stopImmediatePropagation()

            const index = likeButton.dataset.index
            const comment = comments[index]

            comment.likes = comment.isLiked
                ? comment.likes - 1
                : comment.likes + 1

            comment.isLiked = !comment.isLiked

            renderComments()
        })
    }
}

export const initReplyListeners = () => {
    // ответ на комментарии
    const text = document.getElementById('text-input')
    const commentsElements = document.querySelectorAll('.comment')

    for (const commentElement of commentsElements) {
        commentElement.addEventListener('click', () => {
            const currentComment = comments[commentElement.dataset.index]
            text.value = `${currentComment.name}: > ${
                currentComment.text
            }\n ${''}`
            text.focus()
        })
    }
}

export const initAddCommentListener = (renderComments) => {
    // формат текущей даты и времени
    function formatDate(date) {
        const formatter = new Intl.DateTimeFormat('ru-RU', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        })

        let formattedDate = formatter.format(date)

        // Заменяем запятую на пробел
        formattedDate = formattedDate.replace(',', '')

        return formattedDate
    }

    function createCommentObject(name, text) {
        const formattedDate = formatDate(new Date())
        return {
            name: sanitizeHtml(name),
            date: formattedDate,
            text: sanitizeHtml(text),
            likes: 0,
            isLiked: false,
        }
    }

    // валидация формы отправки нового комментария
    const name = document.getElementById('name-input')
    const text = document.getElementById('text-input')
    const addButton = document.querySelector('.add-form-button')

    addButton.addEventListener('click', () => {
        if (!name.value || !text.value) {
            alert('Заполните все поля формы')
            return
        }

        const newComment = createCommentObject(name.value, text.value)

        comments.push(newComment)

        renderComments()

        name.value = ''
        text.value = ''
    })
}

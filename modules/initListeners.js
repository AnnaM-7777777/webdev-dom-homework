import { comments, updateComments } from './comments.js'
import { sanitizeHtml } from './sanitizeHtml.js'
import { postComments } from './api.js'

export const initLikeListeners = (renderComments) => {
    // счетчик лайков
    const likeButtons = document.querySelectorAll('.like-button')

    for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', (event) => {
            event.stopImmediatePropagation()

            const index = likeButton.dataset.index
            const comment = comments[index]

            comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1

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
            text.value = `${currentComment.name}: > ${currentComment.text}\n ${''}`
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

        document.querySelector('.form-loading').style.display = 'block'
        document.querySelector('.add-form').style.display = 'none'

        postComments(sanitizeHtml(text.value), sanitizeHtml(name.value))
            .then((data) => {
                document.querySelector('.form-loading').style.display = 'none'
                document.querySelector('.add-form').style.display = 'flex'

                updateComments(data)
                renderComments()
                name.value = ''
                text.value = ''
            })
            .catch((error) => {
                document.querySelector('.form-loading').style.display = 'none'
                document.querySelector('.add-form').style.display = 'flex'

                if (error.message === 'Failed to fetch') {
                    alert('Кажется, у вас сломался интернет, попробуйте позже')
                }

                if (error.message === 'Ошибка сервера') {
                    alert('Сервер сломался, попробуй позже')
                }

                if (error.message === 'Неверный запрос') {
                    alert('Имя и комментарий должны быть не короче 3-х символов')

                    name.classList.add('-error')
                    text.classList.add('-error')

                    setTimeout(() => {
                        name.classList.remove('-error')
                        text.classList.remove('-error')
                    }, 2000)
                }
            })
    })
}

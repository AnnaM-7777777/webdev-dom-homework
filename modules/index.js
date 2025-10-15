import { renderComments } from './render.js'
import { setupForm } from './form.js'
import { likeComment } from './comments.js'

document.addEventListener('DOMContentLoaded', () => {
    const commentsList = document.getElementById('commentsList')
    const addFormName = document.getElementById('addFormName')
    const addFormText = document.getElementById('addFormText')
    const addFormButton = document.getElementById('addFormButton')

    let comments = [
        {
            name: 'Глеб Фокин',
            date: '12.02.22 12:18',
            text: 'Это будет первый комментарий на этой странице',
            likes: 3,
            isLiked: false,
        },

        {
            name: 'Варвара Н.',
            date: '13.02.22 19:22',
            text: 'Мне нравится как оформлена эта страница! ❤',
            likes: 75,
            isLiked: true,
        },
    ]

    const { replyToComment } = setupForm(
        comments,
        commentsList,
        addFormName,
        addFormText,
        addFormButton,
    ) // Получаем replyToComment

    // Инициализация отображения
    renderComments(comments, commentsList)

    // Делегирование событий
    commentsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('like-button')) {
            const index = event.target.dataset.index
            likeComment(comments, index)
            renderComments(comments, commentsList)
        } else if (event.target.closest('.comment')) {
            const commentIndex =
                event.target.closest('.comment').dataset.commentIndex
            replyToComment(commentIndex)
        }
    })
})

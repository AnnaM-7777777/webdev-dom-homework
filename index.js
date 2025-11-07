import { renderComments } from './modules/renderComments.js'
import { fetchComments } from './modules/api.js'
import { updateComments } from './modules/comments.js'

export const fetchAddRenderComments = (isFirstLoading) => {
    if (isFirstLoading) {
        document.querySelector('.container').innerHTML = `<p>Пожалуйста, подождите, загружаю комментарии...</p>`
    }

    fetchComments().then((data) => {
        updateComments(data)
        renderComments()
    })
}

fetchAddRenderComments(true)
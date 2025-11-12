import { renderComments } from './modules/renderComments'
import { fetchComments } from './modules/api'
import { updateComments } from './modules/comments'

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

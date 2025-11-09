import { comments } from './comments.js'
import { token, name } from './api.js'
import { initAddCommentListener, initLikeListeners, initReplyListeners } from './initListeners.js'
import { renderLogin } from './renderLogin.js'

export const renderComments = () => {
    const container = document.querySelector('.container')

    // отображение существующих комментариев из массива
    const commentsHtml = comments
        .map((comment, index) => {
            return `
                      <li class="comment" data-index="${index}">
                        <div class="comment-header">
                          <div>${comment.name}</div>
                          <div>${comment.date}</div>
                        </div>
                        <div class="comment-body">
                          <div class="comment-text">
                            ${comment.text}
                          </div>
                        </div>
                        <div class="comment-footer">
                          <div class="likes">
                            <span class="likes-counter">${comment.likes}</span>
                            <button 
                            class="like-button ${comment.isLiked ? '-active-like' : ''}" 
                            data-index="${index}"
                            ></button>
                          </div>
                        </div>
                      </li>
                    `
        })
        .join('')

    // добавление новых комментариев через форму
    const addCommentsHtml = `

            <div class="add-form">
                <input
                    class="add-form-name"
                    id="name-input"
                    type="text"
                    placeholder="Введите ваше имя"
                    readonly
                    value="${name}"
                />
                <textarea
                    type="textarea"
                    class="add-form-text"
                    placeholder="Введите ваш коментарий"
                    rows="4"
                    id="text-input"
                ></textarea>
                <div class="add-form-row">
                    <button class="add-form-button">Написать</button>
                </div>
            </div>

            <div class="form-loading">
                Комментарий добавляется...
            </div>`

    const linkToLoginText = `<p>чтобы отправить комментарий, <span class="link-login">войдите</span></p>`

    const baseHtml = `<ul class="comments">${commentsHtml}</ul>
            ${token ? addCommentsHtml : linkToLoginText}
            `

    container.innerHTML = baseHtml
    if (token) {
        initLikeListeners(renderComments)
        initReplyListeners()
        initAddCommentListener(renderComments)
    } else {
        document.querySelector('.link-login').addEventListener('click', () => {
            renderLogin()
        })
    }
}

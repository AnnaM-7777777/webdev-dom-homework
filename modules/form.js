import { sanitizeHtml } from './utils.js';
import { createCommentObject } from './comments.js';
import { renderComments } from './render.js';

export  function setupForm(comments, commentsList, addFormName, addFormText, addFormButton) {
            addFormButton.addEventListener('click', () => addComment(comments, commentsList, addFormName, addFormText));

            function addComment(comments, commentsList, addFormName, addFormText) {
                addFormName.classList.remove("error");
                addFormText.classList.remove("error");

                if (!validateForm(addFormName, addFormText)) {
                return;
                }

                const newComment = createCommentObject(addFormName.value, addFormText.value);
                comments.push(newComment);

                addFormName.value = "";
                addFormText.value = "";

                renderComments(comments, commentsList);
            }

            function validateForm(nameInput, textInput) {
                let isValid = true;

                if (nameInput.value.trim() === '') {
                    nameInput.classList.add("error");
                    isValid = false;
                }

                if (textInput.value.trim() === '') {
                    textInput.classList.add("error");
                    isValid = false;
                }

                return isValid;
            }


            function replyToComment(commentIndex) {
                const comment = comments[commentIndex];

                addFormText.value = `> ${sanitizeHtml(comment.name)}: "${sanitizeHtml(comment.text)}"\n ${''}`;  // Заменяем \n на 
                addFormText.focus();
            }

            return {replyToComment}; // Возвращаем replyToComment чтобы main.js мог получить к ней доступ
        }

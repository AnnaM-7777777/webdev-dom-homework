"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupForm = setupForm;

var _utils = require("./utils.js");

var _comments = require("./comments.js");

var _render = require("./render.js");

function setupForm(comments, commentsList, addFormName, addFormText, addFormButton) {
  addFormButton.addEventListener('click', function () {
    return addComment(comments, commentsList, addFormName, addFormText);
  });

  function addComment(comments, commentsList, addFormName, addFormText) {
    addFormName.classList.remove('error');
    addFormText.classList.remove('error');

    if (!validateForm(addFormName, addFormText)) {
      return;
    }

    var newComment = (0, _comments.createCommentObject)(addFormName.value, addFormText.value);
    comments.push(newComment);
    addFormName.value = '';
    addFormText.value = '';
    (0, _render.renderComments)(comments, commentsList);
  }

  function validateForm(nameInput, textInput) {
    var isValid = true;

    if (nameInput.value.trim() === '') {
      nameInput.classList.add('error');
      isValid = false;
    }

    if (textInput.value.trim() === '') {
      textInput.classList.add('error');
      isValid = false;
    }

    return isValid;
  }

  function replyToComment(commentIndex) {
    var comment = comments[commentIndex];
    addFormText.value = "> ".concat((0, _utils.sanitizeHtml)(comment.name), ": \"").concat((0, _utils.sanitizeHtml)(comment.text), "\"\n "); // Заменяем \n на

    addFormText.focus();
  }

  return {
    replyToComment: replyToComment
  }; // Возвращаем replyToComment чтобы main.js мог получить к ней доступ
}
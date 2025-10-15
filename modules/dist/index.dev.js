"use strict";

var _render = require("./render.js");

var _form = require("./form.js");

var _comments = require("./comments.js");

document.addEventListener('DOMContentLoaded', function () {
  var commentsList = document.getElementById('commentsList');
  var addFormName = document.getElementById('addFormName');
  var addFormText = document.getElementById('addFormText');
  var addFormButton = document.getElementById('addFormButton');
  var comments = [{
    name: 'Глеб Фокин',
    date: '12.02.22 12:18',
    text: 'Это будет первый комментарий на этой странице',
    likes: 3,
    isLiked: false
  }, {
    name: 'Варвара Н.',
    date: '13.02.22 19:22',
    text: 'Мне нравится как оформлена эта страница! ❤',
    likes: 75,
    isLiked: true
  }];

  var _setupForm = (0, _form.setupForm)(comments, commentsList, addFormName, addFormText, addFormButton),
      replyToComment = _setupForm.replyToComment; // Получаем replyToComment
  // Инициализация отображения


  (0, _render.renderComments)(comments, commentsList); // Делегирование событий

  commentsList.addEventListener('click', function (event) {
    if (event.target.classList.contains('like-button')) {
      var index = event.target.dataset.index;
      (0, _comments.likeComment)(comments, index);
      (0, _render.renderComments)(comments, commentsList);
    } else if (event.target.closest('.comment')) {
      var commentIndex = event.target.closest('.comment').dataset.commentIndex;
      replyToComment(commentIndex);
    }
  });
});
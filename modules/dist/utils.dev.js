"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitizeHtml = sanitizeHtml;
exports.formatDate = formatDate;

function sanitizeHtml(text) {
  return text.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>').replace(/"/g, '"').replace(/'/g, "'");
}

function formatDate(date) {
  var formatter = new Intl.DateTimeFormat('ru-RU', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
  return formatter.format(date);
}
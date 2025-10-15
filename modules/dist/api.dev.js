'use strict'

Object.defineProperty(exports, '__esModule', {
    value: true,
})
exports.sanitizeHtml = sanitizeHtml

function sanitizeHtml(text) {
    // Функция для экранирования опасных символов
    var sanitize = text
        .replace(/&/g, '&')
        .replace(/</g, '<')
        .replace(/>/g, '>')
        .replace(/"/g, '"')
        .replace(/'/g, "'")
    return sanitize
}

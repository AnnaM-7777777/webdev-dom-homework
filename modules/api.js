export  function sanitizeHtml(text) {           // Функция для экранирования опасных символов
        let sanitize = text.replace(/&/g, '&')
                           .replace(/</g, '<')
                           .replace(/>/g, '>')
                           .replace(/"/g, '"')
                           .replace(/'/g, "'");
            return sanitize;
        }
export const sanitizeHtml = (value) => {
    // замена опасных символов
    return value.replaceAll('<', '&lt').replaceAll('>', '&gt')
}

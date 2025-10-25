const host = 'https://wedev-api.sky.pro/api/v1/AnnaM-7777777'

export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((res) => {
            return res.json()
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                const date = new Date(comment.date)

                // Функция для форматирования даты
                const formatDate = (date) => {
                    const day = String(date.getDate()).padStart(2, '0')
                    const month = String(date.getMonth() + 1).padStart(2, '0') // Месяцы начинаются с 0
                    const year = String(date.getFullYear()).slice(2) // Получаем последние 2 цифры года
                    const hours = String(date.getHours()).padStart(2, '0')
                    const minutes = String(date.getMinutes()).padStart(2, '0')

                    return `${day}.${month}.${year} ${hours}:${minutes}`
                }

                return {
                    name: comment.author.name,
                    date: formatDate(date),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                }
            })

            return appComments
        })
}

export const postComments = (text, name) => {
    return fetch(host + '/comments', {
        method: 'POST',
        body: JSON.stringify({
            text: text,
            name: name,
        }),
    }).then(() => {
        return fetchComments()
    })
}

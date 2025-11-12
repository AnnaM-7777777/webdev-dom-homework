const host = 'https://wedev-api.sky.pro/api/v2/:AnnaM-7777777'
const authHost = 'https://wedev-api.sky.pro/api/user' // URL аутентификационного сервера

export let token = ''

export const setToken = (newToken) => {
    token = newToken
}

export let name = ''

export const setName = (newName) => {
    name = newName
}

export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((res) => {
            return res.json()
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                const date = new Date(comment.date)

                // Функция для форматирования даты и времени
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
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            text: text,
            name: name,
        }),
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер сломался, попробуй позже')
            }

            if (response.status === 400) {
                throw new Error('Неверный запрос')
            }

            if (response.status === 201) {
                return response.json()
            }
        })
        .then(() => {
            return fetchComments()
        })
}

export const login = (login, password) => {
    return fetch(authHost + '/login', {
        method: 'POST',
        body: JSON.stringify({ login: login, password: password }),
    })
}

export const registration = (name, login, password) => {
    return fetch(authHost, {
        method: 'POST',
        body: JSON.stringify({ name: name, login: login, password: password }),
    })
}

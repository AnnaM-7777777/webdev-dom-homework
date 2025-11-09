import { setToken, setName, registration } from './api.js'
import { renderLogin } from './renderLogin.js'
import { fetchAddRenderComments } from '../index.js'

const toggleLoadingState = (isLoading) => {
    const loadingEl = document.querySelector('.form-loading')
    const submitButtonEl = document.querySelector('.button-main')

    if (isLoading) {
        loadingEl.textContent = 'Регистрация...'
        submitButtonEl.disabled = true
    } else {
        loadingEl.textContent = '' // Очистить текст 'Комментарий добавляется...'
        submitButtonEl.disabled = false
    }
}

export const renderRegistration = () => {
    const container = document.querySelector('.container')

    const loginHtml = `
        <section class="add-form">
            <h1>Форма регистрации</h1>

            <input 
                class="add-form-name" 
                type="text" 
                placeholder="Введите имя"
                id="name" 
                required 
            />

            <div class="form-loading-error" id="nameError"></div>

            <input 
                class="add-form-name" 
                type="text" 
                placeholder="Введите логин"
                id="login" 
                required 
            />

            <div class="form-loading-error" id="loginError"></div>

            <input 
                class="add-form-name"
                type="password"  
                placeholder="Введите пароль" 
                id="password" 
                required 
            />

            <div class="form-loading-error" id="passwordError"></div>

            <!-- This div is used for general API loading/error messages -->
            <div class="form-loading"></div>

            <fieldset class="add-form-registry">
                <button class="add-form-button-main button-main" type="submit">Зарегистрироваться</button>
                <ul class="add-form-button-link entry">Войти</ul>
            </fieldset>
        </section>
    `

    container.innerHTML = loginHtml

    document.querySelector('.entry').addEventListener('click', () => {
        renderLogin()
    })

    const nameEl = document.querySelector('#name')
    const loginEl = document.querySelector('#login')
    const passwordEl = document.querySelector('#password')
    const submitButtonEl = document.querySelector('.button-main')

    // Получаем элементы ошибок
    const nameError = document.getElementById('nameError')
    const loginError = document.getElementById('loginError')
    const passwordError = document.getElementById('passwordError')
    const generalLoadingEl = document.querySelector('.form-loading')


    // Функция очистки всех сообщений об ошибках
    const clearErrors = () => {
        nameError.textContent = ''
        loginError.textContent = ''
        passwordError.textContent = ''
        generalLoadingEl.textContent = ''
    }

    submitButtonEl.addEventListener('click', async () => {
        clearErrors() // Очищаем ошибки в начале

        //валидация формы регистрации
        if (!nameEl.value || !loginEl.value || !passwordEl.value) {
            alert('Заполните все поля формы')
            return
        }

        let isValid = true

        const nameValue = nameEl.value.trim()
        if (!/^[a-zA-Zа-яА-Я\s]+$/.test(nameValue) || nameValue.length < 3) {
            nameError.textContent = 'Имя должно содержать только буквы и длинну символов больше 3'
            isValid = false
        }

        const loginValue = loginEl.value.trim()
        if (loginValue.length < 5 || loginValue.length > 10) {
            loginError.textContent = 'Логин должен быть от 5 до 10 символов'
            isValid = false
        }

        const passwordValue = passwordEl.value.trim()
        if (!/^[a-zA-Z0-9]+$/.test(passwordValue) || passwordValue.length < 6) {
            passwordError.textContent = 'Пароль должен быть не менее 6 символов и содержать только буквы и цифры'
            isValid = false
        }

        if (!isValid) {
            return
        }

        toggleLoadingState(true)

        try {
            const response = await registration(nameEl.value, loginEl.value, passwordEl.value)

            if (!response.ok) {
                const errorData = await response.json()
                const errorMessage = errorData.error || 'Ошибка регистрации на сервере';
                generalLoadingEl.textContent = `Ошибка: ${errorMessage}`;  // Отобразить ошибку сервера
                throw new Error(errorMessage);
            }

            const data = await response.json()

            setToken(data.user.token)
            setName(data.user.name)
            fetchAddRenderComments()

        } catch (error) {
            console.error("Registration failed:", error);
            generalLoadingEl.textContent = `Ошибка: ${error.message}`
        } finally {
            toggleLoadingState(false);
        }
    })
}

import { setToken, setName, login } from './api'
import { renderRegistration } from './renderRegistration'
import { fetchAddRenderComments } from '../index'

export const renderLogin = () => {
    const container = document.querySelector('.container')

    const loginHtml = `
        <section class="add-form">
            <h1>Форма входа</h1>

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

            <fieldset class="add-form-registry">
                <button class="add-form-button-main button-main" type="submit">Войти</button>
                <ul class="add-form-button-link registry">Зарегистрироваться</ul>
            </fieldset>
        </section>
    `

    container.innerHTML = loginHtml

    document.querySelector('.registry').addEventListener('click', () => {
        renderRegistration()
    })

    const loginEl = document.querySelector('#login')
    const passwordEl = document.querySelector('#password')
    const submitButtonEl = document.querySelector('.button-main')
    const loginErrorEl = document.querySelector('#loginError')
    const passwordErrorEl = document.querySelector('#passwordError')

    submitButtonEl.addEventListener('click', () => {
        // Очищаем сообщения об ошибках перед новой попыткой
        loginErrorEl.textContent = ''
        passwordErrorEl.textContent = ''

        //валидация формы регистрации
        if (!loginEl.value || !passwordEl.value) {
            alert('Заполните все поля формы')
            return
        }

        login(loginEl.value, passwordEl.value)
            .then((response) => {
                if (!response.ok) {
                    // Обработка ошибок от сервера
                    if (response.status === 400) {
                        throw new Error('Неверный логин или пароль')
                    } else if (response.status === 404) {
                        throw new Error('Пользователь не найден')
                    } else if (response.status === 500) {
                        throw new Error('Ошибка сервера')
                    }
                }
                return response.json()
            })
            .then((data) => {
                setToken(data.user.token)
                setName(data.user.name)
                fetchAddRenderComments()
            })
            .catch((error) => {
                // Вывод сообщения об ошибке в соответствующий элемент
                if (error.message === 'Неверный логин или пароль') {
                    passwordErrorEl.textContent = 'Неверный логин или пароль.'
                } else if (error.message === 'Пользователь не найден') {
                    loginErrorEl.textContent = 'Пользователь с таким логином не найден.'
                } else {
                    console.error('Error:', error)
                    alert('Произошла ошибка: ' + error.message) // Или отобразите более общее сообщение
                }
            })
    })
}

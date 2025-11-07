import { setToken, setName, registration } from './api.js'
import { renderLogin } from './renderLogin.js'
import { fetchAddRenderComments } from '../index.js'

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

            <input 
                class="add-form-name" 
                type="text" 
                placeholder="Введите логин"
                id="login" 
                required 
            />

            <input 
                class="add-form-name"
                type="password"  
                placeholder="Введите пароль" 
                id="password" 
                required 
            />

            <fieldset class="add-form-registry">
                <button class="add-form-button-main button-main" type="submit">Зарегистрироваться</button>
                <ul class="add-form-button-link entry">Войти</ul>
            </fieldset>
        </section>
    `

    container.innerHTML = loginHtml

    document.querySelector(".entry").addEventListener("click", () => {
        renderLogin()
    })

    const nameEl = document.querySelector('#name')
    const loginEl = document.querySelector('#login')
    const passwordEl = document.querySelector('#password')
    const submitButtonEl = document.querySelector('.button-main')

    submitButtonEl.addEventListener('click', () => {
        registration(nameEl.value, loginEl.value, passwordEl.value)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setToken(data.user.token)
                setName(data.user.name)
                fetchAddRenderComments()
            })
    })
}

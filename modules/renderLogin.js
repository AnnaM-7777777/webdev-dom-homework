import { setToken, setName, login } from './api.js'
import { renderRegistration } from './renderRegistration.js'
import { fetchAddRenderComments } from '../index.js'

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

            <input 
                class="add-form-name"
                type="password"  
                placeholder="Введите пароль" 
                id="password" 
                required 
            />

            <fieldset class="add-form-registry">
                <button class="add-form-button-main button-main" type="submit">Войти</button>
                <ul class="add-form-button-link registry">Зарегистрироваться</ul>
            </fieldset>
        </section>
    `

    container.innerHTML = loginHtml

    document.querySelector(".registry").addEventListener("click", () => {
        renderRegistration()
    })

    const loginEl = document.querySelector('#login')
    const passwordEl = document.querySelector('#password')
    const submitButtonEl = document.querySelector('.button-main')

    submitButtonEl.addEventListener('click', () => {
        login(loginEl.value, passwordEl.value)
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

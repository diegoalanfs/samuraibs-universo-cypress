
import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('login', function () {

    context('quando já existe um usuário e informa os dados correto', function () {
        const user = {
            name: 'José Elias',
            email: 'jose@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user)
        })

        it('deve ser realizado o login com sucesso', function () {
            loginPage.go()
            loginPage.formLogin(user)
            loginPage.submit()

            dashPage.header.userLoggedIn(user.name)
        })

    })

    context('quando o usuário informa uma senha inválida', function () {
        let user = {
            name: 'Jorge Gomes',
            email: 'jorge@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user).then(function () {
                user.password = 'abc123'
            })
        })


        it('deve notificar erro de credenciais', function () {
            loginPage.go()
            loginPage.formLogin(user)
            loginPage.submit()
            loginPage.toast.shouldHaveText('Ocorreu um erro ao fazer login, verifique suas credenciais.')
        })

    })

    context.skip('quando o usuário informa email com formato inválido', function () {
        const user = {
            email: 'jose.samuraibs.com',
            password: 'pwd123'
        }

        it('deve exibir uma mensagem de alerta', function () {
            loginPage.go()
            loginPage.formLogin(user)
            loginPage.submit()
            loginPage.alertHaveText('Informe um email válido')
        })

    })

    context('quando o formato do email é inválido', function () {
        const emails = [
            'diego.com.br',
            'gmail.com',
            '@samuraibs.com',
            '@',
            'diego@',
            '111',
            '$#!@/*-',
            'xpto123'
        ]

        before(function(){
            loginPage.go()
        })

        emails.forEach(function (email) {
            it('não deve logar com o email: ' + email, function () {
                const user = { email: email, password: 'pwd123' }

                loginPage.formLogin(user)
                loginPage.submit()
                loginPage.alert.haveText('Informe um email válido')
            })
        })
    })

    context('quando não preencho nenhum dos campos', function () {
        const alertMessages = [
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function () {
            loginPage.go()
            loginPage.submit()
        })

        alertMessages.forEach(function (alert) {
            it('deve exibir ' + alert.toLowerCase(), function () {
                loginPage.alert.haveText(alert)
            })
        })
    })
})

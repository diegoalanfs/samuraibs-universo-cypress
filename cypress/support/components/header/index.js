
import { el } from './elements'

class Header {

    // shouldHaveWelcomeMessagem(expectProfile) {
    //     cy.contains(el.welcomeMessage)
    //         .should('be.visible')

    //     cy.get(el.profileName, {timeout:7000})
    //         .should('be.visible')
    //         //.find('strong')
    //         .should('have.text', expectProfile)
    // }

    userLoggedIn(userName) {
        cy.contains(el.welcomeMessage)
            .should('be.visible')

        cy.get(el.fullName, { timeout: 7000 })
            .should('be.visible')
            //.find('strong')
            .should('have.text', userName)
    }
}

export default new Header()
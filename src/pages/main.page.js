import {BasePage} from "./base.page";

export class MainPage extends BasePage{
    constructor(page) {
        super(page);
        this.signUpLink = page.getByRole('link', {name: 'Sign up'});
        this.newArcticleLink = page.getByRole('link', {name: 'New Article'});
    }
   async register () {
        await this.signUpLink.click();
    }
    async newArticle () {
        await this.newArcticleLink.click();
    }
}
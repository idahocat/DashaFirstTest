import {BasePage} from "./base.page";

export class MainPage extends BasePage{
    constructor(page) {
        super(page);
        this.signUpLink = this.page.getByRole('link', {name: 'Sign up'});
        this.newArcticleLink = this.page.getByRole('link', {name: 'New Article'});
        this.profileLink = this.page.getByRole('link', { name: 'Profile' });
        this.homeLink = this.page.getByRole('link', {name: 'Home'});
        this.logOutLink = this.page.getByRole('link', {name: 'Logout'});
        this.menuButton = this.page.locator('.dropdown-toggle');
    }
   async register () {
        await this.signUpLink.click();
    }
    async newArticle () {
        await this.newArcticleLink.click();
    }
    async openProfile(){
        await this.profileLink.click();
    }
    async openHome(){
        await this.homeLink.click();
    }
    async logOut(){
        await this.menuButton.click();
        await this.logOutLink.click();
    }
}
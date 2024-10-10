import {MainPage} from "./main.page";

export class RegistrationPage extends MainPage{
    constructor(page) {
        super(page);

        this.userNameField = page.getByPlaceholder('Name');
        this.userEmailField = page.getByPlaceholder('Email');
        this.userPasswordField = page.getByPlaceholder('Password');
        this.signUpButton = page.getByRole('button', {name: 'Sign up'});
    }
    async registration (userName, userEmail, userPassword) {
        await this.userNameField.click();
        await this.userNameField.fill(userName);
        await this.userEmailField.click();
        await this.userEmailField.fill(userEmail);
        await this.userPasswordField.click();
        await this.userPasswordField.fill(userPassword);
        await this.signUpButton.click();
    }
}
import {MainPage} from "./main.page";

export class ProfilePage extends MainPage{
    constructor(page) {
        super(page);
        this.numberOfCounts = page.getByRole('button', { name: '( 0 )' }).first();
        this.favoritedArticlesLink = page.getByRole('link', {name: 'Favorited Articles'});

    }
    async addToFavorite () {
        await this.numberOfCounts.click();
        await this.favoritedArticlesLink.click();

    }

}



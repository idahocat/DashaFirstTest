import {MainPage} from "./main.page";
import { faker } from '@faker-js/faker';

export class NewArticlePage extends MainPage{
    constructor(page) {
        super(page);

        this.titleText = faker.music.album();
        this.about = faker.music.album();
        this.article = faker.music.album();
        this.articleTitleText = page.getByPlaceholder('Article Title');
        this.articleAbout = page.getByPlaceholder('What\'s this article about?');
        this.articleText = page.getByPlaceholder('Write your article (in markdown)');
        this.publishButton = page.getByRole('button', { name:'Publish Article'});
    }
    async addNewArticle () {
        await this.articleTitleText.click();
        await this.articleTitleText.fill(this.titleText);
        await this.articleAbout.click();
        await this.articleAbout.fill(this.about);
        await this.articleText.click();
        await this.articleText.fill(this.article);
        await this.publishButton.click();
    }

}

// await page.getByPlaceholder('Article Title').click();
// await page.getByPlaceholder('Article Title').fill(titleText);
// await page.getByPlaceholder('What\'s this article about?').click();
// await page.getByPlaceholder('What\'s this article about?').fill(about);
// await page.getByPlaceholder('Write your article (in markdown)').click();
// await page.getByPlaceholder('Write your article (in markdown)').fill(article);
// await page.getByRole('button', { name:'Publish Article'}).click();
// await expect(page.locator(articleTitle)).toContainText(titleText);
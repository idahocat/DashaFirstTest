import {MainPage} from "./main.page";
import { faker } from '@faker-js/faker';

export class NewArticlePage extends MainPage{
    constructor(page) {
        super(page);

        this.titleText = faker.music.album();
        this.about = faker.music.album();
        this.article = faker.music.album();
        this.comment = faker.animal.cat();

        this.articleTitleText = page.getByPlaceholder('Article Title');
        this.articleAbout = page.getByPlaceholder('What\'s this article about?');
        this.articleText = page.getByPlaceholder('Write your article (in markdown)');
        this.publishButton = page.getByRole('button', { name:'Publish Article'});
        this.commentPlaceholder = page.getByPlaceholder('Write a comment...');
        this.postCommentButton = page.getByRole('button', { name:'Post Comment'});
        this.commentText = (".card-text");
        this.articleTitle = ("div[class='container'] h1");
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
    async postNewComment () {
        await this.commentPlaceholder.click();
        await this.commentPlaceholder.fill(this.comment);
        await this.postCommentButton.click();
    }
}

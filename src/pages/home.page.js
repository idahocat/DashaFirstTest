import {MainPage} from "./main.page";

export class HomePage extends MainPage{
    constructor(page) {
        super(page);
        this.tagVinitorButton = page.getByRole('button', { name:'vinitor'});
        this.vinitorFeedLink = page.getByRole('link', { name: 'Aliquam suffragium uxor' });
        this.tagVinitor = (".tag-default.tag-pill.tag-outline");
        this.vinitorTagText = 'vinitor';
    }
    async selectVinitorTag () {
        await this.tagVinitorButton.click();
    }
    async openVinitorTagFeed () {
        await this.vinitorFeedLink.click();
    }

}



import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import {MainPage} from "../src/pages/main.page";
import {RegistrationPage} from "../src/pages/registration.page";
import {NewArticlePage} from "../src/pages/newarticle.page";

const url = ('https://realworld.qa.guru/');
const headerText = ("div[class=\'container\'] p");
const tagVinitor = (".tag-default.tag-pill.tag-outline");
const commentText = (".card-text");
let newUser;

test.describe('Юзер кейсы', () => {
  test.beforeEach(async ({ page }) => {
    newUser = {
      userName : faker.person.firstName(),
      userEmail : faker.internet.email(),
      userPassword : faker.internet.password()
    };
    const mainPage = new MainPage(page);
    const registrationPage = new RegistrationPage(page);
    await mainPage.open(url);
    await mainPage.register();
    await registrationPage.registration(newUser.userName, newUser.userEmail, newUser.userPassword);
})

test('Создание записи', async ({ page }) => {
  const articleTitle = ("div[class='container'] h1");

  const mainPage = new MainPage(page);
  await mainPage.newArticle();
  const newArticlePage = new NewArticlePage(page);
  await newArticlePage.addNewArticle();
  await expect(page.locator(articleTitle)).toContainText(newArticlePage.titleText);
});

test("Добавить в избранное", async ({ page }) => {


  const mainPage = new MainPage(page);
  await mainPage.newArticle();
  const newArticlePage = new NewArticlePage(page);
  await newArticlePage.addNewArticle();
  await page.getByRole('navigation').getByText(newUser.userName).click();
  await page.getByRole('link', { name: 'Profile' }).click();
  await page.reload();
  await page.getByRole('button', { name: '( 0 )' }).first().click();
  await page.getByRole('link', {name: 'Favorited Articles'}).click();
  await page.getByRole('heading', { name: newArticlePage.titleText }).click();
});

  test("По тегу выдается результат", async ({ page }) => {

    await page.getByRole('link', {name: 'Home'}).click();
    await page.getByRole('button', { name:'vinitor'}).click();
    await expect(page.locator(tagVinitor)).toContainText('vinitor');
    await page.getByRole('link', { name: 'Aliquam suffragium uxor' }).click();
    await expect(page.locator(tagVinitor)).toContainText('vinitor');
  });


  test("Добавить комментарий к записи", async ({ page }) => {
    let comment = faker.animal.cat();

    const mainPage = new MainPage(page);
    await mainPage.newArticle();
    const newArticlePage = new NewArticlePage(page);
    await newArticlePage.addNewArticle();
    await page.getByPlaceholder('Write a comment...').click();
    await page.getByPlaceholder('Write a comment...').fill(comment);
    await page.getByRole('button', { name:'Post Comment'}).click();
    await expect(page.locator(commentText)).toContainText(comment);
  });

  test('Проверка наличия текста на главной странице', async ({ page }) => {
    await page.goto(url);
    await expect(page.locator(headerText)).toContainText('A place to share your knowledge.');
  });


})


//await page.goto(url);
//await page.getByRole('link', {name: 'Sign up'}).click();
// await page.getByPlaceholder('Name').click();
// await page.getByPlaceholder('Name').fill(newUser.userName);
// await page.getByPlaceholder('Email').click();
// await page.getByPlaceholder('Email').fill(newUser.userEmail);
// await page.getByPlaceholder('Password').click();
// await page.getByPlaceholder('Password').fill(newUser.userPassword);
// await page.getByRole('button', { name:'Sign up'}).click();





// let titleText = faker.music.album();
// let about = faker.music.album();
// let article = faker.music.album();
//
// await page.getByRole('link', {name: 'New Article'}).click();
// await page.getByPlaceholder('Article Title').click();
// await page.getByPlaceholder('Article Title').fill(titleText);
// await page.getByPlaceholder('What\'s this article about?').click();
// await page.getByPlaceholder('What\'s this article about?').fill(about);
// await page.getByPlaceholder('Write your article (in markdown)').click();
// await page.getByPlaceholder('Write your article (in markdown)').fill(article);
// await page.getByRole('button', { name:'Publish Article'}).click();
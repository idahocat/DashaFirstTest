import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const pageUrl = ('https://realworld.qa.guru/');
let userName = faker.person.firstName();
let userEmail = faker.internet.email();
let userPassword = faker.internet.password();
const headerText = ("div[class=\'container\'] p");
const tagVinitor = (".tag-default.tag-pill.tag-outline");
let shortBioText = ("div[class='user-info'] p");
const title = faker.science.chemicalElement();
let about = faker.music.album();
let article = faker.science.chemicalElement();

test.describe('Путь пользователя', () => {
  test.beforeEach(async ({ page }) => {
  await page.goto(pageUrl);
  await page.getByRole('link', {name: 'Sign up'}).click();
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill(userName);
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(userEmail);
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(userPassword);
  await page.getByRole('button', { name:'Sign up'}).click();
})

test('Проверка наличия текста на главной странице', async ({ page }) => {
  await page.goto(pageUrl);
  await expect(page.locator(headerText)).toContainText('A place to share your knowledge.');
});


test('Создание записи', async ({ page }) => {

  await page.getByRole('link', {name: 'New Article'}).click();
  await page.getByPlaceholder('Article Title').click();
  await page.getByPlaceholder('Article Title').fill(title);
  await page.getByPlaceholder('What\'s this article about?').click();
  await page.getByPlaceholder('What\'s this article about?').fill(about);
  await page.getByPlaceholder('Write your article (in markdown)').click();
  await page.getByPlaceholder('Write your article (in markdown)').fill(article);
  await page.getByRole('button', { name:'Publish Article'}).click();
  await page.getByRole('heading', { name: article}).click();
});

test("Добавить в избранное", async ({ page }) => {
  await page.getByRole('link', {name: 'New Article'}).click();
  await page.getByPlaceholder('Article Title').click();
  await page.getByPlaceholder('Article Title').fill(`Мурка`);
  await page.getByPlaceholder('What\'s this article about?').click();
  await page.getByPlaceholder('What\'s this article about?').fill(`МРРРРР`);
  await page.getByPlaceholder('Write your article (in markdown)').click();
  await page.getByPlaceholder('Write your article (in markdown)').fill(`Мрмрмрмрмрм`);
  await page.getByRole('button', { name:'Publish Article'}).click();
  await page.getByRole('heading', { name: 'Мурка' }).click();
  await page.getByRole('navigation').getByText(userName).click();
  await page.getByRole('link', { name: 'Profile' }).click();
  await page.getByRole('button', { name: '( 0 )' }).first().click();
  await page.getByRole('link', {name: 'Favorited Articles'}).click();
  await page.getByRole('heading', { name: 'Мурка' }).click();
});

test("По тегу выдается результат", async ({ page }) => {

  await page.getByRole('link', {name: 'Home'}).click();
  await page.getByRole('button', { name:'vinitor'}).click();
  await expect(page.locator(tagVinitor)).toContainText('vinitor');
  await page.getByRole('link', { name: 'Aliquam suffragium uxor' }).click();
  await expect(page.locator(tagVinitor)).toContainText('vinitor');
});


  test("Обновление информации в настройках", async ({ page }) => {

    await page.getByRole('navigation').getByText(userName).click();
    await page.getByRole('link', { name: 'Settings' }).click();
    await page.getByPlaceholder('URL of profile picture').click();
    await page.getByPlaceholder('URL of profile picture').fill(`https://disk.yandex.ru/i/MZxxjJbR5m4yAg`);
    await page.getByPlaceholder('Short bio about you').click();
    await page.getByPlaceholder('Short bio about you').fill(`I love cats`);
    await page.getByRole('button', { name:'Update settings'}).click();
    await page.getByRole('navigation').getByText(userName).click();
    await page.getByRole('link', { name: 'Profile' }).click();
    await expect(page.locator(shortBioText)).toContainText('I love cats');
  });




})
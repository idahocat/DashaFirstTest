import { test, expect } from '@playwright/test';
import {MainPage} from "../src/pages/main.page";
import {RegistrationPage} from "../src/pages/registration.page";
import {NewArticlePage} from "../src/pages/newarticle.page";
import {ProfilePage} from "../src/pages/profile.page";
import {HomePage} from "../src/pages/home.page";
import {userCreation} from '../src/faker/user.data';

const url = ('https://realworld.qa.guru/');
let newUser;

test.describe('Юзер кейсы', () => {
  test.beforeEach(async ({ page }) => {
    newUser = userCreation();

    const mainPage = new MainPage(page);
    const registrationPage = new RegistrationPage(page);
    await mainPage.open(url);
    await mainPage.register();
    await registrationPage.registration(newUser.userName, newUser.userEmail, newUser.userPassword);
})

test('Создание записи', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.newArticle();
  const newArticlePage = new NewArticlePage(page);
  await newArticlePage.addNewArticle();
  await expect(page.locator(newArticlePage.articleTitle)).toContainText(newArticlePage.titleText);
});

test("Добавить в избранное", async ({ page }) => {

  const profilePage = new ProfilePage(page);
  const mainPage = new MainPage(page);
  await mainPage.newArticle();
  const newArticlePage = new NewArticlePage(page);
  await newArticlePage.addNewArticle();
  await page.getByRole('navigation').getByText(newUser.userName).click();
  await mainPage.openProfile();
  await page.reload();
  await profilePage.addToFavorite();
  await page.reload();
  await page.getByRole('heading', { name: newArticlePage.titleText }).click();
});

  test("По тегу выдается результат", async ({ page }) => {
    const mainPage = new MainPage(page);
    const homePage = new HomePage(page);
    await mainPage.openHome();
    await homePage.selectVinitorTag();
    await expect(page.locator(homePage.tagVinitor)).toContainText(homePage.vinitorTagText);
    await homePage.openVinitorTagFeed();
    await expect(page.locator(homePage.tagVinitor)).toContainText(homePage.vinitorTagText);
  });

  test("Добавить комментарий к записи", async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.newArticle();
    const newArticlePage = new NewArticlePage(page);
    await newArticlePage.addNewArticle();
    await newArticlePage.postNewComment();
    await expect(page.locator(newArticlePage.commentText)).toContainText(newArticlePage.comment);
  });

  test('Пользователь может выйти из аккаунта', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.logOut();
    await expect(mainPage.signUpLink).toBeVisible();
  });
})

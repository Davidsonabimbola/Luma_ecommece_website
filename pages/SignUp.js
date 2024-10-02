const { expect } = require("@playwright/test")
const sign_up = (page)=>({

async goTo_homepage(){
    await page.goto('https://magento.softwaretestingboard.com/');
    await expect(await page.locator('[class="page-wrapper"]')).toBeTruthy()
},

async goTo_createAccount(){
    await page.getByRole('link',{name: 'Create an Account'}).click()
  await expect(page.locator('[id="maincontent"]')).toBeVisible()
},


async fillForm(newUser_First_Name, newUser_Last_Name, newUser_Email, newUser_Password, newUser_confirmPassword){
    await page.locator('[id="firstname"]').fill(newUser_First_Name)
  await page.locator('[id="lastname"]').fill(newUser_Last_Name)
  await page.locator('[id="email_address"]').fill(newUser_Email)
  await page.locator('[id="password"]').fill(newUser_Password)
 await expect(await page.locator('[id="password-strength-meter"]')).toBeTruthy()
  await page.locator('[id="password-confirmation"]').fill(newUser_confirmPassword)
},


async clickCreateAccount(){
    await page.getByRole('button',{name: 'Create an Account'}).click()
},


async passwordField_errorMessage(){
    await expect(page.locator('[id="password-error"]')).toBeVisible()
     await expect(page.locator('[id="password-error"]')).toContainText('This is a required field.')
},


async confirmPasswordField_errorMessage(){
    await expect(page.locator('[id="password-confirmation-error"]')).toBeVisible()
     await expect(page.locator('[id="password-confirmation-error"]')).toContainText('This is a required field.')
},


})
module.exports = sign_up
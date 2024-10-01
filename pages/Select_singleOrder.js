const { expect } = require("@playwright/test")
const PlaceOrder = (page)=>({

    async signIn_existingUser(signIn){

        await page.goto('https://magento.softwaretestingboard.com/');
    await expect(await page.locator('[class="page-wrapper"]')).toBeTruthy()
    await page.getByRole('link',{name: signIn}).click()
     await expect(page.locator('[id="maincontent"]')).toBeVisible()
     await expect(page.locator('[class="page-title"]').locator('[class="base"]')).toContainText('Customer Login')
    },

    async login_existingUser(userEmail,userPassword){
        await page.locator('[id="email"]').fill(userEmail)
     await page.locator('[id="pass"]').fill(userPassword)
     await page.locator('[id="send2"]').click() 
    },

    async loginMessage(){
        const userHeader = page.locator('[class="page-header"]')
     const welcomeMessage = userHeader.locator('[class="greet welcome"]').locator('[class="logged-in"]')
      await expect(await welcomeMessage).toBeVisible()
      console.log(await welcomeMessage.allTextContents())
    },

    async select_menuItems(){
        await page.getByRole('menuitem', { name: ' Men' }).hover() // this has role=menuitem
        await page.getByRole('menuitem', { name: ' Tops' }).click()  // this has role=menuitem
    
    },

    async chooseProduct(selectedOrder){
        const itemLink = await page.locator('[class="product name product-item-name"]').locator('a').filter({hasText: selectedOrder})
      console.log(await itemLink.count())
      await itemLink.click()
      await expect(page.locator('[class="column main"]')).toBeVisible()
    },

    async chooseSize(size){
        await page.locator('[class="swatch-option text"]').filter({hasText: size}).click()  
    },

    async chooseColor(){
        await page.locator('[class="swatch-option color"]').click()  
    },

    async add_toCart(){
        await page.locator('[id="product-addtocart-button"]').click()  
    },

    async verifyCart(selectedOrder_name){
        
        const add_toCart_toastMessage = page.locator('[role="alert"]')
        await expect(await add_toCart_toastMessage).toBeVisible()
        expect(add_toCart_toastMessage).toContainText(`You added ${selectedOrder_name} to your shopping cart.`)
        console.log(await page.locator('[role="alert"]').textContent()) 

        // number of items in the cart
     const orders_in_cartNumber = page.locator('[class="counter-number"]') 
     console.log(await orders_in_cartNumber.textContent())
    },

    async clickCart (){
        const cartLink = page.locator('[class="text"]').filter({hasText:'My Cart'})
        await page.locator('[class="action showcart"]').filter({has:cartLink}).click()
   
        await expect(page.locator('[id="minicart-content-wrapper"]')).toBeVisible()
        await expect(page.locator('[id="top-cart-btn-checkout"]')).toBeVisible()
   
        await page.locator('[id="top-cart-btn-checkout"]').click() // checkout button
        await expect(page.locator('[id="maincontent"]')).toBeVisible()  
    },


    async shippingDetails (receiver_firstName, receiver_lastName, receiver_address, receiverState, receiverProvince, postalCode, receiverCountry,receiver_telephoneNumber){
        const shippingPage = await page.locator('[id="shipping-new-address-form"]')
     const emailSection = await shippingPage.locator('[class="field _required"]')

     await emailSection.nth(0).locator('input').fill(receiver_firstName) // first name

     
     await emailSection.nth(1).locator('input').fill(receiver_lastName) // last name

await emailSection.nth(2).locator('input').fill(receiver_address)

await page.getByLabel('City').fill(receiverState)

// select state/Province
await emailSection.nth(4).locator('[class="select"]').selectOption({ label: receiverProvince }); // selectOption
await page.getByLabel('Zip/Postal Code').fill(postalCode)
await page.getByLabel('Country').selectOption({label: receiverCountry})

await page.getByLabel('Phone Number').fill(receiver_telephoneNumber)
    },


    async checkRadio_Button(){
        const checkBox_section = await page.locator('[id="checkout-shipping-method-load"]').locator('[class="table-checkout-shipping-method"]')
        const flatRate_Section = await checkBox_section.locator('tbody').locator('tr').nth(0)
        const theRadio_Button = await flatRate_Section.locator('[class="col col-method"]').nth(0).locator('[class="radio"]')
        await theRadio_Button.check()
        
    },

    async click_nextButton(){
        await page.getByRole('button', {name: 'Next'}).click()  
        await expect(page.locator('[id="maincontent"]')).toBeTruthy()
    }






})
module.exports = PlaceOrder
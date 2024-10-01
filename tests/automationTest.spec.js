const { test, expect } = require('@playwright/test');
const PlaceOrder = require('../pages/Select_singleOrder')

test('TC_001 successful registration', async ({ page }) => {
  await page.goto('https://magento.softwaretestingboard.com/');
  await expect(await page.locator('[class="page-wrapper"]')).toBeTruthy()
  await page.getByRole('link',{name: 'Create an Account'}).click()
  await expect(page.locator('[id="maincontent"]')).toBeVisible()

  // sign up 
  await page.locator('[id="firstname"]').fill('Dariva')
  await page.locator('[id="lastname"]').fill('Gronsory')
  await page.locator('[id="email_address"]').fill('dariva_grongy2098@yahoo.com')
  await page.locator('[id="password"]').fill('Vanmuster.007')
 await expect(await page.locator('[id="password-strength-meter"]')).toBeTruthy()
  await page.locator('[id="password-confirmation"]').fill('Vanmuster.007')

  await page.getByRole('button',{name: 'Create an Account'}).click()

});


test('TC_002 unsuccessful registration due to missing password and confirm password', async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/');
    await expect(await page.locator('[class="page-wrapper"]')).toBeTruthy()
    await page.getByRole('link',{name: 'Create an Account'}).click()
    await expect(page.locator('[id="maincontent"]')).toBeVisible()
  
    // sign up 
    await page.locator('[id="firstname"]').fill('Bernard')
    await page.locator('[id="lastname"]').fill('Mount')
    await page.locator('[id="email_address"]').fill('benmeet_grongy2098@yahoo.com')
     await page.getByRole('button',{name: 'Create an Account'}).click()
     await expect(page.locator('[id="password-error"]')).toBeVisible()
     await expect(page.locator('[id="password-error"]')).toContainText('This is a required field.')
     await expect(page.locator('[id="password-confirmation-error"]')).toBeVisible()
     await expect(page.locator('[id="password-confirmation-error"]')).toContainText('This is a required field.')

  });


  test('TC_003 unsuccessful registration due to missing email address', async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/');
    await expect(await page.locator('[class="page-wrapper"]')).toBeTruthy()
    await page.getByRole('link',{name: 'Create an Account'}).click()
    await expect(page.locator('[id="maincontent"]')).toBeVisible()
  
    // sign up 
    await page.locator('[id="firstname"]').fill('Aaron')
    await page.locator('[id="lastname"]').fill('Picker')
    await page.locator('[id="password"]').fill('Vanmuster.007')
    await page.locator('[id="password-confirmation"]').fill('Vanmuster.007')
    await page.getByRole('button',{name: 'Create an Account'}).click()
    await expect(page.locator('[id="email_address-error"]')).toBeVisible()
    await expect(page.locator('[id="email_address-error"]')).toContainText('This is a required field.')
   
  
  });



  test('TC_004 successful user login', {tag: '@smoke'}, async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/');
    await expect(await page.locator('[class="page-wrapper"]')).toBeTruthy()
    await page.getByRole('link',{name: 'Sign In'}).click()
     await expect(page.locator('[id="maincontent"]')).toBeVisible()
     await expect(page.locator('[class="page-title"]').locator('[class="base"]')).toContainText('Customer Login')
  
     // login 
     await page.locator('[id="email"]').fill('dariva_grongy2098@yahoo.com')
     await page.locator('[id="pass"]').fill('Vanmuster.007')
     await page.locator('[id="send2"]').click() 
     const userHeader = page.locator('[class="page-header"]')
     const welcomeMessage = userHeader.locator('[class="greet welcome"]').locator('[class="logged-in"]')
      await expect(await welcomeMessage).toBeVisible()
      console.log(await welcomeMessage.allTextContents())
  });


  test('TC_005 unsuccessful user login with missing password', async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/');
    await expect(await page.locator('[class="page-wrapper"]')).toBeTruthy()
    await page.getByRole('link',{name: 'Sign In'}).click()
     await expect(page.locator('[id="maincontent"]')).toBeVisible()
     await expect(page.locator('[class="page-title"]').locator('[class="base"]')).toContainText('Customer Login')
  
     // login 
     await page.locator('[id="email"]').fill('dariva_grongy2098@yahoo.com')
     await page.locator('[id="send2"]').click() 
     await expect(page.locator('[id="pass-error"]')).toBeVisible()
    await expect(page.locator('[id="pass-error"]')).toContainText('This is a required field.')
  });



  test('TC_006 unsuccessful user login with missing email', async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/');
    await expect(await page.locator('[class="page-wrapper"]')).toBeTruthy()
    await page.getByRole('link',{name: 'Sign In'}).click()
     await expect(page.locator('[id="maincontent"]')).toBeVisible()
     await expect(page.locator('[class="page-title"]').locator('[class="base"]')).toContainText('Customer Login')
  
     // login 
     await page.locator('[id="pass"]').fill('Vanmuster.007')
     await page.locator('[id="send2"]').click() 
     await expect(page.locator('[id="email-error"]')).toBeVisible()
    await expect(page.locator('[id="email-error"]')).toContainText('This is a required field.')
  });



  test('TC_007 select order', {tag: '@smoke'}, async ({ page }) => {
    test.setTimeout(120000)
    const placeOrder = PlaceOrder(page)
     const itemName = 'Atlas Fitness Tank  '
     var userSelection = 'Sign In'
     const userEmail = 'dariva_grongy2098@yahoo.com'
     const userPassword = 'Vanmuster.007'
     const mediumSize  = 'M'
     var receiver_firstName = 'Dariva'
     var receiver_lastName = 'Gonsory'
     var receiver_address = 'Street 15, Landmark Avenue'
     var receiverState = 'Lagos'
     var receiverProvince = 'Nevada' 
     var postalCode = '34567'
     var receiverCountry = 'United Kingdom'
     var receiver_telephoneNumber = '+234803478612'

     await placeOrder.signIn_existingUser(userSelection)
     await placeOrder.login_existingUser(userEmail,userPassword)
     await placeOrder.loginMessage()
     await placeOrder.select_menuItems()
     await placeOrder.chooseProduct(itemName)
     await placeOrder.chooseSize(mediumSize)
     await placeOrder.chooseColor()
     await placeOrder.add_toCart()
     await placeOrder.verifyCart(itemName)
     await placeOrder.clickCart()
     await placeOrder.shippingDetails(receiver_firstName,receiver_lastName,
      receiver_address,receiverState,receiverProvince,
      postalCode,receiverCountry,receiver_telephoneNumber)
     await placeOrder.checkRadio_Button()
     await placeOrder.click_nextButton()
    // await page.goto('https://magento.softwaretestingboard.com/');
    // await expect(await page.locator('[class="page-wrapper"]')).toBeTruthy()
    // await page.getByRole('link',{name: userSelection}).click()
    //  await expect(page.locator('[id="maincontent"]')).toBeVisible()
    //  await expect(page.locator('[class="page-title"]').locator('[class="base"]')).toContainText('Customer Login')
  
     // login 
    
    //  await page.locator('[id="email"]').fill('dariva_grongy2098@yahoo.com')
    //  await page.locator('[id="pass"]').fill('Vanmuster.007')
    //  await page.locator('[id="send2"]').click() 

    // login message
    //  const userHeader = page.locator('[class="page-header"]')
    //  const welcomeMessage = userHeader.locator('[class="greet welcome"]').locator('[class="logged-in"]')
    //   await expect(await welcomeMessage).toBeVisible()
    //   console.log(await welcomeMessage.allTextContents())

      // select menu item (Men and Tops)
      // await page.getByRole('menuitem', { name: ' Men' }).hover() // this has role=menuitem
      // await page.getByRole('menuitem', { name: ' Tops' }).click()  // this has role=menuitem

      //select product
      // const itemLink = await page.locator('[class="product name product-item-name"]').locator('a').filter({hasText: itemName})
      // console.log(await itemLink.count())
      
      // await itemLink.click()
      // await expect(page.locator('[class="column main"]')).toBeVisible()

      // choose size
      
      // await page.locator('[class="swatch-option text"]').filter({hasText: 'M'}).click()
      // choose colour
     
      // await page.locator('[class="swatch-option color"]').click()
      // add to cart
      

      // await page.locator('[id="product-addtocart-button"]').click()

      //toast message for adding to cart  

//       const add_toCart_toastMessage = page.locator('[role="alert"]')
//       await expect(await add_toCart_toastMessage).toBeVisible()
//       expect(add_toCart_toastMessage).toContainText(`You added ${itemName} to your shopping cart.`)
//       console.log(await page.locator('[role="alert"]').textContent())

// // number of items in the cart
//      const orders_in_cartNumber = page.locator('[class="counter-number"]') 
//      console.log(await orders_in_cartNumber.textContent())

         
     
     //click on cart
    //  const cartLink = page.locator('[class="text"]').filter({hasText:'My Cart'})
    //  await page.locator('[class="action showcart"]').filter({has:cartLink}).click()

    //  await expect(page.locator('[id="minicart-content-wrapper"]')).toBeVisible()
    //  await expect(page.locator('[id="top-cart-btn-checkout"]')).toBeVisible()

    //  await page.locator('[id="top-cart-btn-checkout"]').click() // checkout button
    //  await expect(page.locator('[id="maincontent"]')).toBeVisible()

     //shipping details
     
//      const shippingPage = await page.locator('[id="shipping-new-address-form"]')
//      const emailSection = await shippingPage.locator('[class="field _required"]')

//      await emailSection.nth(0).locator('input').fill('Dariva') // first name

     
//      await emailSection.nth(1).locator('input').fill('Gonsory') // last name

// await emailSection.nth(2).locator('input').fill('Street 15, Landmark Avenue')

// await page.getByLabel('City').fill('Lagos')

// // select state/Province
// await emailSection.nth(4).locator('[class="select"]').selectOption({ label: 'Nevada' }); // selectOption
// await page.getByLabel('Zip/Postal Code').fill('34567')
// await page.getByLabel('Country').selectOption({label: 'United Kingdom'})

// await page.getByLabel('Phone Number').fill('+234803478612')

// checkbox/radio button 
//  const checkBox_section = await page.locator('[id="checkout-shipping-method-load"]').locator('[class="table-checkout-shipping-method"]')
//  const flatRate_Section = await checkBox_section.locator('tbody').locator('tr').nth(0)
//  const theRadio_Button = await flatRate_Section.locator('[class="col col-method"]').nth(0).locator('[class="radio"]')
// await theRadio_Button.check()


// await page.getByRole('button', {name: 'Next'}).click()


// await expect(page.locator('[id="maincontent"]')).toBeTruthy()
    
  });
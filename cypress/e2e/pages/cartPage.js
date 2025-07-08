class CartPage {
    //selectores de cart
    get title() { return '.title'; }
    get cartItems() { return '.cart_item'; }
    get checkoutButton() { return '#checkout'; }
    get continueShoppingButton() { return '#continue-shopping'; }
    get removeButton() { return '.cart_button'; }

    getTitle() {
        return cy.get(this.title);
    }

    getCartItem(productName) {
        return cy.contains('.inventory_item_name', productName).parents('.cart_item');
    }

    getNumberOfCartItems() {
        return cy.get(this.cartItems);
    }

    clickCheckout() {
        cy.get(this.checkoutButton).click();
    }

    clickContinueShopping() {
        cy.get(this.continueShoppingButton).click();
    }

    removeProductFromCart(productName) {
        this.getCartItem(productName).find(this.removeButton).click();
    }
}

export default CartPage;
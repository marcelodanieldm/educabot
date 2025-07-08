class InventoryPage {
    //selectores de inventory
    get title() { return '.title'; }
    get shoppingCartIcon() { return '.shopping_cart_link'; }
    get addToCartButton() { return '.btn_primary'; }
    get removeButton() { return '.btn_secondary'; }
    get cartBadge() { return '.shopping_cart_badge'; }

    getTitle() {
        return cy.get(this.title);
    }

    clickShoppingCart() {
        cy.get(this.shoppingCartIcon).click();
    }

    getProductCard(productName) {
        return cy.contains('.inventory_item_name', productName).parents('.inventory_item');
    }

    addProductToCart(productName) {
        this.getProductCard(productName).find(this.addToCartButton).click();
    }

    removeProductFromCart(productName) {
        this.getProductCard(productName).find(this.removeButton).click();
    }

    getCartBadgeCount() {
        return cy.get(this.cartBadge);
    }
}

export default InventoryPage;
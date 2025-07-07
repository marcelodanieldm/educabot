class CartPage {

    getAllProductName(){
        return cy.get('div.cart_item div.cart_item_label a:nth-child(1) div.inventory_item_name');
    }

    getProductQty(){
        return cy.get('div.cart_quantity');
    }

    getCheckoutBtn(){
        return cy.get('.btn_action');
    }

    getCheckoutHeader(){
        return cy.get('.subheader')
    }

}

export default CartPage;
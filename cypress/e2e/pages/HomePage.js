
class HomePage {

    getCartCount() {
        return cy.get('.fa-layers-counter');
    }

    getAllProductName(){
        return cy.get('div.inventory_item div.inventory_item_label a:nth-child(1)  div.inventory_item_name');
    }

    getAddToCartBtn(){
        return cy.get('button.btn_primary.btn_inventory');
    }

    getCartBtn() {
        return cy.get('.svg-inline--fa');
    }

}

export default HomePage;
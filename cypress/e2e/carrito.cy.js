
import loginPage from '../../support/pageObjects/loginPage';
import HomePage from '../../support/pageObjects/HomePage';
import CartPage from '../../support/pageObjects/CartPage';

import loginPage from '../../support/pageObjects/loginPage';
import HomePage from '../../support/pageObjects/HomePage';
import CartPage from '../../support/pageObjects/CartPage';

describe('Tests de login', () => {

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/');
  }); 
  

  it('LOGIN-001 Inicio de sesión exitoso con usuario válido (standard_user)', () => {
    loginPage.login('standard_user', 'secret_sauce');

  });

    it('LOGIN-002 Inicio de sesión fallido con contrasena incorrecta.', () => {
    loginPage.login('standard_user', 'password_incorrecta');

  });

  it('LOGIN-003 Inicio de sesión fallido con usuario incorrecto/no registrado.', () => {
    loginPage.login('juan_cito', 'secreto_secreto_shh');

  });

it('LOGIN-004 Caso Borde: Inicio de sesión fallido con campos vacíos (ambos).', () => {
    loginPage.login('', '');

  });
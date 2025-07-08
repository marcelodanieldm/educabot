

describe('Punto seis para el Challenge de Automatizacion con requests Mercado Libre', () => {

    it('Obtener los departamentos del menú y verificar que la respuesta contenga "departments"', () => {
        const apiUrl = 'https://www.mercadolibre.com.ar/menu/departments';

        // Hago la solicitud GET a la API de Mercado Libre
        cy.request('GET', apiUrl)
            .then((response) => {
                // Verifico que la solicitud fue exitosa
                expect(response.status).to.eq(200);

                // Verifico que la respuesta sea un objeto o un array y contenga la propiedad 'departments'
                //    Mercado Libre devuelve un HTML/JSON mixto, entonces verifico en el cuerpo de texto.
                const responseBody = response.body;

                // Verifico que el cuerpo de la respuesta, convertido a string, contenga la palabra clave.
                expect(responseBody.toString()).to.include('departments');

            });
    });

});
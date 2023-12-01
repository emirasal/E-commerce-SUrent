import request from "supertest";
//import { chai, expect } from "chai";
import chai from "chai";
import chaiSorted from 'chai-sorted';
const expect = chai.expect;

import app from './server.js';
import cors from "cors";

chai.use(chaiSorted);

await sleep(1000)
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


describe('GET /getAll', function() {
    it('List all products', function(done) {
        request(app)
            .get('/api/products/getAll')
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('array');
                done();
            });
    });
});

describe('GET /getReview', function() {
    it('List all reviews of a product', function(done) {
        request(app)
            .get('/api/products/getReview/644fecbb22d8786395295149')
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(200);
                expect(response.body).to.have.property("reviews");
                expect(response.body.reviews).to.be.an("array");
                done();
            });
    });
});

describe('GET /prodID', function() {
    it('Get single, specific product by ID', function(done) {
        request(app)
            .get('/api/products/prodID/644fecbb22d8786395295149')
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(200);
                expect(response.body).to.have.all.keys('_id', 'Pname', 'price', 'stock', 'Discount_rate', 'Distribution_inf',
                        '__v', 'category', 'createdAt', 'description', 'images', 'numOfReviews', 'rating', 'reviews', 'updatedAt', 'variants', 
                            'warranty');
                done();
            });
    });
});

describe('GET /prodID', function() {
    it('Get single, specific product by ID', function(done) {
        request(app)
            .get('/api/products/prodID/64510ef54ac4b97f0f4ab1d9')
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(200);
                expect(response.body).to.have.all.keys('_id', 'Pname', 'price', 'stock', 'Discount_rate', 'Distribution_inf',
                        '__v', 'category', 'createdAt', 'description', 'images', 'numOfReviews', 'rating', 'reviews', 'updatedAt', 'variants', 
                            'warranty');
                done();
            });
    });
});

describe('GET /category', function() {
    it('Get products by category', function(done) {
        request(app)
            .get('/api/products/prodCategory/dress')
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('array');
                done();
            });
    });
});

describe('GET /category', function() {
    it('Get products by category', function(done) {
        request(app)
            .get('/api/products/prodCategory/bag')
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('array');
                done();
            });
    });
});

describe('POST /add', function() {
    it('Add a new product', function(done) {

        let product = {
            Pname:"test_product",
            price:210,
            stock:50,
            variants:"test",
            description:"Introducing the test product",
            warranty: 30,
            Distribution_inf: "SUrent",
            Discount_rate: 25,
            category: "urban"
        };

        request(app)
            .post('/api/products/add')
            .send(product)
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(200);
                expect(response.body).to.have.all.keys('_id', 'Pname', 'price', 'stock', 'Discount_rate', 'Distribution_inf',
                        '__v', 'category', 'createdAt', 'description', 'images', 'numOfReviews', 'rating', 'reviews', 'updatedAt', 'variants', 
                            'warranty');
                done();
            });
    });
});

describe('GET / user details', function() {
    it('Get user details without token ', function(done) {
        request(app)
            .get('/api/users/details')
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(403);
                done();
            });
    });
});

describe('POST / post review', function() {
    it('Post a product review without token ', function(done) {
        request(app)
            .post('/api/products/postReview/644fecbb22d8786395295149')
            .send({})
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(403);
                done();
            });
    });
});

/*
describe('DELETE / prodID', function() {
    it('Delete the product with given id', function(done) {
        request(app)
            .delete('/api/rem/6453018f6a73a154ff729465') //CHANGE ID!!!
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(200);
                done();
            });
    });
});
*/

describe('GET / products sorted by price', function() {
    it('Get products in descending order with respect to price ', function(done) {
        request(app)
            .get('/api/products/sort/price')
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(200);
                expect(response.body).to.be.sortedBy("price", {descending: true});
                done();
            });
    });
});

describe('GET / products sorted by rating', function() {
    it('Get products in descending order with respect to rating ', function(done) {
        request(app)
            .get('/api/products/sort/rating')
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(200);
                expect(response.body).to.be.sortedBy("rating", {descending: true});
                done();
            });
    });
});

describe('GET / orders by user ID - user without orders', function() {
    it('Get orders of a user with given ID - no such order in this case ', function(done) {
        request(app)
            .get('/api/orders/getOrders/642c93dac1cabc1f427bca40') //USER WITHOUT ORDER!!!
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(404);
                done();
            });
    });
});

describe('GET / orders by user ID - user without orders', function() {
    it('Get orders of a user with given ID - no such order in this case ', function(done) {
        request(app)
            .get('/api/orders/getOrders/642c93dac1cabc1f427bca40') //USER WITHOUT ORDER!!!
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(404);
                done();
            });
    });
});

describe('GET / orders by user ID - no such user', function() {
    it('Get orders of a user with given ID - no such user in this case ', function(done) {
        request(app)
            .get('/api/orders/getOrders/642c93dac1cabc1f427acb04') //NO SUCH USER!!!
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(404);
                done();
            });
    });
});

/*
describe('GET / orders by user ID', function() {
    it('Get orders of a user with given ID', function(done) {
        request(app)
            .get('/api/orders/getOrders/') //PUT SOME VALID ID WITH ORDERS!!!
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('array');
                done();
            });
    });
});
*/

describe('POST /login ', function() {
    it('Login', function(done) {

        let login = {
            email: "eylul2@test.com",
            password: "Aa12345,"
        };

        request(app)
            .post('/api/logIn')
            .send(login)
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(200);
                expect(response.body).to.have.all.keys('accessToken', 'refreshToken', 'userId', 'error', 'message');
                done();
            });
    });
});

describe('GET / carts by user ID', function() {
    it('Get carts of a user with given ID', function(done) {
        request(app)
            .get('/api/carts', cors(),
                    {headers:{userId:"644eb19068c98d2d1b8672e9"}}) //PUT SOME VALID ID WITH ORDERS!!!
            .end(function(err, response) {
                if (err) return done(err);

                expect(response.status).to.equal(200);
                done();
            });
    });
});

//not tested down from here.


describe('GET /getOrders', function() {
    it('should return all orders', function() {
      const mockResponse = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const mockRequest = {};
  
      // Invoke the route handler function.
      getAllOrders(mockRequest, mockResponse);
  
      // Assert the expected behavior.
      expect(mockResponse.status.calledWith(200)).to.be.true;
      expect(mockResponse.json.calledOnce).to.be.true;
    });
  });

  describe('GET /getOrdersByDateRange', function() {
    it('should return orders within the specified date range', function() {
      const mockResponse = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const mockRequest = {
        params: {
          date1: '2022-01-01',
          date2: '2022-01-31'
        }
      };
  
      // Invoke the route handler function.
      getOrdersByDateRange(mockRequest, mockResponse);
  
      // Assert the expected behavior.
      expect(mockResponse.status.calledWith(200)).to.be.true;
      expect(mockResponse.json.calledOnce).to.be.true;
      // baska assertion varsa buraya:
    });
  });

  describe('POST /sendPDF', function() {
    it('should send an email with a PDF attachment', function() {
      // Mock any necessary dependencies
      const mockResponse = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const mockRequest = {
        // Set up the request body and any necessary headers or attachments
        body: {
          email: 'test@example.com',
          pdfPath: '/path/to/pdf.pdf'
        }
      };
  
      // Invoke the route handler function
      sendEmailWithPDF(mockRequest, mockResponse);
  
      // Assert the expected behavior
      expect(mockResponse.status.calledWith(200)).to.be.true;
      expect(mockResponse.json.calledOnce).to.be.true;
      //assertion eklenecekse buraya
    });
  });
  
  
describe('POST /deleteOrder/:id', function() {
    it('should delete an order with the given ID', function() {
      // Mock any necessary dependencies
      const mockResponse = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const mockRequest = {
        params: {
          id: 'validOrderID'
        }
      };
  
      // Invoke the route handler function
      deleteOrder(mockRequest, mockResponse);
  
      // Assert the expected behavior
      expect(mockResponse.status.calledWith(200)).to.be.true;
      expect(mockResponse.json.calledOnce).to.be.true;
      //assertion eklenecekse buraya
    });
  });

  describe('POST /refundProds', function() {
    it('should refund products from an order', function() {
      // Mock any necessary dependencies
      const mockResponse = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const mockRequest = {
        // Set up the request body and any necessary headers or data
        body: {
          orderID: 'validOrderID',
          products: ['product1', 'product2']
        }
      };
  
      // Invoke the route handler function
      refundProdsFromOrder(mockRequest, mockResponse);
  
      // Assert the expected behavior
      expect(mockResponse.status.calledWith(200)).to.be.true;
      expect(mockResponse.json.calledOnce).to.be.true;
      //assertion eklenecekse buraya
    });
  });
  
  describe('POST /createRefund', function() {
    it('should create a refund', function() {
      // Mock any necessary dependencies
      const mockResponse = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const mockRequest = {
        // Set up the request body and any necessary headers or data
        body: {
          orderID: 'validOrderID',
          refundAmount: 50.0
        }
      };
  
      // Invoke the route handler function
      createRefund(mockRequest, mockResponse);
  
      // Assert the expected behavior
      expect(mockResponse.status.calledWith(200)).to.be.true;
      expect(mockResponse.json.calledOnce).to.be.true;
      // assertion varsa buraya
    });
  });
  
  describe('GET /getRefunds', function() {
    it('should get all refunds', function() {
      // Mock any necessary dependencies
      const mockResponse = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const mockRequest = {
        // Set up any necessary request parameters or headers
      };
  
      // Invoke the route handler function
      getAllRefunds(mockRequest, mockResponse);
  
      // Assert the expected behavior
      expect(mockResponse.status.calledWith(200)).to.be.true;
      expect(mockResponse.json.calledOnce).to.be.true;
      // diger assertler buraya
    });
  });

  describe('PATCH /update/:id', function() {
    it('should update an order with the given ID', function() {
      // Mock any necessary dependencies
      const mockResponse = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const mockRequest = {
        params: {
          id: 'validOrderID'
        },
        // Set up any necessary request body or headers
      };
  
      // Invoke the route handler function
      updateOrder(mockRequest, mockResponse);
  
      // Assert the expected behavior
      expect(mockResponse.status.calledWith(200)).to.be.true;
      expect(mockResponse.json.calledOnce).to.be.true;
      // diger assertler buraya
    });
  });
  
  
  
  
  
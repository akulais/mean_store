var orders_app = angular.module('orders_app', ['ngRoute', 'angularMoment']);

        orders_app.config(function($routeProvider) {
            $routeProvider
            .when('/', {
                templateUrl: 'partials/dashboards.html'
            })
            .when('/customers', {
                templateUrl: 'partials/customers.html'
            })
            .when('/orders', {
                templateUrl: 'partials/orders.html'
            })
            .when('/products', {
                templateUrl: 'partials/products.html'
            })
            .when('/dashboards', {
                templateUrl: 'partials/dashboards.html'
            })
            .when('/settings', {
                templateUrl: 'partials/settings.html'
            })
            .otherwise({
                redirectTo: 'partials/dashboards.html'
            });
        });

//	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS 	CUSTOMERS
    orders_app.factory('CustomerFactory', function($http) {
        var customers = []; // THIS IS THE FULL ARRAY
        var factory = {}; // THIS IS THE OBJECT THAT WILL GO INTO THE ARRAY

    factory.index = function(callback) {
        $http.get('/customers').success(function(output) {
	        customers = output;
	        callback(customers);
	        }) 
    }

    factory.create = function(info, callback) {
        $http.post("/create", {name: info.name}).success(function(output) {
            callback(output);
        	});
        	callback(customers);
        }

    factory.delete = function(customer, callback) {
        $http.delete('/delete/' + customer._id).success(function() {
            customers.splice(customers.indexOf(customer), 1);
            });
        }
     
    return factory;
    });

    orders_app.controller('customerController', function($scope, CustomerFactory) {
        CustomerFactory.index(function(data) {
            $scope.customers = data;
        });

        $scope.addCustomer = function() {
            console.log($scope.customers.name,'name');
            if($scope.isDuplicate($scope.customers.name)) {
                alert("can\'t add the name becuase it is already used");
            } else {
            CustomerFactory.create($scope.customers, function(data) {
                $scope.error = data;
                CustomerFactory.index(function(data) {
                    $scope.customers = data;
                    });
                });
            }
            }
            
        $scope.isDuplicate = function(new_customer) {
            CustomerFactory.index(function(data) {
                $scope.customers = data;
                });
            
            for (var i = 0; i < $scope.customers.length; i++) {
                if (new_customer == $scope.customers[i].name) {
                    return true;
                    }
                }
            }

        $scope.delete = function(customer) {
            CustomerFactory.delete(customer, function(data) {
                CustomerFactory.index(function(data) {
                    $scope.customers = data;
                    });
                });
            }
        });         //  THIS IS THE END OF THE CUSTOMER CONTROLLER

//	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	ORDERS 	
	orders_app.factory('OrderFactory', function($http) {
        var orders = [];
        var factory = {}; // THIS IS THE OBJECT THAT WILL GO INTO THE ARRAY

    factory.order_index = function(callback) {
        $http.get('/orders').success(function(output) {
            orders = output;
            callback(orders);
        	})
    }

    factory.order = function(info, callback) {
        $http.post("/order", {name: info.name, qty: info.qty, product: info.product}).success(function(output) {
            callback(output);
        });
        callback(orders);
    }     
	
    return factory;
    });

    orders_app.controller('orderController', function ($scope, OrderFactory, ProductFactory, CustomerFactory) {
        OrderFactory.order_index(function(data) {
            $scope.orders = data;
        });
        CustomerFactory.index(function(data) {
            $scope.customers = data;
        });
        ProductFactory.index(function(data) {
            $scope.products = data;
            });

    $scope.addOrder = function() {
    	
        OrderFactory.order($scope.orders, function(data) {
			$scope.orders = data;
            });

        ProductFactory.update($scope.orders.product, $scope.orders.qty);

        OrderFactory.order_index(function(data) {
            	// console.log(data, "data in addOrder orderController")
            $scope.orders = data; 	
            });
        };
    });         //  THIS IS THE END OF THE ORDER CONTROLLER

//	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	PRODUCTS 	

orders_app.factory('ProductFactory', function($http) {
        var products = []; // THIS IS THE FULL ARRAY
        var factory = {}; // THIS IS THE OBJECT THAT WILL GO INTO THE ARRAY

    factory.index = function(callback) {
        $http.get('/products').success(function(output) {
            products = output;
            callback(products);
            }); 
        }

    factory.create_product = function(info, callback) {
        $http.post("/create_product", {name: info.name, image: info.image, description: info.description, qty: info.qty}).success(function(output) {
            callback(output);
            });
        callback(products);
        }

    factory.update = function(product, qty, callback) {
    	console.log('info in factory.update', product, qty);
    	$http.put('/update', {name: product, qty: qty}).success(function(output) {
    		callback(output);
    	});
    } 
    return factory;
    });

    orders_app.controller('productController', function($scope, ProductFactory) {
        ProductFactory.index(function(data) {
            $scope.products = data;
            });

        $scope.addProduct = function() {
            if ($scope.isDuplicate($scope.products.name,'product')) {
                alert("can\'t add the product name, must be unique");
            } else {
                ProductFactory.create_product($scope.products, function(data) {
                $scope.error = data;
                ProductFactory.index(function(data) {
                    $scope.products = data;
                    });
                });
            }
            }

        $scope.isDuplicate = function(new_product) {
            ProductFactory.index(function(data) {
                $scope.products = data;
                });
            
            for (var i = 0; i < $scope.products.length; i++) {
                if (new_product == $scope.products[i].name) {
                    return true;
                    }
                }
            }
        });     //  THIS IS THE END OF THE PRODUCT CONTROLLER
        
//  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  DASHBOARDS  
  
    orders_app.controller('dashboardController', function ($scope, OrderFactory, ProductFactory, CustomerFactory) {
        OrderFactory.order_index(function(data) {
            $scope.orders = data;
            });
        CustomerFactory.index(function(data) {
            $scope.customers = data;
            });
        ProductFactory.index(function(data) {
            $scope.products = data;
            });
    
    });         //  THIS IS THE END OF THE DASHBOARD CONTROLLER

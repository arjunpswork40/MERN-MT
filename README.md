
Mainly 2 APIs included
    1.get all details from db
    2.update db

1.To get stock details from db
    method
        => GET
    api
        => http://localhost:4000/api/get-stock-details

2.To update db
    method
        =>PUT
    api
        =>http://localhost:4000/api/stock-update
    body
        => eg: 
            {
                "month" : "April",
                "quantity": "55",
                "price":"46"
            }
    comments
        => month validation implemented, so only the 12 months are accepted in th month field
        => quantity and price should be number
        => db get updated if there is an entry for specified month, else it get created



Steps to run ==>

1.clone the project
2.goto 'server' path
3.create .env, if not there by usning .env.example
4.create a database with specified name in 'MONGO_CONNECTION_STRING' in .env
5.npm install
6.npm start



# MERN-MT
machine test for MERNSTACK developer.

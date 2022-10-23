# Get Pulpo API Reference
In order to test GetPulpo API calls you are able to use the glossary declared in a [public Postman Workspace.](https://www.postman.com/coyoterulea/workspace/getpulpo-api/overview)

# Declared calls.

## Users
### Signup (post)

```
http://localhost:3000/api/users/signup
```
If you don't know any valid user you are able to create one calling this request with following raw json body:
```
{
  "password": "anypassword",
  "username": "anyuser"
}
```
### Login (post)

```
http://localhost:3000/api/users/login
```
In order to access into auth protected calls, you need to do a login request with a valid user and password with following json body:
```
{
  "password": "validpass",
  "username": "validuser"
}
```

### Protected Call (get)
```
http://localhost:3000/api/users/protected
```
This request was only created for test purposes. If user is signed in returns userName, otherwise returns 403 error.

### Logout (get)
```
http://localhost:3000/api/users/logout
```
This request is used to remove authorization.

## Colors
### color By Code
```
http://localhost:3000/api/colors/colorbycode
```

Get color name by requested code
```
{
    "color_code": "BLU"
}
```
### Get Color List
```
http://localhost:3000/api/colors/getcolors
```
Get all colors list


## Brands
### Brand By Code
```
http://localhost:3000/api/brands/brandbycode
```

Get brand name by requested code
```
{
    "brand_code": "AUD"
}
```
### Get Brands List
```
http://localhost:3000/api/brands/getbrands
```
Get all brands list


## Vehicles
### Add Vehicle
```
http://localhost:3000/api/vehicles/addvehicle
```
Post request to add new vehicles into Database. Vehicle_Id is a required parameter and need to be unique. Brand and Color need to be valid codes into brands and colors colection.
```
{
    "vehicle_id":   "AUD-9853",
    "brand":        "AUD",
    "model":        "2019",
    "color":        "WHI",
    "status":       true,
    "assigned":     false
}
```

### Update Vehicle
```
http://localhost:3000/api/vehicles/updatevehicle
```
Update information to update a existing vehicle. _id needs to exists in database.
```
{
    "_id":          "63506d2e8f0ccf8bc66e0378",
    "vehicle_id":   "ULS-97982",
    "brand":        "VOW",
    "model":        "2023",
    "color":        "WHI",
    "status":       true,
    "assigned":     true
}
```

## Find By fields
```
http://localhost:3000/api/vehicles/findbyfields
```
Find all records in the "AND" filter criteria. Every parameter passed is one element added with ADD in your query.
```
{
    "vehicle_id":   "AUD-985",
    "brand":        "AUD",
    "model":        "2020",
    "color":        "YEL",
    "status":       true,
    "assigned":     false
}
```

## Delete Vehicle
```
http://localhost:3000/api/vehicles/deletevehicle
```
Post to delete existing vehicle _id need to exists in database.
```
{
    "_id": "63506b8f65d7bdf11c09f6e0"
}
```


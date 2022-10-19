# Get Pulpo API Reference
In order to test GetPulpo API calls you are able to use the glossary declared in a [public Postman Workspace.](https://www.postman.com/coyoterulea/workspace/getpulpo-api/overview)

# Declared calls.

## Users
### Signup (post)

```
http://localhost:3000/users/signup
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
http://localhost:3000/users/login
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
http://localhost:3000/users/protected
```
This request was only created for test purposes. If user is signed in returns userName, otherwise returns 403 error.

### Logout (get)
```
http://localhost:3000/users/logout
```
This request is used to remove authorization.

## Colors
### color By Code
```
http://localhost:3000/colors/colorbycode
```

Get color name by requested code
```
{
    "color_code": "BLU"
}
```
### Get Color List
```
http://localhost:3000/colors/getcolors
```
Get all colors list



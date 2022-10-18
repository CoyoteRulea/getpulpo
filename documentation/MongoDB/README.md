# Mongo DB documentation

Mongo Database es hosted in MongoDB cloud with AWS based interface. Database Access is open for all resources (ip's) and only has one user for demo app purposes.

Connection string and DB are defined in .env file like this
```
MONGO_CONNECTION_STRING = "mongodb+srv://victor_ivan_mendez:Q1w2e3r4t5Y6@cluster0.lbh1auf.mongodb.net/?retryWrites=true&w=majority"
MONGO_DBNAME = "pulpo_app"
```

## MongoDB for VS Code and playground
In order to install MongoDB extension for VS Code, you need to go into Marketplace a search or follow the documentation [located here.](https://www.mongodb.com/docs/mongodb-vscode/)

### VS Code MongoPlayground
If you need to remove a signedup user, you are allowed to use [Delete AnyUser Playground File](VS%20Code%20Playground\Delete%20AnyUser.mongodb) just change the user that you want to delete and run the file.

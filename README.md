# sssf-courses backend side of the project
Graphql API for a food diary sort of an app.

## endpoint running at https://charge.jelastic.metropolia.fi/graphql note that the server might be sleeping and takes a while to launch

## frontend for this project is running at https://sssf-frontend.herokuapp.com/
## www.github.com/Ruon1s/sssf-frontend
what has changed after presentation? readme.md

## example queries
To access the GQL mutations grab the token from login querys result and add it to your requests header as bearer token, you will need a client like Altair to send images into the server. In altair there is an option to modify headers.
![image](https://user-images.githubusercontent.com/50231327/117444717-817bab00-af42-11eb-9e27-638c3f059bf2.png)




```gql
mutation{
    register(
        username: "INSERT YOUR USERNAME",
        password: "INSERT YOUR PASSWORD")
        {
            username
            id
            token
        }
    }
```
```gql
query{
    login(
        username: "INSERT YOUR USERNAME",
        password: "INSERT YOUR PASSWORD") 
        {
            username
            id
            token
        }
}
```
```gql
query{
    entries {
        Entryname
    	Ingredients
  		File
    	Steps
    	Rating
    	Date
    	userID
    }
}
```
```gql
mutation UPLOAD_FILE($YOURFILE: Upload!)
    {
        addEntry(
            Entryname: "NAME OF THE DISH",
            File: {File: $YOURFILE},
            Ingredients: "LIST ALL INGREDIENTS USED",
            Steps: "STEPS IN RECIPE",
            Rating: INTEGER VALUE OF YOUR RATING,
            Date: "DATE AS STRING",
            userID: "YOUR USER ID")
            {
                Entryname
                File
                Ingredients
                Steps
                Rating
                Date
            }
    }
```

```gql
query{
    entriesByUser(id: "ENTER YOUR USERID HERE") 
    {
        Entryname
        Ingredients
  	    File
        Steps
        Rating
        Date
    }
}
```

```gql
mutation  {
    deleteEntry(id: "ID OF YOUR ENTRY HERE")
    {
        id
        File
        userID
    }
}
```
```gql
mutation  MODIFY($somefile: Upload!){
    modifyEntry(id: "ID OF YOUR ENTRY HERE",
    File: {File: $somefile},
    Entryname: "YOUR ENTRYNAME",
    Ingredients: "YOUR INGREDIENTS",
    Rating: YOUR RATING AS NUMBER,
    Steps: "YOUR STEPS IN COOKING")
    {
        id
        File
        userID
        Entryname
        Ingredients
        Steps
        Rating
        
    } 
}
```




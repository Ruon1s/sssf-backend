# sssf-courses backend side of the project
Graphql API for a food diary sort of an app.

## endpoint running at https://charge.jelastic.metropolia.fi/graphql
## example queries
To access the GQL mutations grab the token from login querys result and add it to your requests as bearer token (for example Postmans authorization tab)

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
mutation UPLOAD_FILE($YOURFILE: Upload!)
{
  addEntry(
    Entryname: "NAME OF THE DISH",
    File: {File: $YOURFILE},
    Ingredients: "LIST ALL INGREDIENTS USED",
    Steps: "STEPS IN RECIPE",
    Rating: INTEGER VALUE OF YOUR RATING,
    Date: "DATE AS STRING",
    userID: "YOUR USER ID"){
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

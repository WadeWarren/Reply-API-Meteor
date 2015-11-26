# Reply API integration for Meteor.js
This package provides access to the [ReplyApp.io](http://replyapp.io) API on the server.
You can view the API docs [here](http://support.replyapp.io/category/46-api).
## Usage
Create a new Reply instance, passing in the account's api key.
`let replyAPI = new Reply( <apiKey> )`

### People Methods
**List People**
The page number is optional, but to accessing beyond the first page, pass in a page number.
`replyAPI.people('list', {page: 1})`

**Find a Person**
To find a specific person by id:
`replyAPI.people('find', {id: <personId> })`
To find a specific person by email address:
`replyAPI.people('find', {email: <email> })`

**Add a Person**
`replyAPI.people('find', {email, name, etc})`

**Remove a Person**
`replyAPI.people('remove', {id or email})`

**View Person Stats**
To view a specific person's stats by email address:
`replyAPI.people('stats', {email: <email> })`

### Campaign Methods
**List Campaigns**
`replyAPI.campaigns('list')`

**Find Campaign**
`replyAPI.campaigns('find', {id or name})`

**Add a Person to a Campaign**
Takes an object {campaignId, email}
`replyAPI.campaigns('add', {campaignId, email})`

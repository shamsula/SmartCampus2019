module.exports = {
  labels: ["User"],

  "googleId": {
    type: 'string',
    unique: true
  },
  "email": {
    type: 'string',
    unique: true
  },
  "firstName": "string",
  "lastName": "string",
  "locale": "string",
  "name": "string",
  "picture":{
    type: "string",
    uri: {
      scheme: ["http", "https"]
    }
  },
  "createdAt": "localdatetime",
  "updatedAt": "localdatetime",

  posted: {
    type: "node",
    target: "Event",
    relationship: "POSTED",
    direction: "out"
  },

  likes: {
    type: "nodes",
    target: "Event",
    relationship: "LIKES",
    direction: "out"
  },

  attending: {
    type: "nodes",
    target: "Event",
    relationship: "ATTENDING",
    direction: "out"
  },

  commented: {
    type: "node",
    target: "Comment",
    relationship: "COMMENTED",
    direction: "out"
  },

  has_requested: {
    type: "nodes",
    target: "User",
    relationship: "has_requested",
    direction: "out",
    eager: true
  },

  has_requests: {
    type: "nodes",
    target: "User",
    relationship: "has_requested",
    direction: "in",
    eager: true
  },

  is_friend: {
    type: "nodes",
    target: "User",
    relationship: "is_friend",
    direction: "out",
    eager: true
  },

  is_friend_in: {
    type: "nodes",
    target: "User",
    relationship: "is_friend",
    direction: "in",
    eager: true
  }

};

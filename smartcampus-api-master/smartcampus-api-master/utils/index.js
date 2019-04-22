var jwt = require('jsonwebtoken');

// Generates a json web token for a given user
const generateJWT = (user) => {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60); // expire in 60 days

  return jwt.sign({
    id: user.identity(),
    exp: parseInt(exp.getTime() / 1000),
  }, process.env.JWT_SECRET);
}

const userResponse = (user) => {
  let body = user.properties(); // all fields
  // Return string rep of ID for frontend. TODO: use a slug for id
  body.id = user.identity().toString();
  return {
    user: body
  }
}

const userAuthResponse = (user) => {
  let response = userResponse(user);
  response.user.token = generateJWT(user); // append token
  return response;
}

/**
 * Builds the event object to return to the front end
 * @param {Neode} event   // Event to create a JSON for
 * @param {String} userId // Current user id (can be null)
 */
const eventResponse = (event, userId = undefined) => {
  let body = event.properties();
  // Return string rep of ID for frontend. TODO: use a slug for id
  body.id = event.identity().toString();

  // Append the author's JSON response to event body (as 'author')
  const author = event.get('posted_by');
  body.author = userResponse(author).user;

  // Append like nodes
  const likes = event.get('liked_by');
  let likesBody = [];
  likes.forEach(liker => {
    likesBody.push(userResponse(liker).user);
  });
  body.likes = likesBody;

  // Append attendee nodes
  const attendees = event.get('attended_by');
  let attendeesBody = [];
  attendees.forEach(attendee => {
    attendeesBody.push(userResponse(attendee).user);
  });
  body.attendees = attendeesBody;
  
  // Append all the comments
  const comments = event.get('has_comment');
  let commentBody = [];
  comments.forEach(comment => {
    commentBody.push(commentResponse(comment).comment);
  });
  body.comments = commentBody;

  // Return the prepared event object
  return {
    event: body
  }
}

const commentResponse = (comment) => {
  let body = comment.properties();
  // Return string rep of ID for frontend. TODO: use a slug for id
  body.id = comment.identity().toString();

  // Get eagerly loaded author through relation
  const author = comment.get('comment_by');

  // Append the author's JSON response to event body (as 'author')
  body.author = userResponse(author).user;

  return {
    comment: body
  }
}

const friendRequestResponse = (user) => {
  let body = [];
  const requests = user.get('has_requests');
  requests.forEach(req => {
    body.push(userResponse(req));
  });
  return body;
}

const friendListResponse = (user) => {
  let body = [];
  let friends = user.get('is_friend');
  friends.forEach(f => {
    body.push(userResponse(f));
  });
  friends = user.get('is_friend_in');
  friends.forEach(f => {
    body.push(userResponse(f));
  });
  return body;
}


// Compares Neo4J loseless integer ids. Works for string versions as well
const sameIdentity = (firstIdentity, secondIdentity) => {
  return JSON.stringify(firstIdentity) === JSON.stringify(secondIdentity)
}

// Common utility functions
module.exports = {
  generateJWT, 
  userResponse, 
  userAuthResponse,
  eventResponse,
  commentResponse,
  sameIdentity,
  friendRequestResponse,
  friendListResponse
}

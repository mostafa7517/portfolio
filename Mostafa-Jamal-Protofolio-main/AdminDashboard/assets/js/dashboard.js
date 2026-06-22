$(document).ready(async function () {
  showLoader();

  try {
    const [users, posts, comments] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users").then(r => r.json()),
      fetch("https://jsonplaceholder.typicode.com/posts").then(r => r.json()),
      fetch("https://jsonplaceholder.typicode.com/comments").then(r => r.json()),
    ]);

    $("#usersCount").text(users.length);
    $("#postsCount").text(posts.length);
    $("#commentsCount").text(comments.length);

  } catch (err) {
    console.error("Failed to fetch dashboard data", err);
  } finally {
    hideLoader();
  }
});

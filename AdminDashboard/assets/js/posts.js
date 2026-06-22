$(document).ready(async function () {
  showLoader();
  let allPosts = [];
  let filteredPosts = [];
  let editingId = null;
  const POSTS_PER_PAGE = 10;
  let currentPage = 1;

  try {
    // Fetch posts
    allPosts = await fetch("https://jsonplaceholder.typicode.com/posts").then(r => r.json());
    filteredPosts = [...allPosts];

    renderPosts();

    // Live search
    $("#searchPost").on("input", function () {
      const q = $(this).val().toLowerCase();
      filteredPosts = allPosts.filter(p =>
        p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q)
      );
      currentPage = 1;
      renderPosts(true);
    });

    // Scroll to Add Post section from navbar
    $("a[href='#addPostSection']").on("click", function(e){
      e.preventDefault();
      const addSection = $("#addPostSection");
      $('html, body').animate({
        scrollTop: addSection.offset().top - 100
      }, 300);
      // Reset for adding new post
      editingId = null;
      $("#addPostTitle").text("Add New Post");
      $("#postTitle").val("");
      $("#postBody").val("");
    });

    // Save post
    $("#savePost").on("click", function () {
      const title = $("#postTitle").val().trim();
      const body = $("#postBody").val().trim();

      if (!title || !body) {
        toastr.warning("Please fill all fields");
        return;
      }

      if (editingId) {
        const post = allPosts.find(p => p.id === editingId);
        post.title = title;
        post.body = body;
        toastr.success("Post updated locally");
      } else {
        const newPost = {
          id: Date.now(),
          title,
          body,
          userId: 1
        };
        allPosts.unshift(newPost);
        toastr.success("Post added locally");
      }

      filteredPosts = [...allPosts];
      currentPage = 1;
      renderPosts(true);
    });

    // Load More button
    $("#postsList").after('<button id="loadMorePosts" class="btn btn-primary">Load More</button>');
    $("#loadMorePosts").on("click", function () {
      currentPage++;
      renderPosts();
    });

    // Event delegation for edit/delete/comments
    $("#postsList").on("click", ".delete-btn", function () {
      const id = $(this).data("id");
      allPosts = allPosts.filter(p => p.id !== id);
      filteredPosts = filteredPosts.filter(p => p.id !== id);
      toastr.warning("Post deleted locally");
      renderPosts(true);
    });

    $("#postsList").on("click", ".edit-btn", function () {
      const id = $(this).data("id");
      const post = allPosts.find(p => p.id === id);
      editingId = id;

      $("#addPostTitle").text("Edit Post");
      $("#postTitle").val(post.title);
      $("#postBody").val(post.body);

      // Scroll to Add/Edit section
      const editSection = $("#addPostSection");
      $('html, body').animate({
        scrollTop: editSection.offset().top - 100
      }, 300);
    });

    $("#postsList").on("click", ".comment-btn", async function () {
      const id = $(this).data("id");
      const commentsBox = $(`#comments-${id}`);
      if (!commentsBox.hasClass("hidden")) {
        commentsBox.addClass("hidden").empty();
        return;
      }
      try {
        const comments = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`).then(r => r.json());
        commentsBox.empty();
        comments.forEach(c => {
          commentsBox.append(`<li><b>${c.name}</b>: ${c.body}</li>`);
        });
        commentsBox.removeClass("hidden");
      } catch (err) {
        toastr.error("Failed to load comments");
      }
    });

  } catch (err) {
    toastr.error("Failed to load posts");
    console.error(err);
  } finally {
    hideLoader();
  }

  function renderPosts(resetLoadMore = false) {
    const end = currentPage * POSTS_PER_PAGE;
    const postsToShow = filteredPosts.slice(0, end);

    $("#postsList").empty();
    postsToShow.forEach(post => {
      $("#postsList").append(`
        <li class="post-card">
          <h3>${post.title}</h3>
          <p>${post.body}</p>
          <div class="post-actions">
            <button class="comment-btn" data-id="${post.id}">💬 Comments</button>
            <button class="edit-btn" data-id="${post.id}">✏️ Edit</button>
            <button class="delete-btn" data-id="${post.id}">🗑️ Delete</button>
          </div>
          <ul class="comments hidden" id="comments-${post.id}"></ul>
        </li>
      `);
    });

    if (filteredPosts.length > postsToShow.length) {
      $("#loadMorePosts").show();
    } else {
      $("#loadMorePosts").hide();
    }

    if (resetLoadMore) currentPage = 1;
  }
});

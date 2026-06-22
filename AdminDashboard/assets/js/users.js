$(document).ready(async function () {
  showLoader();
  let users = [];
  let currentEditId = null;
  const favorites = JSON.parse(localStorage.getItem("favorites_users") || "[]");

  try {
    users = await fetch("https://jsonplaceholder.typicode.com/users").then(r => r.json());

    const table = $("#usersTable").DataTable({
      data: users,
      columns: [
        { data: "id" },
        { data: "name" },
        { data: "email" },
        { data: "company.name", defaultContent: "" },
        {
          data: null,
          render: function (data, type, row) {
            const isFav = favorites.includes(row.id);
            return `
              <button class="btn btn-primary view-btn" data-id="${row.id}">👁️</button>
              <button class="btn btn-primary edit-btn" data-id="${row.id}">✏️</button>
              <button class="btn btn-danger delete-btn" data-id="${row.id}">🗑️</button>
              <button class="btn btn-fav fav-btn" data-id="${row.id}">${isFav ? "⭐" : "☆"}</button>
            `;
          }
        }
      ]
    });

    // Elements
    const detailSection = $("#userDetailSection");
    const detailBody = $("#detailBody");
    const detailTitle = $("#detailTitle");
    const saveButton = $("#saveUserEdit");

    // View user
    $("#usersTable").on("click", ".view-btn", function () {
      const id = $(this).data("id");
      const user = users.find(u => u.id === id);
      currentEditId = null;
      detailTitle.text("User Details");
      detailBody.html(`
        <p><b>Name:</b> ${user.name}</p>
        <p><b>Email:</b> ${user.email}</p>
        <p><b>Company:</b> ${user.company.name}</p>
      `);
      saveButton.addClass("hidden");
      detailSection.removeClass("hidden");
      $('html, body').animate({scrollTop: detailSection.offset().top - 60}, 500);
    });

    // Edit user
    $("#usersTable").on("click", ".edit-btn", function () {
      const id = $(this).data("id");
      currentEditId = id;
      const user = users.find(u => u.id === id);
      detailTitle.text("Edit User");
      detailBody.html(`
        <label>Name:<input type="text" id="editName" value="${user.name}"></label><br>
        <label>Email:<input type="text" id="editEmail" value="${user.email}"></label><br>
      `);
      saveButton.removeClass("hidden");
      detailSection.removeClass("hidden");
      $('html, body').animate({scrollTop: detailSection.offset().top - 60}, 500);
    });

    // Save edit
    saveButton.on("click", function () {
      if (!currentEditId) return;
      const user = users.find(u => u.id === currentEditId);
      user.name = $("#editName").val();
      user.email = $("#editEmail").val();
      table.clear().rows.add(users).draw();
      toastr.success("User updated locally");
      detailSection.addClass("hidden");
    });

    // Delete user
    $("#usersTable").on("click", ".delete-btn", function () {
      const id = $(this).data("id");
      users = users.filter(u => u.id !== id);
      table.clear().rows.add(users).draw();
      toastr.warning("User deleted locally");
    });

    // Favorites
    $("#usersTable").on("click", ".fav-btn", function () {
      const id = $(this).data("id");
      const idx = favorites.indexOf(id);
      if (idx > -1) {
        favorites.splice(idx, 1);
        toastr.info("Removed from favorites");
      } else {
        favorites.push(id);
        toastr.success("Added to favorites");
      }
      localStorage.setItem("favorites_users", JSON.stringify(favorites));
      table.clear().rows.add(users).draw();
    });

  } catch (err) {
    toastr.error("Failed to load users");
    console.error(err);
  } finally {
    hideLoader();
  }
});

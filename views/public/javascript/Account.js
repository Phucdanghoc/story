// account.js

document.addEventListener('DOMContentLoaded', function() {
    // Lấy các phần tử DOM cần thiết
    const tabs = document.querySelectorAll('.tab');
    const sections = document.querySelectorAll('.content__section');
    const commentForm = document.getElementById('commentForm');
    const commentInput = document.getElementById('commentInput');
    const commentsList = document.getElementById('comments');
    const editProfileForm = document.getElementById('editProfileForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Mảng tên người dùng và avatar mẫu
    const usernames = ["Alice", "Bob", "Charlie", "David", "Eve", "Schwi", "Shiro", "Izuna"];
    const avatars = ["images/avt1.jpg", "images/avt2.jpg", "images/avt3.jpg", "images/schwi.png", "images/nền.jpg", "images/avt10.jpg"];

    // Hàm tạo ID ngẫu nhiên
    function generateId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    // Hàm lấy tên người dùng ngẫu nhiên
    function getRandomUsername() {
        return usernames[Math.floor(Math.random() * usernames.length)];
    }

    // Hàm lấy avatar ngẫu nhiên
    function getRandomAvatar() {
        return avatars[Math.floor(Math.random() * avatars.length)];
    }

    // Hàm tạo phần tử bình luận
    function createCommentElement(commentText) {
        const commentId = generateId();
        const comment = document.createElement("li");
        comment.classList.add("comment");
        comment.dataset.commentId = commentId;
        comment.innerHTML = `
            <div class="comments-detail">
                <div class="avt">
                    <img src="${getRandomAvatar()}" alt="Avatar">
                    <div class="nick-name">${getRandomUsername()}</div>
                </div>
                <div class="comments-info">${commentText}</div>
                <div class="comments-item">
                    <span class="comment-date">${new Date().toLocaleString()}</span>
                    <div class="comments-symbol">
                        <div class="reply-btn"><i class="fas fa-reply"></i> (<span class="reply-count">0</span>)</div>
                        <div class="delete-btn" style="color: red; cursor: pointer;"><i class="fas fa-trash"></i></div>
                    </div>
                </div>
                <div class="replies" style="display: none;"></div>
                <div class="reply-form" style="display: none;">
                    <form class="reply-form-inner row">
                        <div class="col-10"><textarea type="text" class="reply-input" placeholder="Nhập phản hồi của bạn..." required></textarea></div>
                        <div class="col-2"><button type="submit" class="send-reply"><i class="fas fa-paper-plane"></i></button></div>
                    </form>
                </div>
            </div>
        `;

        const replyBtn = comment.querySelector(".reply-btn");
        const replyCount = comment.querySelector(".reply-count");
        const repliesContainer = comment.querySelector(".replies");
        const replyForm = comment.querySelector(".reply-form");
        const replyInput = replyForm.querySelector(".reply-input");
        const deleteBtn = comment.querySelector(".delete-btn");

        deleteBtn.addEventListener("click", function() {
            if (confirm("Bạn có chắc chắn muốn xóa bình luận này không?")) {
                comment.remove();
            }
        });

        replyBtn.addEventListener("click", function() {
            replyForm.style.display = replyForm.style.display === "none" ? "block" : "none";
        });

        replyForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const replyText = replyInput.value.trim();
            if (replyText === "") return;
            const replyToReply = createReplyElement(replyText);
            repliesContainer.appendChild(replyToReply);
            replyForm.style.display = "none";
            replyCount.textContent = parseInt(replyCount.textContent) + 1;
            repliesContainer.style.display = "block";
            replyInput.value = "";
        });
        return comment;
    }

    // Hàm tạo phần tử phản hồi bình luận
    function createReplyElement(replyText) {
        const reply = document.createElement("div");
        reply.classList.add("comment", "reply");
        reply.innerHTML = `
            <div class="comments-detail">
                <div class="avt">
                    <img src="${getRandomAvatar()}" alt="Avatar">
                    <div class="nick-name">${getRandomUsername()}</div>
                </div>
                <div class="comments-info">${replyText}</div>
                <div class="comments-item">
                    <span class="comment-date">${new Date().toLocaleString()}</span>
                    <div class="comments-symbol">
                        <div class="reply-btn"><i class="fas fa-reply"></i> (<span class="reply-count">0</span>)</div>
                        <div class="delete-btn" style="color: red; cursor: pointer;"><i class="fas fa-trash"></i></div>
                    </div>
                </div>
                <div class="replies" style="display: none;"></div>
                <div class="reply-form" style="display: none;">
                    <form class="reply-form-inner row">
                        <div class="col-10"><textarea type="text" class="reply-input" placeholder="Nhập phản hồi của bạn..." required></textarea></div>
                        <div class="col-2"><button type="submit" class="send-reply"><i class="fas fa-paper-plane"></i></button></div>
                    </form>
                </div>
            </div>
        `;
        const replyBtn = reply.querySelector(".reply-btn");
        const replyCount = reply.querySelector(".reply-count");
        const repliesContainer = reply.querySelector(".replies");
        const replyForm = reply.querySelector(".reply-form");
        const replyInput = replyForm.querySelector(".reply-input");
        const deleteBtn = reply.querySelector(".delete-btn");

        deleteBtn.addEventListener("click", function() {
            if (confirm("Bạn có chắc chắn muốn xóa bình luận này không?")) {
                reply.remove();
            }
        });

        replyBtn.addEventListener("click", function() {
            replyForm.style.display = replyForm.style.display === "none" ? "block" : "none";
        });

        replyForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const replyText = replyInput.value.trim();
            if (replyText === "") return;
            const replyToReply = createReplyElement(replyText);
            repliesContainer.appendChild(replyToReply);
            replyForm.style.display = "none";
            replyCount.textContent = parseInt(replyCount.textContent) + 1;
            repliesContainer.style.display = "block";
            replyInput.value = "";
        });
        return reply;
    }

    // Xử lý gửi bình luận
    commentForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const commentText = commentInput.value.trim();
        if (commentText === "") return;
        const commentElement = createCommentElement(commentText);
        commentsList.appendChild(commentElement);
        commentInput.value = "";
    });

    // Xử lý chuyển đổi tab
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('tab--active'));
            sections.forEach(s => s.classList.remove('content__section--active'));
            tab.classList.add('tab--active');
            const tabId = tab.dataset.tab;
            document.getElementById(tabId).classList.add('content__section--active');
        });
    });

    // Xử lý gửi form chỉnh sửa thông tin cá nhân
    editProfileForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Thu thập dữ liệu từ form
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const user = document.getElementById('user').value;
         const sex = document.getElementById('sex').value;

        // Tạo đối tượng FormData để gửi dữ liệu
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('user', user);
        formData.append('sex', sex);

        try {
            // Gửi yêu cầu POST đến backend
            const response = await fetch('Account.php', { // Đường dẫn đến file PHP xử lý
                method: 'POST',
                body: formData
            });

            // Chuyển đổi phản hồi thành JSON
            const data = await response.json();

            // Xử lý phản hồi
            if (data.status === 'success') {
                // Hiển thị thông báo thành công
                successMessage.textContent = data.message;
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';

                // Cập nhật thông tin hiển thị trên trang
                document.getElementById('profileName').textContent = name;
                document.getElementById('profileFullName').textContent = name;
                document.getElementById('profileUsername').textContent = user;
                document.getElementById('storyName').textContent = name;

                // Ẩn thông báo thành công sau vài giây
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000);
            } else {
                // Hiển thị thông báo lỗi
                errorMessage.textContent = data.message;
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
            }
        } catch (error) {
            console.error('Lỗi:', error);
            errorMessage.textContent = 'Có lỗi xảy ra trong quá trình cập nhật thông tin.';
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
        }
    });

   // Thiết lập giá trị mặc định cho select
    const sexSelect = document.getElementById('sex');
    const sexValue = '<?php echo $sex; ?>'; // Lấy giá trị từ PHP
    for (let i = 0; i < sexSelect.options.length; i++) {
        if (sexSelect.options[i].value === sexValue) {
            sexSelect.options[i].selected = true;
            break;
        }
    }
});
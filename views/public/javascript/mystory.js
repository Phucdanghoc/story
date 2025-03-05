document.addEventListener("DOMContentLoaded", async function () {
    const storyContainer = document.querySelector(".container"); // Chọn phần tử để hiển thị truyện

    try {
        const response = await fetch("http://localhost:3000/api/storiesbyuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const stories = await response.json(); // Chuyển response thành JSON

        renderStories(stories); // Hiển thị truyện lên UI
    } catch (error) {
        console.error("Lỗi khi lấy danh sách truyện:", error);
    }
});

/**
 * Hiển thị danh sách truyện lên giao diện
 */
function renderStories(stories) {
    const storyContainer = document.getElementById("storyContainer");

    if (!stories.length) {
        storyContainer.innerHTML += `<p>Không có truyện nào.</p>`;
        return;
    }

    let storyHTML = '<h2>Tất cả các truyện</h2>';
    stories.forEach((story) => {
        storyHTML += `
            <div class="row g-0">
                <div class="col-md-3">
                    <img src="./${story.thumbnail || '../images/default.jpg'}" class="img-fluid" alt="Story Cover">
                </div>
                <div class="col-md-7">
                    <div class="story-details">
                        <h5 class="story-title">${story.title || "Không có tiêu đề"}</h5>
                        <p class="story-meta">Cập nhật: ${formatTime(story.updated_at)}</p>
                        <p class="story-meta">
                            <i class="fas fa-eye"></i> ${story.views || 0} -
                            <i class="fas fa-star"></i> ${story.likes || 0} -
                            <i class="fas fa-comment"></i> ${story.comments || 0}
                        </p>
                    </div>
                </div>
                <div class="col-md-2 d-flex flex-column justify-content-around align-items-center">
                    <div class="story-actions">
                        <a href="/story/edit?id=${story.id}" class="btn btn-primary btn-sm">
                            <i class="fas fa-edit"></i> Sửa
                        </a>
                    </div>
                    <div>
                        <button class="btn btn-danger btn-sm" onclick="deleteStory(${story.id})">
                            <i class="fas fa-trash"></i> Xóa
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    storyContainer.innerHTML += storyHTML;
}

/**
 * Format thời gian (ví dụ: '12 giờ trước')
 */
function formatTime(updatedAt) {
    const timeDiff = Math.floor((new Date() - new Date(updatedAt)) / (1000 * 60 * 60));
    return timeDiff < 24 ? `${timeDiff} giờ trước` : `${Math.floor(timeDiff / 24)} ngày trước`;
}

/**
 * Xóa truyện theo ID
 */
async function deleteStory(storyId) {
    if (!confirm("Bạn có chắc muốn xóa truyện này?")) return;


}

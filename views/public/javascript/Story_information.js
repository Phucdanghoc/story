document.addEventListener("DOMContentLoaded", function () {
    const pathSegments = window.location.pathname.split("/");
    const storyId = pathSegments[pathSegments.length - 1]; // Lấy phần cuối cùng của URL

    if (storyId) {
        fetchStoryData(storyId);
    }
});



// Gọi API để lấy thông tin truyện
function fetchStoryData(storyId) {
    fetch(`/api/story/${storyId}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert("Không tìm thấy truyện!");
                return;
            }
            fillStoryData(data.story, data.chapters);
        })
        .catch(error => console.error("Lỗi khi lấy dữ liệu:", error));
}

// Điền dữ liệu truyện vào giao diện
function fillStoryData(story, chapters) {
    document.querySelector(".story-name").textContent = story.title;
    document.querySelector(".story-infor ul").innerHTML = `
        <li>Tác giả: ${story.username}</li>
        <li>Thể loại: ${story.category}</li>
    `;
    document.querySelector(".story-infor p").textContent = story.description;

    // Hiển thị ảnh bìa
    if (story.thumbnail) {
        document.querySelector(".cover-photo img").src = story.thumbnail;
    }

    // Hiển thị danh sách chương
    const chapterListContainer = document.querySelector(".chapter-list .list-group");
    chapterListContainer.innerHTML = ""; 

    chapters.forEach(chap => {
        const chapItem = document.createElement("a");
        chapItem.href = `/story/${story.id}/chapter/${chap.id}`;
        chapItem.classList.add("list-group-item", "list-group-item-action", "episode");
        
        chapItem.style.fontWeight = "bold";
        chapItem.style.transition = "background-color 0.3s, color 0.3s"; 
    
        chapItem.addEventListener("mouseover", () => {
            chapItem.style.backgroundColor = "#f8f9fa";
            chapItem.style.color = "#007bff";
        });
    
        chapItem.addEventListener("mouseout", () => {
            chapItem.style.backgroundColor = "";
            chapItem.style.color = "";
        });
    
        chapItem.innerHTML = `
            <span class="episode-item-num">${chap.chapter_number}</span>
            <span class="episode-item-title">CHAP ${chap.chapter_number}: ${chap.title}</span>
        `;
        
        chapterListContainer.appendChild(chapItem);
    });
    
}

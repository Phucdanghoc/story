const STORYID = new URLSearchParams(window.location.search).get("id");
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const storyId = urlParams.get("id");

    if (storyId) {
        fetchStoryData(storyId);
    }
});
function changeContent(element, text) {
    const storyElement = document.querySelector('.story');
    const chapElement = document.querySelector('.chap');

    storyElement.style.display = text === 'Tạo tác phẩm' ? 'block' : 'none';
    chapElement.style.display = text === 'Tạo chap' ? 'block' : 'none';

    document.querySelectorAll('.word').forEach(word => {
        word.classList.remove('selected');
    });
    element.classList.add('selected');
}
// 1️⃣ Hàm gọi API lấy dữ liệu truyện
function fetchStoryData(storyId) {
    fetch(`/api/story/${storyId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            if (data.error) {
                alert("Không tìm thấy truyện!");
                return;
            }
            fillStoryData(data.story, data.chapters);
        })
        .catch(error => console.error("Lỗi khi lấy dữ liệu:", error));
}

function fillStoryData(story, chapters) {
    document.getElementById("story-title").value = story.title;
    document.getElementById("story-content").value = story.description;
    document.getElementById("category").value = story.category;
    
    // Cập nhật tiến độ
    document.querySelector(".form-select").value = story.status;

    // Nếu có ảnh bìa, hiển thị ảnh
    if (story.thumbnail) {
        document.getElementById("preview-image").src = `${story.thumbnail}`;	
    }

    const chapContainer = document.querySelector(".chap");
    if (chapters.length > 0) {
        chapContainer.style.display = "block";
        let chapList = chapters.map(chap => `<p>Chương ${chap.chapter_number}: ${chap.title}</p>`).join("");
        chapContainer.innerHTML += chapList;
    }
}

function saveStory() {
    const storyId = new URLSearchParams(window.location.search).get("id");
    if (!storyId) return alert("Không tìm thấy ID truyện!");

    const updatedStory = {
        title: document.getElementById("story-title").value,
        description: document.getElementById("story-content").value,
        category: document.getElementById("category").value,
        status: document.querySelector(".form-select").value
    };

    fetch(`/api/story/${storyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedStory)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Lưu truyện thành công!");
        } else {
            alert("Lỗi khi lưu truyện!");
        }
    })
    .catch(error => console.error("Lỗi khi cập nhật truyện:", error));
}

document.getElementById("image-upload").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("preview-image").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});
function addChapter() {
    if (!STORYID) {
        alert('Vui lòng lưu truyện trước khi thêm chương');
        return;
    }   
    window.location.href = `/create-chapter?storyId=${STORYID}`;    
}

let STORYID = null;
document.getElementById('image-upload').addEventListener('change', function() {
    var file = this.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('preview-image').setAttribute('src', e.target.result);
        }
        reader.readAsDataURL(file);
    }
});

// Validation functions
function validateTitle(title) {
    if (!title || title.trim() === '') {
        return 'Tiêu đề không được để trống';
    }
    if (title.length < 3) {
        return 'Tiêu đề phải dài hơn 3 ký tự';
    }
    if (title.length > 100) {
        return 'Tiêu đề không được dài quá 100 ký tự';
    }
    return null;
}

function validateDescription(description) {
    if (!description || description.trim() === '') {
        return 'Mô tả không được để trống';
    }
    if (description.length < 10) {
        return 'Mô tả phải dài hơn 10 ký tự';
    }
    if (description.length > 1000) {
        return 'Mô tả không được dài quá 1000 ký tự';
    }
    return null;
}

function validateCategory(category) {
    if (!category || category.trim() === '') {
        return 'Thể loại không được để trống';
    }
    return null;
}

function validateImage(fileInput) {
    const file = fileInput.files[0];
    if (!file) {
        return 'Vui lòng chọn ảnh bìa';
    }
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
        return 'Chỉ chấp nhận định dạng JPG, PNG hoặc GIF';
    }
    if (file.size > 20 * 1024 * 1024) { // 5MB limit
        return 'Kích thước ảnh không được vượt quá 5MB';
    }
    return null;
}

async function saveStory() {
    try {
        // Get form elements
        const title = document.getElementById('story-title').value;
        const description = document.getElementById('story-content').value;
        const category = document.getElementById('category').value;
        const status = document.querySelector('#status-select').value;
        const imageInput = document.getElementById('image-upload');

        // Validate inputs
        const titleError = validateTitle(title);
        const descError = validateDescription(description);
        const catError = validateCategory(category);
        const imageError = validateImage(imageInput);

        if (titleError || descError || catError || imageError) {
            alert([titleError, descError, catError, imageError]
                .filter(error => error !== null)
                .join('\n'));
            return;
        }

        // Prepare form data
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('status', status);
        formData.append('thumbnail', imageInput.files[0]);

        // Send to backend
        const response = await fetch('http://localhost:3000/api/story/new', {
            method: 'POST',
            body: formData,
            credentials: 'include' 
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Có lỗi xảy ra khi lưu truyện');
        }

        STORYID = result.storyId;
        alert('Truyện đã được lưu thành công!');
    } catch (error) {
        console.error('Error saving story:', error);
        alert(error.message || 'Có lỗi xảy ra khi lưu truyện');
    }
}

// Tab switching function (unchanged)
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
function addChapter() {
    if (!STORYID) {
        alert('Vui lòng lưu truyện trước khi thêm chương');
        return;
    }   
    window.location.href = `/create-chapter?storyId=${STORYID}`;    
}
// Initialize default view
document.querySelector('.story').style.display = 'block';
document.addEventListener('DOMContentLoaded', function () {
    const memos = JSON.parse(localStorage.getItem('memos')) || [];
    const memoPage = document.getElementById('memoPage');
    const addMemoPage = document.getElementById('addMemoPage');
    const memoDetailPage = document.getElementById('memoDetailPage');
    const memoTitleInput = document.getElementById('memoTitle');
    const memoContentInput = document.getElementById('memoContent');
    const detailTitle = document.getElementById('detailTitle');
    const detailDate = document.getElementById('detailDate');
    const detailContent = document.getElementById('detailContent');

    function showMemos() {
        const memosDiv = document.getElementById('memos');
        memosDiv.innerHTML = ''; // 목록을 초기화
        memos.forEach((memo, index) => {
            const memoDiv = document.createElement('div');
            memoDiv.innerHTML = `<span>${memo.title}</span> <span class="right">${memo.date}</span><br>`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.onclick = function(event) {
                event.stopPropagation(); // 이벤트 버블링을 막음
                memos.splice(index, 1);
                localStorage.setItem('memos', JSON.stringify(memos));
                showMemos();
            };
            memoDiv.appendChild(deleteButton);
            memoDiv.onclick = function() {
                showDetail(index);
            };
            memosDiv.appendChild(memoDiv);
            const hr = document.createElement('hr');
            memosDiv.appendChild(hr);
        });
    }

    document.getElementById('addMemo').onclick = function() {
        memoPage.classList.add('hidden');
        addMemoPage.classList.remove('hidden');
    };

    document.getElementById('saveMemo').onclick = function() {
        const title = memoTitleInput.value.trim();
        const content = memoContentInput.value.trim();
        const date = new Date().toISOString().substring(0, 10);
        if (title && content) {
            memos.push({ title, content, date });
            localStorage.setItem('memos', JSON.stringify(memos));
            memoTitleInput.value = '';
            memoContentInput.value = '';
            showMemos();
            addMemoPage.classList.add('hidden');
            memoPage.classList.remove('hidden');
        }
    };

    document.getElementById('cancel').onclick = function() {
        memoTitleInput.value = '';
        memoContentInput.value = '';
        addMemoPage.classList.add('hidden');
        memoPage.classList.remove('hidden');
    };

    document.getElementById('backToList').onclick = function() {
        memoDetailPage.classList.add('hidden');
        memoPage.classList.remove('hidden');
    };

    function showDetail(index) {
        const memo = memos[index];
        detailTitle.textContent = memo.title;
        detailDate.textContent = memo.date;
        detailContent.textContent = memo.content;
        memoPage.classList.add('hidden');
        memoDetailPage.classList.remove('hidden');
    }

    showMemos();
});
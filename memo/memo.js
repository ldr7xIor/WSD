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
    const pageTitle = document.getElementById('pageTitle');
    
    function showMemos() {
        const memosDiv = document.getElementById('memos');
        memosDiv.innerHTML = ''; // 목록을 초기화
        memos.forEach((memo, index) => {
            const memoDiv = document.createElement('div');
            memoDiv.className = 'memo-item';
            memoDiv.innerHTML = `
                <div class="memolist">
                    <span class="title">${memo.title}</span>
                    <span class="date">${memo.date}</span>
                    <button class="delete-memo">x</button>
                </div>
            `;
            memoDiv.querySelector('.delete-memo').onclick = function(event) {
                event.stopPropagation(); // 이벤트 버블링을 막음
                memos.splice(index, 1);
                localStorage.setItem('memos', JSON.stringify(memos));
                showMemos();
            };
            memoDiv.onclick = function() {
                showDetail(index);
            };
            memosDiv.appendChild(memoDiv);
        });
    }
    
    function updatePageTitle(title) {
        pageTitle.textContent = title;
    }
    
    document.getElementById('addMemo').onclick = function() {
        updatePageTitle('Memo Add');
        memoDetailPage.classList.add('hidden'); // Ensure detail page is hidden
        addMemoPage.classList.remove('hidden');
        memoPage.classList.add('hidden'); // Ensure memoPage is hidden
        memoPage.parentElement.insertBefore(addMemoPage, memoPage); // Insert addMemoPage above memoPage
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
            updatePageTitle('Memo');
            addMemoPage.classList.add('hidden');
            memoPage.classList.remove('hidden');
        }
    };
    
    document.getElementById('cancel').onclick = function() {
        memoTitleInput.value = '';
        memoContentInput.value = '';
        updatePageTitle('Memo');
        addMemoPage.classList.add('hidden');
        memoPage.classList.remove('hidden');
    };
    
    document.getElementById('backToList').onclick = function() {
        updatePageTitle('Memo');
        memoDetailPage.classList.add('hidden');
        memoPage.classList.remove('hidden');
    };
    
    function showDetail(index) {
        const memo = memos[index];
        detailTitle.textContent = memo.title;
        detailDate.textContent = memo.date;
        detailContent.textContent = memo.content;
        updatePageTitle('Memo Detail');
        memoDetailPage.classList.remove('hidden');
        addMemoPage.classList.add('hidden'); // Ensure addMemoPage is hidden
        memoPage.classList.add('hidden'); // Ensure memoPage is hidden
        memoPage.parentElement.insertBefore(memoDetailPage, memoPage); // Insert memoDetailPage above memoPage
    }
    
    
    showMemos();
    });
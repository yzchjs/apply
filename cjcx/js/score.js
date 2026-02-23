// 页面初始化
function initializeScorePage() {
    // 从sessionStorage获取当前用户数据
    const currentUserData = sessionStorage.getItem('currentUser');
    
    if (!currentUserData) {
        // 如果没有用户数据，返回search.html
        alert('请先进行身份验证！');
        window.location.href = 'search.html';
        return;
    }
    
    const userData = JSON.parse(currentUserData);
    
    // 渲染用户成绩数据
    renderUserScore(userData);
    
    // 设置返回按钮事件
    setupReturnButton();
}

// 渲染用户成绩数据
function renderUserScore(userData) {
    const userScoreList = document.querySelector('.user-score-list');
    
    if (!userScoreList) return;
    
    // 清空现有列表
    userScoreList.innerHTML = '';
    
    // 定义要显示的字段映射
    const fieldMapping = {
        'name': '姓名',
        'enroll-number': '报名号',
        'exam-number': '准考证号',
        'total-score': '总分',
        'first-subject': '第一门',
        'second-subject': '第二门',
        'third-subject': '第三门',
        'fourth-subject': '第四门',
        'remark': '备注'
    };
    
    // 根据映射关系渲染数据
    Object.keys(fieldMapping).forEach(key => {
        if (userData[key]) {
            const li = document.createElement('li');
            li.className = 'user-score-item';
            
            const labelSpan = document.createElement('span');
            labelSpan.className = 'user-score-item-label';
            labelSpan.textContent = fieldMapping[key];
            
            const valueSpan = document.createElement('span');
            valueSpan.className = 'user-score-item-value';
            valueSpan.textContent = userData[key];
            
            li.appendChild(labelSpan);
            li.appendChild(valueSpan);
            userScoreList.appendChild(li);
        }
    });
}

// 设置返回按钮
function setupReturnButton() {
    const returnButton = document.querySelector('.button button');
    
    if (returnButton) {
        returnButton.addEventListener('click', function() {
            // 返回search.html
            window.location.href = 'index.html';
        });
    }
}

// 页面加载完成后执行初始化
document.addEventListener('DOMContentLoaded', initializeScorePage);
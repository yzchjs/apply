// 获取URL参数
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// 页面初始化
function initializeSearchPage() {
    // 获取从v1.html传递过来的examUnit参数（URL参数方式）
    const examUnit = getUrlParameter('examUnit');
    
    // 获取从sessionStorage中获取的学校名称（sessionStorage方式）
    const selectedSchool = sessionStorage.getItem('selectedSchool');
    
    const examUnitInput = document.getElementById('exam-unit');
    
    // 优先使用sessionStorage中的数据（更可靠）
    if (selectedSchool && examUnitInput) {
        examUnitInput.value = selectedSchool;
        // 使用完后清除sessionStorage中的数据
        sessionStorage.removeItem('selectedSchool');
    } else if (examUnit && examUnitInput) {
        // 如果sessionStorage中没有，则使用URL参数
        examUnitInput.value = decodeURIComponent(examUnit);
    }
    
    // 设置表单提交事件监听器
    setupFormSubmission();
}

// 设置表单提交事件
function setupFormSubmission() {
    const submitButton = document.querySelector('.button button');
    
    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            validateAndSubmitForm();
        });
    }
}

// 验证表单并提交
function validateAndSubmitForm() {
    const name = document.getElementById('name').value.trim();
    const idCard = document.getElementById('id-card').value.trim();
    const examNumber = document.getElementById('exam-number').value.trim();
    const examUnit = document.getElementById('exam-unit').value.trim();
    
    // 验证必填字段
    if (!name || !idCard || !examNumber || !examUnit) {
        alert('身份信息不能为空');
        return;
    }
    
    // 验证身份证格式（基本验证）
    if (!validateIdCard(idCard)) {
        alert('请输入正确的身份信息。');
        return;
    }
    
    // 从user-score.json加载用户数据进行验证
    fetch('user-score.json')
        .then(response => response.json())
        .then(data => {
            const userScoreData = data['user-score'];
            
            // 查找匹配的用户
            const matchedUser = userScoreData.find(user => 
                user.name === name && 
                user['id-card'] === idCard && 
                user['exam-number'] === examNumber
            );
            
            if (matchedUser) {
                // 验证成功，保存用户数据到sessionStorage并跳转到score.html
                sessionStorage.setItem('currentUser', JSON.stringify(matchedUser));
                window.location.href = 'score.html';
            } else {
                // 验证失败
                alert('信息错误，请重新输入信息');
            }
        })
        .catch(error => {
            console.error('加载用户数据失败:', error);
            alert('系统错误，请稍后重试！');
        });
}

// 验证身份证号码格式
function validateIdCard(idCard) {
    // 基本格式验证：18位，前17位数字，最后一位可以是数字或X
    const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dX]$/;
    return idCardRegex.test(idCard);
}

// 页面加载完成后执行初始化
document.addEventListener('DOMContentLoaded', initializeSearchPage);
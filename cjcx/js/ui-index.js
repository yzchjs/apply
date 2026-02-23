// 设备检测和CSS动态引入功能
(function() {
    // 检测设备类型
    function detectDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent);
        return isMobile ? 'mobile' : 'desktop';
    }

    // 动态引入CSS文件
    function loadCSS(href) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }

    // 根据设备类型引入对应的CSS
    function loadDeviceSpecificCSS() {
        const device = detectDevice();
        
        // 移除现有的CSS文件（保留其他样式表）
        const existingCSS = document.querySelector('link[href="css/mb-index.css"]');
        if (existingCSS) {
            existingCSS.remove();
        }

        if (device === 'mobile') {
            // 移动端引入mb-index.css
            loadCSS('css/mb-index.css');
        } else {
            // 桌面端引入index.css
            loadCSS('css/dt-index.css');
        }
    }

    // 页面加载完成后执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadDeviceSpecificCSS);
    } else {
        loadDeviceSpecificCSS();
    }
})();
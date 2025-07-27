// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    }
}

// 显示加载动画
function showLoading() {
    Swal.fire({
        title: '搜索中...',
        html: '正在获取数据，请稍候',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
}

// 渲染搜索结果
function renderResults(data) {
    const resultsContainer = $('.user');
    if (!data.results || data.results.length === 0) {
        resultsContainer.html(`
            <tr>
                <td colspan="2" class="text-center py-8">
                    <i class="fa fa-info-circle text-gray-500 mr-2"></i>
                    <span class="text-gray-500">未找到相关库</span>
                </td>
            </tr>
        `);
        return;
    }

    let html = `
        <tr>
            <th class="w-1/3 px-4 py-3 text-left text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700">库名</th>
            <th class="w-2/3 px-4 py-3 text-left text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700">引用地址</th>
        </tr>
    `;

    data.results.forEach(item => {
        html += `
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td class="px-4 py-4">
                    <div class="mb-1">
                        <strong class="text-gray-900 dark:text-white">${item.name}</strong>
                        ${item.version ? `<span class="ml-2 px-2 py-1 text-xs bg-primary/10 text-primary rounded">${item.version}</span>` : ''}
                    </div>
                    ${item.description ? `<p class="text-sm text-gray-500 dark:text-gray-400">${item.description}</p>` : ''}
                </td>
                <td class="px-4 py-4">
                    <div class="flex rounded-md shadow-sm">
                        <input type="text" value="${item.latest}" readonly 
                            class="flex-1 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-0">
                        <button onclick="copyToClipboard(this)" 
                            class="rounded-r-md border border-l-0 border-primary bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none">
                            复制
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });

    resultsContainer.html(html);
    
    // 更新数量显示
    if (data.total) {
        $('.package-amount strong').text(data.total);
    }
}

// 复制到剪贴板
function copyToClipboard(button) {
    const input = $(button).siblings('input')[0];
    input.select();
    document.execCommand('copy');
    
    // 显示复制成功提示
    Swal.fire({
        title: '复制成功',
        text: '链接已复制到剪贴板',
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500
    });
}

// 执行搜索
const search = debounce(function () {
    const searchInput = document.getElementById("text");
    const keyword = searchInput.value.trim();
    
    if (!keyword) {
        Swal.fire({
            title: '提示',
            text: '请输入要搜索的内容',
            icon: 'warning',
            confirmButtonColor: '#27ae60'
        });
        return;
    }

    const dropBox = document.getElementById("common-packages");
    dropBox.style.display = "none";
    
    showLoading();

    $.ajax({
        type: "get",
        url: "https://api.cdnjs.com/libraries?search=" + encodeURIComponent(keyword),
        dataType: "json",
        timeout: 5000, // 增加超时时间到5秒
        success: function (response) {
            try {
                const reg = new RegExp("cdnjs.cloudflare.com", "g");
                const data = JSON.parse(JSON.stringify(response).replace(reg, 'cdnjs.quickso.cn'));
                Swal.close();
                renderResults(data);
            } catch (error) {
                console.error('数据处理错误:', error);
                Swal.fire({
                    title: '错误',
                    text: '数据处理出错，请重试',
                    icon: 'error',
                    confirmButtonColor: '#27ae60'
                });
            }
        },
        error: function (xhr, status, error) {
            console.error('请求错误:', error);
            Swal.fire({
                title: '错误',
                text: status === 'timeout' ? '请求超时，请重试' : '网络错误，请检查网络连接',
                icon: 'error',
                confirmButtonColor: '#27ae60'
            });
        }
    });
}, 500); // 500ms 的防抖延迟

// 加载常用包
function loadCommonPackages() {
    $.getJSON('js/common-packages.json')
        .then(function(packages) {
            const container = $('#common-packages');
            packages.forEach(pkg => {
                container.append(`
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">${pkg.name}</h3>
                                <span class="inline-block mt-1 px-2 py-1 text-xs bg-primary/10 text-primary rounded">${pkg.version}</span>
                            </div>
                        </div>
                        <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">${pkg.description}</p>
                        <div class="flex rounded-md shadow-sm">
                            <input type="text" value="${pkg.url}" readonly 
                                class="flex-1 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-0">
                            <button onclick="copyToClipboard(this)" 
                                class="rounded-r-md border border-l-0 border-primary bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none">
                                复制
                            </button>
                        </div>
                    </div>
                `);
            });
        })
        .catch(function(error) {
            console.error('加载常用包失败:', error);
        });
}

// 获取库总数
function fetchTotalLibraries() {
    $.ajax({
        type: "get",
        url: "https://api.cdnjs.com/libraries",
        dataType: "json",
        success: function (response) {
            if (response.total) {
                $('#total-libraries').text(response.total.toLocaleString('zh-CN'));
            }
        },
        error: function (xhr, status, error) {
            $('#total-libraries').text('加载中...');
            console.error('获取总数失败:', error);
        }
    });
}

// DOM 加载完成后绑定事件
$(document).ready(function() {
    // 加载常用包
    loadCommonPackages();
    
    // 获取库总数
    fetchTotalLibraries();

    // 添加回车键搜索支持
    $('#text').on('keypress', function(e) {
        if (e.key === 'Enter') {
            search();
        }
    });

    // 点击搜索图标触发搜索
    $('.fa-search').on('click', search);
});

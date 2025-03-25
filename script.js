function openTab(evt, tabName) {
    // Ẩn thông điệp chào mừng
    const welcomeMessage = document.getElementById('welcomeMessage');
    welcomeMessage.classList.add('hidden');

    // Ẩn tất cả các tab
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Xóa trạng thái active của các tablinks
    const tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Hiển thị tab được chọn
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Nút "Quay lại" - Đưa về giao diện ban đầu
document.getElementById('backButton').addEventListener('click', function() {
    // Ẩn tất cả các tab
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Xóa trạng thái active của các tablinks
    const tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Hiển thị thông điệp chào mừng
    const welcomeMessage = document.getElementById('welcomeMessage');
    welcomeMessage.classList.remove('hidden');

    // Ẩn thông tin sản phẩm
    const productInfo = document.getElementById('productInfo');
    productInfo.classList.add('hidden');

    // Ẩn kết quả quét mã và màn hình điều chỉnh
    const scanResult = document.getElementById('scanResult');
    const adjustScreen = document.getElementById('adjustScreen');
    scanResult.classList.add('hidden');
    adjustScreen.style.display = 'none';

    // Reset các giá trị trong tab "Quét mã"
    document.getElementById('qrCode').textContent = '';
    document.getElementById('qrName').textContent = '';
    document.getElementById('qrInfo').textContent = '';
    document.getElementById('qrTemp').textContent = '';
    document.getElementById('qrHumid').textContent = '';
    document.getElementById('qrTempWarning').style.display = 'none';
    document.getElementById('adjustButton').disabled = true;
});

// Tab "Sản phẩm"
document.querySelector('.tablinks[onclick="openTab(event, \'Products\')"]').addEventListener('click', function() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    loadProducts();
});

function loadProducts() {
    const products = [
        { 
            name: "Hộp giữ nhiệt Eco", 
            material: "Thủy tinh: borosilicate, Inox: panel inox, Pin: Lithium, Nhựa: HDPE", 
            info: "Bảo quản thực phẩm, giữ 100% dinh dưỡng trong thời gian từ 3-7 ngày", 
            image: "anh1.jpg", 
            size: "S", 
            price: "799,000" 
        },
        { 
            name: "Hộp giữ nhiệt Pro", 
            material: "Thủy tinh: borosilicate, Inox: panel inox, Pin: Lithium, Nhựa: HDPE", 
            info: "Bảo quản thực phẩm, giữ 100% dinh dưỡng trong thời gian từ 3-7 ngày", 
            image: "anh2.jpg", 
            size: "M", 
            price: "1,399,000" 
        },
        { 
            name: "Hộp giữ nhiệt Luxury", 
            material: "Thủy tinh: borosilicate, Inox: panel inox, Pin: Lithium, Nhựa: HDPE", 
            info: "Bảo quản thực phẩm, giữ 100% dinh dưỡng trong thời gian từ 3-7 ngày", 
            image: "anh3.jpg", 
            size: "L", 
            price: "1,899,000" 
        }
    ];
    const productList = document.getElementById('productList');
    const productInfo = document.getElementById('productInfo');
    productList.innerHTML = '';

    products.forEach(product => {
        const item = `
            <div class="product-item" data-name="${product.name}" data-material="${product.material}" data-info="${product.info}" 
                 data-size="${product.size}" data-price="${product.price}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
            </div>`;
        productList.innerHTML += item;
    });

    const items = document.querySelectorAll('.product-item');
    items.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const name = this.getAttribute('data-name');
            const material = this.getAttribute('data-material');
            const info = this.getAttribute('data-info');
            const size = this.getAttribute('data-size');
            const price = this.getAttribute('data-price');

            productInfo.innerHTML = `
                <h3>${name}</h3>
                <p><strong>Vật liệu:</strong> ${material}</p>
                <p><strong>Thông tin:</strong> ${info}</p>
                <p class="price"><strong>Giá (Size ${size}):</strong> ${price} VND</p>
            `;
            productInfo.classList.remove('hidden');
        });
    });

    productList.addEventListener('mouseleave', function() {
        productInfo.classList.add('hidden');
    });
}

// Tab "Quét mã"
document.getElementById('scanButton').addEventListener('click', function() {
    const qrCode = 'QR' + Math.random().toString(36).substr(2, 8).toUpperCase();
    const qrNames = ["Hộp Eco", "Hộp Pro", "Hộp Luxury"];
    const qrName = qrNames[Math.floor(Math.random() * qrNames.length)];
    const qrInfos = ["Giữ nóng 12h, lạnh 24h", "Nhỏ gọn, tiện lợi", "Thiết kế sang trọng"];
    const qrInfo = qrInfos[Math.floor(Math.random() * qrInfos.length)];
    const qrTemp = Math.floor(Math.random() * 101); // Nhiệt độ ngẫu nhiên từ 0-100
    const qrHumid = Math.floor(Math.random() * 101); // Độ ẩm ngẫu nhiên từ 0-100

    // Debug: In giá trị nhiệt độ ra console
    console.log("Nhiệt độ (qrTemp):", qrTemp);

    // Reset các giá trị
    document.getElementById('qrCode').textContent = '';
    document.getElementById('qrName').textContent = '';
    document.getElementById('qrInfo').textContent = '';
    document.getElementById('qrTemp').textContent = '';
    document.getElementById('qrHumid').textContent = '';
    document.getElementById('qrTempWarning').classList.add('hidden'); // Ẩn cảnh báo trước
    document.getElementById('scanResult').classList.add('hidden');

    // Cập nhật giá trị mới
    document.getElementById('qrCode').textContent = qrCode;
    document.getElementById('qrName').textContent = qrName;
    document.getElementById('qrInfo').textContent = qrInfo;
    document.getElementById('qrTemp').textContent = qrTemp;
    document.getElementById('qrHumid').textContent = qrHumid;
    document.getElementById('scanResult').classList.remove('hidden');
    document.getElementById('adjustButton').disabled = false;

    // Kiểm tra nhiệt độ và hiển thị cảnh báo (ngưỡng 20°C)
    const qrTempWarning = document.getElementById('qrTempWarning');
    if (qrTemp > 20) {
        console.log("Nhiệt độ > 20°C, hiển thị cảnh báo");
        qrTempWarning.classList.remove('hidden');
    } else {
        console.log("Nhiệt độ <= 20°C, ẩn cảnh báo");
        qrTempWarning.classList.add('hidden');
    }
});

// Nút "Điều chỉnh"
document.getElementById('adjustButton').addEventListener('click', function() {
    document.getElementById('adjustScreen').style.display = 'block';
    const qrTemp = parseInt(document.getElementById('qrTemp').textContent);
    const qrHumid = parseInt(document.getElementById('qrHumid').textContent);

    const tempSlider = document.getElementById('tempSlider');
    const currentTemp = document.getElementById('currentTemp');
    tempSlider.value = qrTemp;
    currentTemp.textContent = qrTemp;
    tempSlider.oninput = function() {
        currentTemp.textContent = tempSlider.value;
    };

    const humidSlider = document.getElementById('humidSlider');
    const currentHumid = document.getElementById('currentHumid');
    humidSlider.value = qrHumid;
    currentHumid.textContent = qrHumid;
    humidSlider.oninput = function() {
        currentHumid.textContent = humidSlider.value;
    };
});

// Nút "Đóng"
document.getElementById('closeAdjust').addEventListener('click', function() {
    document.getElementById('adjustScreen').style.display = 'none';
});

// Nút "Lưu"
document.getElementById('saveAdjust').addEventListener('click', function() {
    const newTemp = document.getElementById('tempSlider').value;
    const newHumid = document.getElementById('humidSlider').value;
    document.getElementById('qrTemp').textContent = newTemp;
    document.getElementById('qrHumid').textContent = newHumid;
    document.getElementById('adjustScreen').style.display = 'none';

    // Debug: In giá trị nhiệt độ mới
    console.log("Nhiệt độ mới (newTemp):", newTemp);

    // Kiểm tra nhiệt độ sau khi điều chỉnh (ngưỡng 20°C)
    const qrTempWarning = document.getElementById('qrTempWarning');
    if (parseInt(newTemp) > 20) {
        console.log("Nhiệt độ mới > 20°C, hiển thị cảnh báo");
        qrTempWarning.classList.remove('hidden');
    } else {
        console.log("Nhiệt độ mới <= 20°C, ẩn cảnh báo");
        qrTempWarning.classList.add('hidden');
    }
});
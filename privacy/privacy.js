        let password = localStorage.getItem("password");
        let savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];

        function setCookie(name, value, days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            const expires = "expires=" + date.toUTCString();
            document.cookie = name + "=" + value + ";" + expires + ";path=/";
        }

        function getCookie(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for(let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        function promptPassword() {
            if (!getCookie("passwordSet")) {
                password = prompt("비밀번호를 생성하세요:");
                if (password === null) {
                    return;
                }
                localStorage.setItem("password", password);
                setCookie("passwordSet", true, 365);
                alert("비밀번호가 설정되었습니다.");
            } else {
                password = localStorage.getItem("password");
            }

            let inputPassword = prompt("비밀번호를 입력하세요:");
            while (inputPassword !== password) {
                alert("비밀번호가 일치하지 않습니다.");
                inputPassword = prompt("비밀번호를 입력하세요:");
                if (inputPassword === null) {
                    return;
                }
            }
            document.body.style.display = "";
        }

        window.onload = function() {
            promptPassword();
            renderItems();
        }

        function toggleForm() {
            const formContainer = document.getElementById("formContainer");
            if (formContainer.classList.contains("hidden")) {
                formContainer.classList.remove("hidden");
            } else {
                formContainer.classList.add("hidden");
            }
        }

        function addItem() {
            const site = document.getElementById("site").value;
            const pwd = document.getElementById("password").value;
            const confirmPwd = document.getElementById("confirmPassword").value;

            if (pwd !== confirmPwd) {
                alert("비밀번호가 일치하지 않습니다.");
                return;
            }

            const item = {
                site: site,
                password: pwd,
                date: new Date().toLocaleString()
            };

            savedItems.push(item);
            localStorage.setItem("savedItems", JSON.stringify(savedItems));
            renderItems();
            resetForm();
            toggleForm(); // 폼을 추가한 후 숨깁니다.
        }

        function resetForm() {
            document.getElementById("site").value = '';
            document.getElementById("password").value = '';
            document.getElementById("confirmPassword").value = '';
        }

        function renderItems() {
            const list = document.getElementById("savedList");
            list.innerHTML = '';
            savedItems.forEach((item, index) => {
                const listItem = document.createElement("div");
                listItem.innerHTML = `
                    <span onclick="viewDetail(${index})">${item.site}</span>
                    <button onclick="deleteItem(${index})">x</button>
                `;
                list.appendChild(listItem);
            });
        }

        function viewDetail(index) {
            sessionStorage.setItem("detailIndex", index);
            window.location.href = "privacy_detail.html";
        }

        function deleteItem(index) {
            savedItems.splice(index, 1);
            localStorage.setItem("savedItems", JSON.stringify(savedItems));
            renderItems();
        }
# 老爸的私房零用錢
創建自己帳戶管理每日支出的記帳網頁程式。

首頁
![index](./public/images/index.png)

新增支出
![create](./public/images/create.png)

修改支出內容
![edit](./public/images/edit.png)

篩選
![filter](./public/images/filter.png)

使用者註冊頁
![register](./public/images/register.png)

使用者登入頁
![login](./public/images/login.png)

Flash message notice
![flash_login](./public/images/flash_msg_login.png)
![flash_warning](./public/images/flash_msg_warning.png)
![flash_logout](./public/images/flash_msg_logout.png)

# 功能詳情
## 登入及註冊
+ 使用者註冊及認證功能(flash message提示錯誤訊息)。
+ 可使用Facebook、Google帳號登入。
+ 可點選logout登出使用者。
+ 使用bcrypt儲存 & 驗證使用者密碼。
## 使用者權限功能
+ 可在首頁看到個人所有支出列表。
+ 可透過支出類別篩選。
+ 可新增支出(包含資料驗證)。
+ 可編輯支出內容(包含資料驗證)。
+ 可刪除支出項目。

# 安裝執行
1. 確認安裝node.js & npm。
2. 開啟Terminal將專案 clone 至本地位置：
```
git clone https://github.com/Gincoolwant/expense-tracker.git
```
3. 開啟Terminal並移至專案資料夾安裝使用套件： 
```
npm install
```
4. 設定環境變數，新增.env檔案(請參考.env.example)：
```
FACEBOOK_CLIENT_ID = #Meta for Developers應用程式編號
FACEBOOK_CLIENT_SECRET = #Meta for Developers應用程式密鑰
FACEBOOK_CALLBACK_URL = http://localhost:3000/auth/facebook/callback
GOOGLE_CLIENT_ID = #Google Cloud console OAuth 2.0 用戶端編號
GOOGLE_CLIENT_SECRET = #Google Cloud console OAuth 2.0 用戶端密鑰
GOOGLE_CALLBACK_URL = http://localhost:3000/auth/google/callback
MONGODB_URI = #MongoDB connect string
SESSION_SECRET = #自取SESSION SECRET ex:ThisIsSessionSecret 
PORT = 3000
```
5. 寫入種子資料
```
npm run seed
```
寫入完成後，終端機會看到提示完成訊息
```
mongodb is connecting
category seeder done.
mongodb is connecting
record seeder done.
```
6. 執行專案：
```
npm run start
```

成功連線時，終端機會看見訊息： `connecting to http://localhost:3000`與`mongodb is connecting`，請開啟瀏覽器輸入網址 http://localhost:3000 進入首頁。

7. 可自行註冊或使用facebook & google帳號登入，可直接使用以下測試使用者
```
測試者一號
email: test1@test.com
password: test1

測試者二號
email: test2@test.com
password: test2
```

# 開發環境與工具
+ [Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/)
+ [Node.js@16.17.0](https://nodejs.org/en/)
+ [Express@4.16.4](https://www.npmjs.com/package/express)
+ [Express-Handlebars@3.0.0](https://www.npmjs.com/package/express-handlebars)
+ [Bootstrap@v5.2](https://getbootstrap.com/)
+ [Font-awesome@6.2.0](https://fontawesome.com/)
+ [Body-parser@1.20.1](https://www.npmjs.com/package/body-parser)
+ [Method-override@3.0.0](https://www.npmjs.com/package/method-override)
+ [MongoDB Cloud](https://www.mongodb.com/)
+ [Mongoose@5.9.7](https://mongoosejs.com/)
+ [bcryptjs@2.4.3](https://www.npmjs.com/package/bcryptjs)
+ [bootstrap-icons@1.9.1](https://icons.getbootstrap.com/)
+ [connect-flash@0.1.1](https://www.npmjs.com/package/connect-flash)
+ [dotenv@16.0.3](https://www.npmjs.com/package/dotenv)
+ [express-session@1.17.3](https://www.npmjs.com/package/express-session)
+ [passport@0.6.0](https://www.npmjs.com/package/passport)
+ [passport-local@1.0.](https://www.passportjs.org/)
+ [passport-facebook@3.0.0](https://www.passportjs.org/)
+ [passport-google-oauth20@2.0.0](https://www.passportjs.org/)

# 開發人員
[CK](https://github.com/Gincoolwant)
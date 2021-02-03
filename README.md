# **ZoeHYH Blog**
[Demo](https://blog.zoehyh.tw/)

一個具備文章與會員系統的部落格，注重介面與使用者體驗。

  ![首頁](https://res.cloudinary.com/zoehyh/video/upload/c_scale,q_auto:eco,w_1080/e_loop/v1612358750/zoehyh_blog/%E9%A6%96%E9%A0%81.gif)

前端使用 React 搭配 Redux 建構 RWD 網站，並使用 Node.js 與 Express 建構後端 RESTful API，搭配 Sequelize CLI 以 ORM 方式操作資料庫，使用 nginx 反向代理部署於 AWS。

## **目錄**
[功能](#功能)
[使用技術](#使用技術)
[運行專案](#運行專案)
[API](#API)
[檔案結構](#檔案結構)

## **功能**
### **前端**
- 首頁可以看到最近發布的文章。
- 可以註冊部落格。
  ![註冊](https://res.cloudinary.com/zoehyh/video/upload/c_scale,q_auto:eco,w_1080/e_loop/v1612358750/zoehyh_blog/%E8%A8%BB%E5%86%8A.gif)
- 可以登入部落格。
  ![登入](https://res.cloudinary.com/zoehyh/video/upload/c_scale,q_auto:eco,w_1080/e_loop/v1612358750/zoehyh_blog/%E7%99%BB%E5%85%A5.gif)
- 文章列表有分頁與分類機制。
  ![文章列表](https://res.cloudinary.com/zoehyh/video/upload/c_scale,q_auto:eco,w_1080/e_loop/v1612358750/zoehyh_blog/%E6%96%87%E7%AB%A0%E5%88%97%E8%A1%A8.gif)
- 可以在導覽列搜尋文章，或是直接修改網址列進行搜尋。
  ![搜尋](https://res.cloudinary.com/zoehyh/video/upload/c_scale,q_auto:eco,w_1080/e_loop/v1612358750/zoehyh_blog/%E6%90%9C%E5%B0%8B.gif)
- 可以發布文章並上傳圖片，可以選擇輸入網址或上傳檔案。
  ![發布文章](https://res.cloudinary.com/zoehyh/video/upload/c_scale,q_auto:eco,w_1080/e_loop/v1612358750/zoehyh_blog/%E7%99%BC%E5%B8%83%E6%96%87%E7%AB%A0.gif)
- 登入後可以在單一文章頁面編輯文章。
  ![編輯](https://res.cloudinary.com/zoehyh/video/upload/c_scale,q_auto:eco,w_1080/e_loop/v1612358750/zoehyh_blog/%E7%B7%A8%E8%BC%AF.gif)
- 登入可以刪除文章。
  ![刪除](https://res.cloudinary.com/zoehyh/video/upload/c_scale,q_auto:eco,w_1080/e_loop/v1612358750/zoehyh_blog/%E5%88%AA%E9%99%A4.gif)
- 盡量將頁面元素拆分成 Components 方便後續建構管理。
- 圖片依照使用者的裝置與螢幕下載不同版本，提升使用者體驗。

### **後端**
- 資料庫不存明碼，密碼 Hash 後存入資料庫。
- 使用 JWT Token 機制驗證使用者身份。
- 文章 API 可以用 Query Params 方式選擇排序、搜尋或是分頁，甚至回傳已刪除文章。
- 文章使用 Soft Delete 方式刪除，可以回復誤刪文章。
- 分類單獨使用資料表管理，並與文章資料表是一對多關係。
- 依錯誤類型建立 Error 類別設定對應 HTTP Status，並用 middleware 統一發送錯誤 Response。

## **使用技術**
### **前端**
- 使用 React 建立專案。
- 使用 Redux 管理狀態，並使用 Redux-toolkit 及 redux-thunk 輔助創建 Reducer，並執行 AJAX 非同步指令。
- 使用 Fetch 與 Async / Await 語法 AJAX 串接後端 API。
- 使用 React Router DOM 實作路由。
- 使用 JSX 建立 Components。
- 使用 PropTypes 驗證傳入 Components 的 Props。
- 使用 Prettier 統一程式碼。

### **後端**
- 使用 Express 建構後端專案。
- 使用 Squelize CLI 以 ORM 方式管理資料庫。
- 使用 cors 套件解決同源政策問題。
- 使用 jsonwebtoken 套件建構以 JWT Token 機制驗證身份的 middleware。
- 使用自定義的 Error 類別與 middleware 統一發回錯誤 Response。
- 在演示版中使用 Express 運行作為伺服器運行前端。

## 運行專案
事先必須安裝 Node.js 與 MySQL 資料庫。
1. 下載專案
2. 在根目錄、`client` 與 `server` 資料夾分別運行一次指令以下載套件。
    ```
    npm install
    ```
3. 為後端建立資料庫，於修改設定 並創建資料庫。
    
    輸入以下指令創建 `config.json` 檔案並輸入連接資料庫所需的資料。
    ```
    npx sequelize init:config
    ```
    創建資料庫並建立資料表。
    ```
    npx sequelize db:create
    npx sequelize db:migrate
    ```
4. 我們必須為後端提供環境變數，由於開發模式會進入 `server` 資料夾運行後端，我們必須在 `server` 資料夾裡建立 `.env` 檔案，指定 `SECRET` 與 `PASSWORD`。
    ```
    SECRET="your secret"
    PASSWORD="your admin password"
    ```
5. 在根目錄輸入指令同時運行起前端與後端。
    ```
    npm run dev
    ```
6. 前端開發完成需在 `client` 內運行指令更新後端伺服器運行的檔案。
    ```
    npm run build
    ```
7. 開發完成可以直接在根目錄輸入指令運行後端，除了提供 API，也會作為伺服器向客戶端提供前端，請注意要在根目錄運行程式，必須改在根目錄建立 `.env` 檔案提供環境變數。
    ```
    node server/index.js
    ```

## API
Root Path：[https://blog.zoehyh.tw/api](https://blog.zoehyh.tw/api)

### 文章
- 列出所有文章 `GET` /posts
  - 可用的 Query Params
    - _offset：預設 `0`
    - _limit：預設 `10`
    - _sort：預設 `updatedAt`
    - _order：預設 `desc，也可選` `asc`
    - query：輸入想搜尋的字詞
    - page：預設 `0`
    - id：輸入文章 `id`
    - title：輸入文章標題
    - deleted：是否包含已刪除文章，預設不包含，輸入任意值就表示要包含
- 新增文章 `POST` /posts
- 更新文章 `PATCH` /posts/:id
- 刪除文章 `DELETE` /posts/:id
- 恢復刪除文章 `PATCH` /posts/:id/restore

### 使用者
- 驗證使用者 `GET` /users/verify
- 註冊 `POST` /users/register
- 登入 `POST` /users/login

### 文章類別
- 列出所有文章類別 `GET` /categories
- 列出單一文章類別 `GET` /categories/:id
- 新增文章類別 `POST` /categories
- 更新文章類別 `PUT` /categories/:id
- 刪除文章類別 `DELETE` /categories/:id

## 檔案結構
- .env
- server
  - index.js
  - .env
  - controllers
    - user.js
    - post.js
    - category.js
  - config/config,json
  - migrations
    - XXXXXXXXXXXXXX-create-user.js
    - XXXXXXXXXXXXXX-create-post.js
    - XXXXXXXXXXXXXX-create-category.js
  - models
    - index.js
    - user,js
    - post.js
    - category.js
  - middlewares/auth.js
  - utils/error.js
- client
  - src
    - index.js
    - utils.js
    - WebAPI.js
    - redux
      - reducers
        - userReducer.js
        - postReducer.js
      - store.js
    - page
     - HomePage.js
     - ListPage.js
     - AboutPage.js
     - ArticlePage.js
     - ResultPage.js
     - RegisterPage.js
     - LoginPage.js
     - PostPage.js
     - EditPage.js
    - components
      - Blog
        - Blog.js
        - Blog.test.js
        - index.js
      - GlobalStyles.js
      - Text.js
      - Line.js
      - Button.js
      - Link.js
      - Image.js
      - Card.js
      - Layout.js
      - Animation.js
      - Logo.js
      - Loader.js
      - Nav.js
      - Navbar.js
      - Footer.js
    - constants
      - text.js
      - variable.js
    - image
  - public
  - build

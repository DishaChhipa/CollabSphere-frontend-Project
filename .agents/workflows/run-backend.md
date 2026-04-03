---
description: How to run the CollabSphere backend server
---

Follow these steps to start the Spring Boot backend on `http://localhost:3030`:

1.  Open a new terminal.
2.  Navigate to the `backend_api` directory:
    ```powershell
    cd "c:\Users\PC\Desktop\Minor Project\frontend\backend_api"
    ```
// turbo
3.  Run the application using the Maven wrapper:
    ```powershell
    .\mvnw.cmd spring-boot:run
    ```

> [!NOTE]
> The backend uses an H2 in-memory database by default. Data will be reset on every restart.

        const clientId = "d548203f7ceb4dd6a56164a2e97c3f17";
        const redirectUri = "http://127.0.0.1:5500/project-milestone-2-geohits/index.html?"; // Replace with your own URL
        // const redirectUri = new URL("./landing.html", window.location.href).href; // Needed for demo, since it may be hosted elsewhere

        // check for code returned
        // get token using code
        // save token to localstorage

        // (1) Get the authorization code from the URL

        const urlParams = new URLSearchParams(window.location.search);
        const authCode = urlParams.get("code");

        // If there is no code, redirect to the login page
        if (authCode) {
            console.log("No authorization code found!");
            const codeVerifier = localStorage.getItem("demo_code_verifier");

        // If there is no code verifier, redirect to the login page
        if (!codeVerifier) {
            console.log("No code verifier found!");
            window.location.href = "index.html";
        }

        // (3) Exchange the authorization code for an access token
        
        const getAccessToken = async () => {
            try {
                console.log(authCode)
                const data = await getToken(clientId, redirectUri, authCode, codeVerifier);
                console.log(data);

                // Clear the code verifier from local storage
                localStorage.removeItem("demo_code_verifier");

                // Update the token in local storage
                localStorage.setItem("demo_access_token", data.access_token);
                localStorage.setItem("demo_refresh_token", data.refresh_token);
                localStorage.setItem("demo_expiry_time", Date.now() + (data.expires_in * 1000));

                // Redirect to the result page
                window.location.href = "result.html";
            } catch (error) {
                alert(error);
            }
        }

        getAccessToken(); // Call the function
        }

        // (1) Check to see if there is already an access token in localStorage

        let accessToken = localStorage.getItem("demo_access_token");

        // Display the appropriate content based on the login status
        if (accessToken) {
            document.getElementById("home").hidden = false;
            console.log('show home')
        } else {
            document.getElementById("log-in").hidden = false;
            console.log("show log")
        }

        // (2) When the login button is clicked, generate a code challenge and request an authorization code

        document.getElementById("login-button").addEventListener("click", async () => {
            [verifier, challenge] = await generateCodeChallenge();
            localStorage.setItem("demo_code_verifier", verifier); // Don't forget to store the code verifier!
            requestAuthCode(clientId, redirectUri, challenge, "user-library-modify"); // Special scope for saving songs
        });

        // (3) When the logout button is clicked, clear the access token and refresh the page

        document.getElementById("logout-button").addEventListener("click", () => {
            localStorage.removeItem("demo_access_token");
            localStorage.removeItem("demo_refresh_token");
            localStorage.removeItem("demo_expiry_time");
            localStorage.removeItem("demo_code_verifier");
            window.location.reload();
        });
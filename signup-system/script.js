const form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Clear previous messages
    document.getElementById("error").textContent = "";
    document.getElementById("success").textContent = "";

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;


    if (password !== confirmPassword) {
        document.getElementById("error").textContent =
            "Passwords do not match";
        return;
    }


    const userData = {
        username,
        email,
        password
    };


    try {
        const response = await fetch(
            "http://localhost:3000/api/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            }
        );


        const data = await response.json();

        console.log(data);


        if (response.ok) {
            document.getElementById("success").textContent =
                "Account created successfully";
        }
        else {
            document.getElementById("error").textContent =
                data.message;
        }


    } catch (error) {
        console.log(error);
    }

});
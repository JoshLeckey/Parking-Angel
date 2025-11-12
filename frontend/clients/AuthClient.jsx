//TODO: Test if the endpoint actually works
const registerUser = async ({ username, password, fullName, email }) => {
    try {
        const response = await fetch(process.env.BACKEND + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
                fullName,
                email,
            }),
        });

        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Registration error:", error);
        throw error; // Rethrow to let the caller handle it
    }
};
//TODO: Test if endpoint actually works
const loginUser = async ({ username, password }) => {
    try {
        const response = await fetch(process.env.BACKEND + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const json = await response.json();
        return json; // Returning the entire json object to handle it accordingly in the component
    } catch (error) {
        console.error("Login error:", error);
        throw error; // Rethrow to let the caller handle it
    }
};

const forgotPassword = async ({username}) => {
    try{
        const response = await fetch('http://192.168.1.74:8080/forgotpassword',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
            }),
        });
        const json = await response.json();
        return json;
    }catch(error){
        console.error("Forgot password error: ", error);
        throw error;
    }
};

const checkResetKey = async ({token, username}) => {
    console.log("token: ", token, "username: ", username)
    try{
        const response = await fetch('http://192.168.1.74:8080/forgotpassword/token',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
                username,
            }),
        });
        const json = await response.json();
        return json;
    }catch(error){
        console.error("reset key error: ", error);
        throw error;
    }
}

const resetPassword = async ({token, username, password}) => {
    console.log("token: ", token, "username: ", username, "password: ", password)
    try{
        const response = await fetch('http://192.168.1.74:8080/forgotpassword/reset',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
                username,
                password
            })
        });
        const json = await response.json();
        return json;
    }catch(error){
        console.error("Error when changing password: ", error)
        throw error;
    }
}

export { registerUser, loginUser, resetPassword,forgotPassword, checkResetKey};

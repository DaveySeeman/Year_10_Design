
//In this file we deal with anything that has to do with authenticaing someone. 

//If you authenticate using option 1 it becomes a challenge loading new pages
//since you cannot pass along the information (easily)

//EXTENSION BASED ON SITUATION:
//If you authenticate using firebase your browser gets "authenticated" this means
//when a page is loaded you run a function that checks to see if the person is valid
//and if they are it updates the page. 


const login_form = document.querySelector("#login-form")
const login_nav = document.getElementById("login_nav")
const logout_nav = document.getElementById("logout_nav")
const the_elements_nav = document.getElementById("the_elements_nav")

login_form.addEventListener('submit',(e) => {
    e.preventDefault() //stops page from reloading
    
    document.getElementById("name").innerHTML = login_form["user_name"].value;
    console.log(login_form["user_password"].value)

    users = {'me@you.com': '123456', 'you@me.com': '789654'};

    //Option 1: Verify against a predefined list

    login_nav.style.display = "none"
    logout_nav.style.display = "block"
    the_elements_nav.style.display = "block"


    //Option 2: Send to Firebase for authorization 
    

    //General
    const modal = document.querySelector('#login_modal'); 
    M.Modal.getInstance(modal).close();
    login_form.reset()

});

logout_nav.addEventListener('click',(e) => {

    login_nav.style.display = "block";
    logout_nav.style.display = "none";
    the_elements_nav.style.display = "none";
    document.getElementById("name").innerHTML = "";
});
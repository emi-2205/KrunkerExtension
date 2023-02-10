type Theme = "dark" | "light";

// Function that sets the theme on load.
function loadTheme() {
    // If there is already a theme set, load it.
    if('theme' in localStorage && ["dark", "light"].includes(localStorage.theme) ){
        setTheme(localStorage.theme)
        return;
    }

    // Set theme to device default
    if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
    }else{
        document.documentElement.classList.remove('dark');
    }
}

// Change theme from light to dark and viceversa
function toggleTheme() {
    if(localStorage.theme === 'dark') {
        setTheme('light')
    }else{
        setTheme('dark')
    }
}

// Set a theme to light or dark
function setTheme(theme: Theme){
    if(theme === "dark"){
        localStorage.theme = 'dark';
        document.documentElement.classList.add('dark')
    }else{
        localStorage.theme = 'light';
        document.documentElement.classList.remove('dark')
    }
}

export {loadTheme, toggleTheme, setTheme}
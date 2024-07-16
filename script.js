/**
 * Utility function to calculate the current theme setting.
 * Look for a local storage value.
 * Fall back to system setting.
 * Fall back to light mode.
 */
function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
    if (localStorageTheme !== null) {
        return localStorageTheme;
    }

    if (systemSettingDark.matches) {
        return "light";
    }

    themeToggle.checked = true;
    return "dark";
}

/**
 * Utility function to update the button text and aria-label.
 */

/**
 * Utility function to update the theme setting on the html tag
 */
function updateThemeOnHtmlEl({ theme }) {
    document.querySelector("html").setAttribute("data-theme", theme);
}

function updateThemeToggle({ theme }) {
    if (theme === "dark") {
        themeToggle.checked = true;
    }
}

function setTheme({ theme }) {
    const styles = document.documentElement.style
    if (theme === "dark") {
        styles.setProperty("--theme-bg", "#121212")
        styles.setProperty("--theme-color-hd", "#fff")
        styles.setProperty("--theme-bg-links", "darkblue")
        styles.setProperty("--theme-color-text", "#fff")
        styles.setProperty("--theme-section-one-bg", "white")
        styles.setProperty("--theme-programs-text", "snow")
    } else {
        styles.setProperty("--theme-bg", "#fff")
        styles.setProperty("--theme-color-hd", "darkblue")
        styles.setProperty("--theme-bg-links", "white")
        styles.setProperty("--theme-color-text", "#000")
        styles.setProperty("--theme-section-one-bg", "#00093C")
        styles.setProperty("--theme-programs-text", "gray")
    }
}

/**
 * On page load:
 */

/**
 * 1. Grab what we need from the DOM and system settings on page load
 */
const themeToggle = document.getElementById("toggle");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
const styles = getComputedStyle(document.body)
/**
 * 2. Work out the current site settings
 */
let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

/**
 * 3. Update the theme setting and button text accoridng to current settings
 */
updateThemeOnHtmlEl({ theme: currentThemeSetting });
updateThemeToggle({theme: currentThemeSetting});
setTheme({theme: currentThemeSetting});

/**
 * 4. Add an event listener to toggle the theme
 */
themeToggle.addEventListener("click", (event) => {
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

    localStorage.setItem("theme", newTheme);
    updateThemeOnHtmlEl({ theme: newTheme });

    currentThemeSetting = newTheme;
    setTheme({theme: currentThemeSetting});
});

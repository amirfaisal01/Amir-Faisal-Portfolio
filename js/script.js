/**
 * @fileoverview Portfolio System State Engine
 * Manages runtime configurations, persistent parameters, and token toggling.
 */

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const systemPreferences = window.matchMedia('(prefers-color-scheme: dark)');
    
    /**
     * Extracts persistent theme values from local token arrays.
     * @returns {string} Target execution theme state
     */
    const getSavedTheme = () => {
        const storedTheme = localStorage.getItem('portfolio-theme');
        if (storedTheme) return storedTheme;
        return systemPreferences.matches ? 'dark' : 'light';
    };

    /**
     * Mutates structural data attributes on the DOM compilation frame.
     * @param {string} themeState - System theme state definition
     */
    const applyTheme = (themeState) => {
        document.documentElement.setAttribute('data-theme', themeState);
        themeToggleBtn.textContent = themeState === 'dark' ? '☀️' : '🌙';
        themeToggleBtn.setAttribute('aria-label', `Switch to ${themeState === 'dark' ? 'Light' : 'Dark'} Mode`);
    };

    let activeTheme = getSavedTheme();
    applyTheme(activeTheme);

    themeToggleBtn.addEventListener('click', () => {
        activeTheme = activeTheme === 'light' ? 'dark' : 'light';
        applyTheme(activeTheme);
        localStorage.setItem('portfolio-theme', activeTheme);
    });
});
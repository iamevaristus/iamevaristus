/**
 * A utility class for handling different types of navigation in a web application.
 */
export class Navigate {
    /**
     * Opens a URL in a new tab.
     *
     * @param url - The URL to open in a new tab.
     */
    static openInNewTab(url: string): void {
        window.open(url, '_blank');
    }

    /**
     * Opens a URL in the current tab.
     *
     * @param url - The URL to open in the current tab.
     */
    static open(url: string): void {
        window.open(url);
    }

    /**
     * Replaces the current page with a new URL, removing the current page from the session history.
     *
     * @param url - The URL to navigate to, replacing the current page.
     */
    static to(url: string): void {
        window.location.replace(url);
    }

    /**
     * Redirects to a new URL, preserving the current page in the session history.
     *
     * @param url - The URL to navigate to.
     */
    static all(url: string): void {
        window.location.href = url;
    }
}

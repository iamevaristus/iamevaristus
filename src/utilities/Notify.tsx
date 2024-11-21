import { toast } from "react-toastify"; // Library for showing toast notifications
import "react-toastify/dist/ReactToastify.css"; // Import required styles for react-toastify notifications

/**
 * Enum representing the possible positions for popup notifications.
 * This is used to define where toast notifications will appear on the screen.
 */
export enum Popup {
    /** Notification will appear at the top-right corner of the screen */
    TOPRIGHT = "top-right",

    /** Notification will appear at the top-left corner of the screen */
    TOPLEFT = "top-left",

    /** Notification will appear at the top-center of the screen */
    TOPCENTER = "top-center",

    /** Notification will appear at the bottom-left corner of the screen */
    BOTTOMLEFT = "bottom-left",

    /** Notification will appear at the bottom-right corner of the screen */
    BOTTOMRIGHT = "bottom-right",

    /** Notification will appear at the bottom-center of the screen */
    BOTTOMCENTER = "bottom-center"
}

/**
 * A class to display different types of toast notifications.
 * Provides methods for showing success, error, info, warning, and loading toasts.
 */
class NotifyInstance {

    /**
     * Displays a success notification.
     * @param message - The message to be shown in the toast notification.
     * @param duration - (Optional) The time (in milliseconds) the notification will stay visible. Defaults to 6000ms.
     * @param position - (Optional) The position on the screen where the toast should appear (e.g., top-right, bottom-left). Defaults to Popup.TOPRIGHT.
     */
    success(message: string, duration: number = 6000, position = Popup.TOPRIGHT) {
        toast.success(message, {
            position: position,
            autoClose: duration,
        });
    }

    /**
     * Displays an error notification.
     * @param message - The error message to be shown in the toast notification.
     * @param duration - (Optional) The time (in milliseconds) the notification will stay visible. Defaults to 6000ms.
     * @param position - (Optional) The position on the screen where the toast should appear. Defaults to Popup.TOPRIGHT.
     */
    error(message: string, duration: number = 6000, position = Popup.TOPRIGHT) {
        toast.error(message, {
            position: position,
            autoClose: duration,
        });
    }

    /**
     * Displays an informational notification.
     * @param message - The informational message to be shown in the toast notification.
     * @param duration - (Optional) The time (in milliseconds) the notification will stay visible. Defaults to 6000ms.
     * @param position - (Optional) The position on the screen where the toast should appear. Defaults to Popup.TOPRIGHT.
     */
    info(message: string, duration: number = 6000, position = Popup.TOPRIGHT) {
        toast.info(message, {
            position: position,
            autoClose: duration,
        });
    }

    /**
     * Displays a warning notification.
     * @param message - The warning message to be shown in the toast notification.
     * @param duration - (Optional) The time (in milliseconds) the notification will stay visible. Defaults to 6000ms.
     * @param position - (Optional) The position on the screen where the toast should appear. Defaults to Popup.TOPRIGHT.
     */
    warning(message: string, duration: number = 6000, position = Popup.TOPRIGHT) {
        toast.warning(message, {
            position: position,
            autoClose: duration,
        });
    }

    /**
     * Displays a loading notification based on the status of a promise.
     * @param action - The promise representing the async action being performed.
     * @param pending - The message to display while the action is still pending.
     * @param error - The message to display if the promise is rejected (action fails).
     * @param success - The message to display if the promise is resolved (action succeeds).
     * @param duration - (Optional) The time (in milliseconds) the success/error message will stay visible after the promise resolves/rejects. Defaults to 6000ms.
     */
    loading(action: Promise<unknown>, pending: string, error: string, success: string, duration: number = 6000) {
        toast.promise(action, {
            pending: pending,
            error: error,
            success: success,
        });
    }
}

/**
 * Singleton instance of NotifyInstance.
 * This provides a global `Notify` object to trigger notifications across the app.
 */
export const Notify = new NotifyInstance();
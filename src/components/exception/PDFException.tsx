/**
 * Custom exception class for handling errors in the Web UI Kit.
 *
 * This class extends the native `Error` class and provides additional properties and methods
 * to capture and display error details specific to the Web UI Kit context.
 */
export class PDFException extends Error {
    /** The name of the error, which is set to the class name */
    public readonly name: string;

    /** The error message that describes the error */
    public readonly message: string;

    /** The stack trace of the error, used for debugging */
    public readonly stack?: string;

    /** An error code representing the type or category of the error */
    public readonly code: number;

    /**
     * Creates a new instance of PDFException.
     *
     * @param message - A string describing the error message.
     * @param code - An optional numeric code representing the error category or type.
     *               Defaults to 500 if not provided.
     */
    constructor(message: string, code: number = 500) {
        // Call the parent class's constructor with the message
        super(message);

        // Set the name property to the name of this class
        this.name = this.constructor.name;

        // Set the message property to the provided error message
        this.message = message;

        // Set the code property to the provided or default error code
        this.code = code;

        // Capture the stack trace for debugging purposes
        this.stack = (new Error()).stack;
    }

    /**
     * Returns a formatted error message that includes the name of the exception,
     * the error code, and the error message.
     *
     * @returns A string that provides a summary of the error.
     */
    public getErrorMessage(): string {
        return `${this.name} [Code: ${this.code}]: ${this.message}`;
    }
}
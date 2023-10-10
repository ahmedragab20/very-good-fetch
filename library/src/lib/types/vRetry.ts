export interface IRetryOptions {
  /**
   * The maximum amount of times to retry the operation. Default is 3.
   */
  maxRetries?: number;
  /**
   * The amount of time to wait between retries, in milliseconds. Default is 1000.
   */
  delay?: number;
  /**
   * Function to execute when it's done retrying.
   */
  onComplete?: (response: any) => void;
  /**
   * Retry only if the response matches this condition.
   */
  retryCondition: (error: any) => boolean;
}
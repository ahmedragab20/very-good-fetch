import { IWindowGlobalConfig } from "../types";

declare global {
  interface Window {
    $catch: Promise<any>;
    ___AR_CATCH___: IWindowGlobalConfig;
    [key: string]: any;
  }
}

/**
 * Options for setting the state.
 */
interface ISetOpts {
  updatable: boolean;
}

/**
 * Interface representing the application window state.
 */
interface IAppWindowState {
  /**
   * Set the state with the provided options.
   * @param opts - The options for setting the state.
   */
  set(opts?: ISetOpts): void;

  /**
   * Get the current state.
   * @returns The current state.
   */
  get(): any;

  /**
   * Remove the state.
   */
  remove(): void;

  /**
   * Update the state with the provided new state.
   * @param newState - The new state to update.
   */
  update(newState: any): void;
}

/**
 * Class representing the application window state.
 */
export class AppWindowState implements IAppWindowState {
  private newState: any;
  private key: string;

  /**
   * Create a new instance of the AppWindowState class.
   * @param key - The key to identify the state.
   * @param newState - The new state to initialize.
   */
  constructor(key: string, newState?: any) {
    this.newState = newState;
    this.key = key;
  }

  /**
   * Set the state with the provided options.
   * @param opts - The options for setting the state.
   * @throws {Error} If the key or new state is not provided, or if the key already exists and not updatable.
   */
  public set(opts?: ISetOpts): void {
    if (!this.key) {
      throw new Error("You must provide a key to set the state");
    } else if (!this.newState) {
      throw new Error("You must provide a new state to set the state");
    } else if (window && window[this.key] && !opts?.updatable) {
      throw new Error(
        `The key ${this.key} already exists, please provide a different key`
      );
    }

    if (opts?.updatable && window && window[this.key]) {
      const oldState = window[this.key];
      const newState = this.newState;
      const mergedState = { ...oldState, ...newState };

      this.update(mergedState);

      return;
    }

    if (window) {
      Object.assign(window, {
        [this.key]: this.newState,
      });
    }
  }

  /**
   * Get the current state.
   * @returns The current state.
   */
  public get(): any {
    if (window) {
      return window[this.key];
    }
  }

  /**
   * Remove the state.
   */
  public remove(): void {
    if (window) {
      delete window[this.key];
    }
  }

  /**
   * Update the state with the provided new state.
   * @param newState - The new state to update.
   */
  public update(newState: any): void {
    if (window) {
      Object.assign(window, {
        [this.key]: newState,
      });
    }
  }
}

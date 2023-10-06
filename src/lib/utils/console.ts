import { useGlobal } from "./internals";

/**
 * Print log to console if muteLogs is false
 * @param args {any}
 * @returns 
 */
export function printlog(...args: any[]) {
  try {
    const logable = useGlobal().get('_config')?.muteLogs

    if (logable) return;
    console.log(...args);
  } catch (error) {
    printerror(error);
  }
}

/**
 * Print warning to console if muteWarnings is false
 * @param args {any}
 * @returns 
 */
export function printwarn(...args: any[]) {
  try {
    const warnable = useGlobal().get('_config')?.muteWarnings

    if (warnable) return;
    console.warn(...args);
  } catch (error) {
    printerror(error);
  }
}

/**
 * Print error to console if muteErrors is false
 * @param args {any}
 * @returns 
 */
export function printerror(...args: any[]) {
  try {
    const errorable = useGlobal().get('_config')?.muteErrors

    if (errorable) return;
    console.error(...args);
  } catch (error) {
    console.error(error);
  }
}

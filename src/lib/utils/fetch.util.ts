export function validateFetchInstance(fetchInstance: any): boolean {
  try {
    // Check if fetchInstance is a function.
    if (typeof fetchInstance !== 'function') {
      return false;
    }
  
    // Check if fetchInstance returns a Promise.
    const fetchPromise = fetchInstance()?.catch(() => {});
    if (!(fetchPromise instanceof Promise)) {
      return false;
    }
  
    // If all checks pass, then fetchInstance is a valid Fetch instance.
    return true;
  } catch (error) {
    console.error('The fetch instance provided is not valid.');
    return false;
  }
}
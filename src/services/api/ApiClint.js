const DEFAULT_DELAY = 500;

function wait(ms = DEFAULT_DELAY) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function cloneData(data) {
  return structuredClone(data);
}

export async function fakeRequest(data, options = {}) {
  const { delay = DEFAULT_DELAY, shouldFail = false } = options;

  await wait(delay);

  if (shouldFail) {
    throw new Error("Something went wrong while fetching data.");
  }

  return cloneData(data);
}

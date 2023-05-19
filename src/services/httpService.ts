import apiClient from "./apiClient";

export default  function defaultGet() {
  const controller = new AbortController();
  const request = apiClient.get("/", {
   
    signal: controller.signal,
  });

  return { request, cancel: () => controller.abort() };
}

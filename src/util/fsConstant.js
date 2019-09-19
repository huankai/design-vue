import {fsBaseURL} from "@/network/request";

/**
 * 文件上传url
 * @type {string}
 */
const uploadUrl = fsBaseURL + "/info/upload";

/**
 * 文件预览 base url
 * @type {string}
 */
const viewBaseUrl = fsBaseURL + "/info/";

/**
 * 文件下载 base url
 * @type {string}
 */
const downBaseUrl = fsBaseURL + "/info/down/";

export {uploadUrl, viewBaseUrl, downBaseUrl}

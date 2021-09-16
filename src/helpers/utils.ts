/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-16 22:49:34
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-16 23:43:07
 */
export const uuid = () => {
  const tempUrl = URL.createObjectURL(new Blob());
  const uuId = tempUrl.toString();
  URL.revokeObjectURL(tempUrl);
  return uuId.substr(uuId.lastIndexOf('/') + 1);
};

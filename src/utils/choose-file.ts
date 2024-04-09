const chooseToFile = (
  params = {
    multiple: true,
    accept: 'image/*'
  }
): Promise<File | File[]> => {
  return new Promise((resolve, reject) => {
    if (document.readyState != 'complete') {
      throw new Error(
        'dom loading exception, please ensure that the dom is fully loaded before using'
      );
    }
    let fileCancel = true; // 是否未上传文件
    const { input } = createInput({
      multiple: params.multiple,
      accept: params.accept
    });
    // TODO  { once: true }
    window.addEventListener('focus', focusCallback);
    /**
     * 上传callback
     */
    input.addEventListener('change', onChange);

    function onChange(evt: { target: any }) {
      fileCancel = false;
      const { files } = evt.target as any;
      input.removeEventListener('change', onChange);
      return resolve(params.multiple ? files : files[0]);
    }
    /**
     * 未上传
     */
    function focusCallback() {
      setTimeout(() => {
        if (fileCancel) {
          window.removeEventListener('focus', focusCallback);
          input.removeEventListener('change', onChange);
          reject('upload canceled');
        }
      }, 500);
    }
  });
};
export { chooseToFile };
/**
 * 创建上传用input
 * @returns
 */
function createInput({ multiple, accept }: { multiple: boolean; accept?: string }) {
  // 创建dom
  const input = document.createElement('input');
  input.type = 'file';
  input.style.position = 'absolute';
  input.style.top = '0';
  input.style.opacity = '0';
  input.style.zIndex = '-9999';
  input.multiple = multiple;
  if (accept) {
    input.accept = accept;
  }
  // 自动点击
  input.click();
  return {
    input
  };
}

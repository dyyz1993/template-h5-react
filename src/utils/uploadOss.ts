import instance from '@/api';

export const uploadToOss = (sign: any, file: any, options: any = {}) => {
  const fd = new FormData();
  fd.append('name', file.name);
  fd.append('key', sign.key);
  fd.append('policy', sign.policy);
  fd.append('OSSAccessKeyId', sign.OSSAccessKeyId);
  fd.append('signature', sign.signature);
  fd.append('success_action_status', '200');
  fd.append('file', file);
  // console.log('file', file);

  return instance.post(sign.endpoint, fd, {
    // method: 'post',
    // data: fd,
    requestType: 'form',
    ...options,
    isUploadOss: true,
    isLoading: true
  });
};

export async function customUploadRequest(options: {
  file: any;
  onSuccess?: (url: string) => void;
  onProgress?: (progress: { percent: number }) => void;
  onError?: (error: any) => void;
  onUploadProgress?: (event: { loaded: number; total: number }) => void;
}) {
  // const [isError, res] = await getApiOssToken();
  // if (isError) return options?.onError?.(res);
  // const [isError2, error2] = await uploadToOss(res.data, options.file, {
  //   onUploadProgress: (event: { loaded: number; total: number }) => {
  //     // console.log(event, event.loaded / event.total);
  //     options?.onProgress?.({ percent: (event.loaded / event.total) * 100 });
  //   }
  // });
  // if (isError2) return options?.onError?.(error2);
  // options.file.url = res.data.cdn;
  // options.file.key = res.data.key;
  // return options?.onSuccess?.(res.data.cdn);
}

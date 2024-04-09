import { useRef } from 'react';
import styles from './index.module.scss';
import cs from 'classnames';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Button, Mask } from '@xyz/cat-design';
import { renderImperatively } from '@xyz/cat-design/es/utils/render-imperatively';

export type CropperImageProps = React.PropsWithChildren<{
  className?: string;
  file: string;
  onChange?: (dataUrl: string) => void;
  visible?: boolean;
  onClose?: () => void;
  afterClose?: () => void;
}>;
export default function CropperImage(props: CropperImageProps) {
  const cropperRef = useRef<HTMLImageElement>(null);

  // const onCrop = () => {};
  return (
    <Mask
      visible={props.visible}
      afterClose={props.afterClose}
      destroyOnClose
      className={cs(styles['cropper'], props.className)}
    >
      <div className={styles.content}>
        {props.file && (
          <Cropper
            src={props.file}
            aspectRatio={1}
            viewMode={0}
            style={{
              height: '100vh',
              // width: '100%',
              backgroundColor: '#ffffff'
            }}
            // background={false}
            center={false}
            // initialAspectRatio={1}
            guides={false}
            // crop={onCrop}
            ref={cropperRef}
            crossOrigin="use-credentials"
            minCropBoxHeight={10}
            minCropBoxWidth={10}
          />
        )}
      </div>
      <div className={styles['footer']}>
        <Button
          size="large"
          color="default"
          block
          onClick={() => {
            props.onClose?.();
          }}
        >
          取消
        </Button>
        <Button
          size="large"
          color="primary"
          block
          onClick={() => {
            const imageElement: any = cropperRef?.current;
            const cropper: any = imageElement?.cropper;
            const dataUrl = cropper.getCroppedCanvas().toDataURL();
            props.onChange?.(dataUrl);
            props.onClose?.();
          }}
        >
          裁剪
        </Button>
      </div>
    </Mask>
  );
}

export type CropperImageShowHandler = {
  close: () => void;
};

export async function showCropperImage(props: CropperImageProps) {
  const handler: CropperImageShowHandler = renderImperatively(
    <CropperImage
      {...props}
      afterClose={() => {
        props.afterClose?.();
      }}
    ></CropperImage>
  );

  return handler;
}
